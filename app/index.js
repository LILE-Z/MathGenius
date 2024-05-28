import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const temas = [
  { titulo: 'Ecuaciones de 1 Grado', fondo: 'https://www.todopapas.com//images/cms_2011/tpp/NINOS/ecuacones.jpg' },
  { titulo: 'Formula general', fondo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrm-sMusnweNtHhkbr8WO60Y-wZOEplwJRr_atAVvVkw&s' },
  { titulo: 'Calculo de Area debajo de la Curva', fondo: 'https://cdn1.byjus.com/wp-content/uploads/2018/11/formulas/2016/04/13175445/Area-Under-the-Curve1.png' },
  { titulo: 'Sistema de ecuaciones', fondo: 'https://uploads-cdn.omnicalculator.com/images/systems_of_equations_2.PNG' },
];

export default function Home() {
  const router = useRouter();

  const handleTemaPress = (titulo) => {
    router.push({
      pathname: "temporal",
      params: { titulo },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {temas.map((tema, index) => (
        <TouchableOpacity
          key={index}
          style={styles.temaContainer}
          onPress={() => handleTemaPress(tema.titulo)}
        >
          <ImageBackground
            source={{ uri: tema.fondo }}
            style={styles.imagenFondo}
            blurRadius={5}
          >
            <View style={styles.temaContent}>
              <Text style={styles.temaTitle}>{tema.titulo}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  temaContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagenFondo: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temaContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  temaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});