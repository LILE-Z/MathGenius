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
import { Linking, Platform, Share, View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function CustomDrawerContent(props: any) {
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
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
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
    marginTop: 280,
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
