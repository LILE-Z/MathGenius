import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

const SistemasEcuaciones = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const content = {
    intro: 'Los sistemas de ecuaciones son conjuntos de ecuaciones que se resuelven simultáneamente. Estos sistemas tienen diversas aplicaciones en matemáticas, física, ingeniería y otras áreas. Los sistemas de ecuaciones pueden ser lineales o no lineales, y pueden tener una única solución, infinitas soluciones o ninguna solución.',
    history: 'La historia de los sistemas de ecuaciones se remonta a la antigua Babilonia, donde se encontraron tablillas de arcilla con problemas que involucraban sistemas de ecuaciones lineales. Los antiguos egipcios también utilizaban sistemas de ecuaciones para resolver problemas prácticos, como la distribución de pan y cerveza. A lo largo de la historia, matemáticos como Carl Friedrich Gauss, Évariste Galois y Alan Turing realizaron importantes contribuciones al estudio de los sistemas de ecuaciones.',
    methods: 'Los métodos comunes para resolver sistemas de ecuaciones incluyen el método de sustitución, el método de igualación, el método de reducción y el método de Cramer. El método de sustitución implica despejar una variable en términos de las otras y luego sustituir en las otras ecuaciones. El método de igualación consiste en igualar las expresiones de una misma variable en diferentes ecuaciones. El método de reducción se basa en sumar o restar múltiplos de una ecuación a otra para eliminar una variable. El método de Cramer utiliza determinantes para encontrar las soluciones.',
    applications: 'Los sistemas de ecuaciones tienen numerosas aplicaciones en la vida real. En la economía, se utilizan para analizar la oferta y la demanda, así como para optimizar la producción y los beneficios. En la ingeniería química, los sistemas de ecuaciones se emplean para modelar y diseñar reactores y procesos químicos. En la informática, se utilizan en la criptografía y en la resolución de problemas de optimización. Además, los sistemas de ecuaciones son fundamentales en la resolución de problemas físicos, como el cálculo de fuerzas y momentos en estructuras.',
    importance: 'Comprender y saber resolver sistemas de ecuaciones es fundamental en muchas áreas de las matemáticas y las ciencias. Estos sistemas proporcionan una herramienta poderosa para modelar y analizar situaciones complejas, y su dominio es esencial para cualquier estudiante o profesional en campos relacionados con las matemáticas, la ingeniería, la economía y las ciencias físicas. Además, el estudio de los sistemas de ecuaciones promueve el pensamiento lógico, el razonamiento abstracto y la resolución de problemas, habilidades valiosas en cualquier disciplina.',
    types: 'Existen diferentes tipos de sistemas de ecuaciones según las características de las ecuaciones que los componen. Los sistemas de ecuaciones lineales son aquellos en los que todas las ecuaciones son de primer grado, es decir, las variables tienen exponente 1. Los sistemas de ecuaciones no lineales incluyen ecuaciones con términos cuadráticos, cúbicos o de mayor grado. También existen sistemas de ecuaciones con coeficientes complejos, donde los coeficientes son números complejos en lugar de números reales.',
    solutions: 'Un sistema de ecuaciones puede tener diferentes tipos de soluciones. Una solución única significa que existe un único conjunto de valores para las variables que satisface todas las ecuaciones del sistema. Infinitas soluciones implican que hay múltiples conjuntos de valores que satisfacen las ecuaciones, formando una relación o dependencia entre las variables. Ninguna solución indica que no existe ningún conjunto de valores que cumpla simultáneamente todas las ecuaciones del sistema.',
    realLife: 'Los sistemas de ecuaciones están presentes en muchos aspectos de la vida cotidiana. Por ejemplo, en la planificación de dietas, las ecuaciones pueden representar las restricciones de calorías y nutrientes. En la programación de vuelos, los sistemas de ecuaciones se utilizan para optimizar las rutas y minimizar los costos. En la asignación de recursos, como el tiempo o el dinero, los sistemas de ecuaciones ayudan a encontrar la distribución óptima. Incluso en los juegos y acertijos, como el Sudoku, se pueden plantear y resolver sistemas de ecuaciones.',
  }; 

  const speakText = () => {
    const text = content.intro + content.history + content.methods 
    Speech.speak(text, { language: 'es' });
    setIsSpeaking(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Sistemas de Ecuaciones</Text>

        <Text style={styles.subtitle}>Introducción</Text>
        <Text style={styles.paragraph}>{content.intro}</Text>
        <Image source={{ uri: 'URL_DE_LA_IMAGEN_1' }} style={styles.image} />

        <Text style={styles.subtitle}>Historia</Text>
        <Text style={styles.paragraph}>{content.history}</Text>
        <Image source={{ uri: 'URL_DE_LA_IMAGEN_2' }} style={styles.image} />

        <Text style={styles.subtitle}>Métodos de Resolución</Text>
        <Text style={styles.paragraph}>{content.methods}</Text>
        <Image source={{ uri: 'URL_DE_LA_IMAGEN_3' }} style={styles.image} />

        <Text style={styles.subtitle}>Aplicaciones</Text>
        <Text style={styles.paragraph}>{content.applications}</Text>
        <Image source={{ uri: 'URL_DE_LA_IMAGEN_4' }} style={styles.image} />

        <Text style={styles.subtitle}>Importancia</Text>
        <Text style={styles.paragraph}>{content.importance}</Text>
        <Image source={{ uri: 'URL_DE_LA_IMAGEN_5' }} style={styles.image} />

    <Text style={styles.subtitle}>Tipos</Text>
        <Text style={styles.paragraph}>{content.types}</Text>
    <Text style={styles.subtitle}>Soluciones</Text>
        <Text style={styles.paragraph}>{content.solutions}</Text>

    <Text style={styles.subtitle}>Vida Real</Text>
        <Text style={styles.paragraph}>{content.realLife}</Text>
        <Text style={styles.subtitle}>Información Adicional</Text>
        <Video
          source={require('@/assets/videos/ecuaciones2.mp4')}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setIsPlaying(status.isPlaying)}
          videoStyle={styles.videoPlayer}
          controlsStyle={styles.videoControls}
          playIcon={<Ionicons name="play" size={40} color="#fff" />}
          pauseIcon={<Ionicons name="pause" size={40} color="#fff" />}
          replayIcon={<Ionicons name="refresh" size={40} color="#fff" />}
          forwardIcon={<Ionicons name="play-forward" size={30} color="#fff" />}
          backwardIcon={<Ionicons name="play-back" size={30} color="#fff" />}
          seekBarKnob={{ backgroundColor: '#fff', borderRadius: 10, height: 20, width: 20 }}
          seekBarBackground={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          seekBarProgress={{ backgroundColor: '#fff' }}
        />
      </ScrollView>

      <TouchableOpacity style={styles.speakButton} onPress={speakText}>
        <Ionicons name={isSpeaking ? 'pause' : 'volume-high'} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 24,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  videoPlayer: {
    borderRadius: 10,
  },
  videoControls: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  speakButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
});

export default SistemasEcuaciones;