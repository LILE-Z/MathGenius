import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Dialog, Button } from '@rneui/themed';

const temas = [
  {
    titulo: 'Ecuaciones de 1 Grado',
    imagen: 'https://www.todopapas.com//images/cms_2011/tpp/NINOS/ecuacones.jpg',
    importancia: 'Las ecuaciones de primer grado son fundamentales en la resolución de problemas cotidianos y en diversas áreas como la física, la economía y la ingeniería.',
  },
  {
    titulo: 'Formula general',
    imagen: 'https://www.wikihow.com/images/thumb/2/22/Solve-Quadratic-Equations-Using-the-Quadratic-Formula-Step-9.jpg/v4-460px-Solve-Quadratic-Equations-Using-the-Quadratic-Formula-Step-9.jpg',
    importancia: 'La fórmula general es una herramienta poderosa para resolver ecuaciones cuadráticas de manera eficiente y se utiliza en diversos campos científicos y técnicos.',
  },
  {
    titulo: 'Calculo de Area debajo de la Curva',
    imagen: 'https://cdn1.byjus.com/wp-content/uploads/2018/11/formulas/2016/04/13175445/Area-Under-the-Curve1.png',
    importancia: 'El cálculo del área debajo de la curva es fundamental en la integración y tiene aplicaciones en la física, la estadística y la ingeniería, permitiendo resolver problemas relacionados con la acumulación y la medición de cantidades.',
  },
  {
    titulo: 'Sistema de ecuaciones',
    imagen: 'https://cdn-academy.pressidium.com/academy/wp-content/uploads/2020/12/FAQ-Comparison-of-Methods-for-Solving-Systems-3.png',
    importancia: 'Los sistemas de ecuaciones son esenciales para modelar y resolver problemas que involucran múltiples variables y se utilizan en áreas como la economía, la ingeniería y la investigación operativa.',
  },
];

export default function Home() {
  const router = useRouter();
  const [selectedTema, setSelectedTema] = useState(null);

  const handleTemaPress = (titulo) => {
    router.push({
      pathname: "temporal",
      params: { titulo },
    });
  };

  const handleLogoPress = (tema) => {
    setSelectedTema(tema);
  };

  const closeDialog = () => {
    setSelectedTema(null);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://fancywalls.eu/wp-content/uploads/irregular-grid-pattern-repeat-removable-wallpaper-design.jpg' }}
        style={styles.backgroundImage}
      >
        <ScrollView>
          {temas.map((tema, index) => (
            <Card key={index} containerStyle={styles.cardContainer}>
              <View style={styles.cardContent}>
                <Text style={styles.temaTitle}>{tema.titulo}</Text>
                <TouchableOpacity onPress={() => handleTemaPress(tema.titulo)}>
                  <Image source={{ uri: tema.imagen }} style={styles.imagenTema} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoContainer} onPress={() => handleLogoPress(tema)}>
                  <Image source={require('@/assets/images/bombilla.png')} style={styles.logo} />
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </ScrollView>
      </ImageBackground>

      <Dialog isVisible={selectedTema !== null} onBackdropPress={closeDialog}>
        {selectedTema && (
          <>
            <Dialog.Title title={selectedTema.titulo} />
            <Text>{selectedTema.importancia}</Text>
            <Dialog.Actions>
              <Dialog.Button title="Cerrar" onPress={closeDialog} />
            </Dialog.Actions>
          </>
        )}
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    borderWidth: 0,
    elevation: 3,
    shadowColor: '#6A5ACD',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 41,
    overflow: 'visible',
  },
  cardContent: {
    padding: 20,
  },
  temaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  imagenTema: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  logoContainer: {
    position: 'absolute',
    top: -15,
    right: -15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logo: {
    width: 30,
    height: 30,
  },
});