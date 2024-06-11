import React, { useState, useRef } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const getContenido = (titulo) => {
  switch (titulo) {
    case 'Ecuaciones de 1 Grado':
      return {
        Titulo: 'Ecuaciones de 1 Grado',
        Descripcion: 'Las ecuaciones de primer grado son aquellas en las que la incógnita tiene exponente 1. Se pueden resolver despejando la incógnita mediante operaciones algebraicas básicas.',
        Video: require("@/assets/videos/firstGrade.mp4"),
        Fondo: '#F1EF99',
        Redireccion: 'firstGrade',
      };
    case 'Formula general':
      return {
        Titulo: 'Fórmula General',
        Descripcion: 'La fórmula general es una expresión que permite resolver cualquier ecuación de segundo grado. Proporciona las soluciones (raíces) de la ecuación cuadrática.',
        Video: require("@/assets/videos/general.mp4"),
        Fondo: '#B19470',
        Redireccion: 'general',
      };
    case 'Calculo de Area debajo de la Curva':
      return {
        Titulo: 'Cálculo de Área debajo de la Curva',
        Descripcion: 'El cálculo del área debajo de una curva se realiza mediante la integración. Consiste en determinar la región encerrada entre la curva y el eje x en un intervalo dado.',
        Video: require("@/assets/videos/area.mp4"),
        Fondo: '#90EE90',
        Redireccion: 'area',
      };
    case 'Sistema de ecuaciones':
      return {
        Titulo: 'Sistema de Ecuaciones',
        Descripcion: 'Un sistema de ecuaciones es un conjunto de dos o más ecuaciones que involucran las mismas incógnitas. Se resuelve encontrando los valores de las incógnitas que satisfacen todas las ecuaciones simultáneamente.',
        Video: require("@/assets/videos/ecuaciones.mp4"),
        Fondo: '#028391',
        Redireccion: 'ecuaciones',
      };
    default:
      return null;
  }
};

export default function Temporal() {
  const router = useRouter();
  const { titulo } = useLocalSearchParams();
  console.log('Título recibido:', titulo);
  const contenido = getContenido(titulo);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const handleRedirect = async () => {
    if (videoRef.current) {
      await videoRef.current.stopAsync();
    }
    router.push(contenido.Redireccion);
  };

  if (!contenido) {
    return (
      <SafeAreaView style={style.container}>
        <Text style={{ backgroundColor: 'white' }}>Contenido no encontrado</Text>
        <Text style={{ backgroundColor: 'white' }}>Título: {titulo}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[style.container, { backgroundColor: contenido.Fondo }]}>
      <View style={style.videoContainer}>
        <Video
          ref={videoRef}
          source={contenido.Video}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={isPlaying}
          isLooping
          style={style.video}
        />
        <View style={style.controlsContainer}>
          <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={40}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.contentContainer}>
        <Text style={style.titulo}>{contenido.Titulo}</Text>
        <Text style={style.descripcion}>{contenido.Descripcion}</Text>
        <TouchableOpacity style={style.redirectButton} onPress={handleRedirect}>
          <Text style={style.redirectButtonText}>Calculadora {contenido.Titulo}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 200,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  descripcion: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 20,
  },
  redirectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  redirectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});