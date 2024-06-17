import React, { Suspense, useState, useEffect } from "react";
import { Text, StyleSheet, View, ImageBackground, Image, ToastAndroid, TextInput } from "react-native";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { Button } from "@rneui/base";
import { useRouter, useFocusEffect } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SQLiteProvider
        databaseName="mydb.db"
        assetSource={{ assetId: require("../assets/mydb.db") }}
        useSuspense
      >
        <LoginScreen />
      </SQLiteProvider>
    </Suspense>
  );
}

function LoginScreen() {
  const db = useSQLiteContext();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const result = await db.getAllAsync(
        "SELECT * FROM users WHERE sesion = 1"
      );

      if (result.length > 0) {
        router.push('/');
      }
    } catch (error) {
      console.error("Error al verificar la sesión:", error);
    }
  };

  const handleLogin = async () => {
    if (user.trim() === "" || password.trim() === "") {
      ToastAndroid.show('Por favor, completa todos los campos. 📝', ToastAndroid.SHORT);
      return;
    }

    try {
      const result = await db.getAllAsync(
        "SELECT * FROM users WHERE user = ? AND password = ? AND sesion = 0",
        [user, password]
      );

      if (result.length > 0) {
        await db.runAsync(
          "UPDATE users SET sesion = 1 WHERE user = ?",
          [user]
        );

        router.push('/');
      } else {
        ToastAndroid.show('Credenciales incorrectas. Por favor, verifica tus datos e intenta nuevamente. 🔒', ToastAndroid.LONG);
      }
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
    }
  };

  const refreshData = async () => {
    try {
      const result = await db.getAllAsync("SELECT * FROM users");
      console.log("Datos actualizados:", result);
    } catch (error) {
      console.error("Error al obtener los datos actualizados:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/0a/5e/74/0a5e74e5007a1000b57248d0694dc781.jpg' }}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Inicio de sesión</Text>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={user}
            onChangeText={setUser}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#888"
          />
          <Button
            title="Iniciar sesión"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
            onPress={handleLogin}
            icon={<FontAwesome name="sign-in" size={24} color="white" />}
          />
          <Text style={styles.registerText}>
            ¿No tienes una cuenta?{' '}
            <Text
              style={styles.registerLink}
              onPress={() => router.push('/registro')}
            >
              Regístrate
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
  registerText: {
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  registerLink: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
},
});