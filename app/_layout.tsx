import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import {
  Linking,
  Platform,
  Share,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function CustomDrawerContent(props: any) {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Tengo problemas aprendiendo Matemáticas. Me gustaría recibir ayuda adicional para mejorar mi comprensión en esta materia.",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>MathGenius</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Ecuaciones de 1 Grado"
        onPress={() => {
          router.push({
            pathname: "temporal",
            params: { titulo: "Ecuaciones de 1 Grado" },
          });
        }}
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Formula general"
        onPress={() => {
          router.push({
            pathname: "temporal",
            params: { titulo: "Formula general" },
          });
        }}
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Area debajo de la Curva"
        onPress={() => {
          router.push({
            pathname: "temporal",
            params: { titulo: "Calculo de Area debajo de la Curva" },
          });
        }}
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Sistema de ecuaciones"
        onPress={() => {
          router.push({
            pathname: "temporal",
            params: { titulo: "Sistema de ecuaciones" },
          });
        }}
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="Lectura 1"
        onPress={() => {
          router.push({
            pathname: "ecuacionesLeccion",
          });
        }}
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="Lectura 2"
        onPress={() => {
          router.push({
            pathname: "determinantes",
          });
        }}
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Lectura 3"
        onPress={() => {
          router.push({
            pathname: "sustitucion",
          });
        }}
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Calculadora"
        onPress={() => {
          router.push({
            pathname: "calculadora",
          });
        }}
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Phone"
        onPress={() => {
          if (Platform.OS === "android") {
            Linking.openURL("tel: 2222222222");
          } else {
            Linking.openURL("telprompt: 2222222222");
          }
        }}
        icon={({ color, size }) => (
          <Ionicons name="call" color={color} size={size} />
        )}
        labelStyle={{ color: "#623a27" }}
      />
      <DrawerItem
        label="Share"
        onPress={handleShare}
        icon={({ color, size }) => (
          <Ionicons name="share" color={color} size={size} />
        )}
        labelStyle={{ color: "#623a27" }}
      />
      <View style={styles.drawerFooter}>
        <Text style={styles.drawerFooterText}>© 2024 MathGenius-CBTiS 260</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="login"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="+not-found"
          options={{
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="area"
          options={{
            title: "Area debajo de la Curva",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="general"
          options={{
            title: "Formula general",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="ecuaciones"
          options={{
            title: "Sistema de ecuaciones",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="temporal"
          options={{
            drawerLabel: "Temporal",
            title: "Temporal",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="firstGrade"
          options={{
            drawerLabel: "Ecuaciones de 1 Grado",
            title: "Ecuaciones de 1 Grado",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="login"
          options={{
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="registro"
          options={{
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="ecuacionesLeccion"
          options={{
            drawerLabel: "Lectura 1",
            title: "Lectura 1",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="quiz"
          options={{
            drawerLabel: "Quiz",
            title: "Quiz",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="calculadora"
          options={{
            title: "Calculadora",
            drawerLabel: "Calculadora",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="determinantes"
          options={{
            drawerLabel: "Lectura 2",
            title: "Lectura 2",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="sustitucion"
          options={{
            drawerLabel: "Lectura 3",
            title: "Lectura 3",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: true,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#5a72a0",
    padding: 16,
    marginBottom: 16,
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FDFFE2",
  },
  drawerItemLabel: {
    fontSize: 16,
    color: "#1A2130",
  },
  drawerItem: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#83B4FF",
    paddingBottom: 8,
    backgroundColor: "white",
  },
  drawerFooter: {
    marginTop: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#83B4FF",
  },
  drawerFooterText: {
    fontSize: 14,
    color: "#1A2130",
    textAlign: "center",
  },
});
