import React, { Suspense, useState } from 'react';
import { Text, Button } from '@rneui/base';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';
import { View, StyleSheet, TextInput, ImageBackground, ToastAndroid, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SQLiteProvider
        databaseName="mydb.db"
        assetSource={{ assetId: require("../assets/mydb.db") }}
        useSuspense
      >
        <Registro />
      </SQLiteProvider>
    </Suspense>
  );
}

function Registro() {
  const db = useSQLiteContext();
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (nombre.trim().length < 5) {
      ToastAndroid.show('El nombre debe tener al menos 5 letras 📝', ToastAndroid.SHORT);
      return;
    }

    if (password.trim().length < 5) {
      ToastAndroid.show('La contraseña debe tener al menos 5 caracteres 🔒', ToastAndroid.SHORT);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show('Las contraseñas no coinciden ❌', ToastAndroid.SHORT);
      return;
    }

    try {
      const existingUser = await db.getAllAsync(
        'SELECT * FROM users WHERE user = ?',
        [nombre]
      );

      if (existingUser.length > 0) {
        ToastAndroid.show('El nombre de usuario ya está registrado 😞', ToastAndroid.SHORT);
        return;
      }

      await db.runAsync(
        'INSERT INTO users (user, password, sesion) VALUES (?, ?, ?)',
        [nombre, password, 0]
      );

      ToastAndroid.show('Registro exitoso ✅', ToastAndroid.SHORT);

      const result = await db.getAllAsync("SELECT * FROM users");
      console.log("Datos actualizados:", result);

      setTimeout(() => {
        console.log('Registro exitoso');
        router.push('/login');
      }, 1000);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/26/57/71/26577159444751f91e44edd2f28d70bd.jpg' }}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Registro</Text>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={nombre}
            onChangeText={setNombre}
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
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#888"
          />
          <Button
            title="Registrarse"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
            onPress={handleSubmit}
            icon={<FontAwesome name="check" size={24} color="white" />}
          />
          <Text style={styles.loginText}>
            ¿Ya tienes una cuenta?{' '}
            <Text
              style={styles.loginLink}
              onPress={() => router.push('/login')}
            >
              Inicia sesión
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
    borderRadius: 20,
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
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
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
  loginText: {
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
});