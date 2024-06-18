import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

const DeterminantsLesson = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const content = {
    history: 'El método de determinantes para resolver sistemas de ecuaciones fue desarrollado por el matemático japonés Seki Kowa en el siglo XVII. Posteriormente, fue redescubierto y popularizado por el matemático suizo Gabriel Cramer en el siglo XVIII, por lo que también se conoce como la regla de Cramer.',
    methods: 'El método de determinantes se basa en el cálculo de determinantes para encontrar las soluciones de un sistema de ecuaciones lineales. Un determinante es un valor numérico asociado a una matriz cuadrada. Para un sistema de ecuaciones con n incógnitas, se construye una matriz cuadrada de tamaño n x n con los coeficientes de las variables y se calcula su determinante. Luego, se construyen n matrices adicionales reemplazando cada columna de la matriz original por los términos independientes del sistema de ecuaciones. Se calculan los determinantes de estas matrices y se dividen por el determinante de la matriz original para obtener los valores de las incógnitas.',
  };

  const speakText = () => {
    const text = content.history + ' ' + content.methods;
    Speech.speak(text, { language: 'es' });
    setIsSpeaking(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>El Método de Determinantes</Text>

        <Text style={styles.subtitle}>Historia</Text>
        <Text style={styles.paragraph}>{content.history}</Text>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Seki.jpeg' }} style={styles.image} />

        <Text style={styles.subtitle}>¿Cómo funciona?</Text>
        <Text style={styles.paragraph}>{content.methods}</Text>
        <Image source={{ uri: 'https://elbibliote.com/resources/Temas/html/imageneshtml/1804/1804e.jpg' }} style={styles.image} />

        <Text style={styles.subtitle}>Ventajas y desventajas</Text>
        <Text style={styles.paragraph}>
          Una de las ventajas del método de determinantes es que proporciona una fórmula explícita para encontrar las soluciones de un sistema de ecuaciones. Además, es especialmente útil cuando se requiere encontrar soluciones en términos de parámetros.
        </Text>
        <Text style={styles.paragraph}>
          Sin embargo, el método de determinantes puede volverse computacionalmente costoso a medida que aumenta el tamaño del sistema de ecuaciones, ya que implica el cálculo de múltiples determinantes. Además, no es aplicable a sistemas de ecuaciones no lineales.
        </Text>

        <Text style={styles.subtitle}>¿Cuándo es recomendable usarlo?</Text>
        <Text style={styles.paragraph}>
          El método de determinantes es recomendable cuando se tienen sistemas de ecuaciones lineales de tamaño pequeño a moderado (generalmente hasta 4 o 5 incógnitas). Es especialmente útil cuando se requieren soluciones en términos de parámetros o cuando se desea una fórmula explícita para las soluciones.
        </Text>
        <Text style={styles.paragraph}>
          Para sistemas de ecuaciones más grandes, otros métodos como el método de eliminación de Gauss o el método de matriz inversa pueden ser más eficientes computacionalmente.
        </Text>

        <Text style={styles.subtitle}>Ejemplo</Text>
        <Text style={styles.paragraph}>
          Considera el siguiente sistema de ecuaciones:
          {'\n'}2x + 3y = 5
          {'\n'}x - y = 1
        </Text>
        <Text style={styles.paragraph}>
          Usando el método de determinantes, se construye la matriz de coeficientes y se calcula su determinante:
          {'\n'}| 2  3 |
          {'\n'}| 1 -1 | = -5
        </Text>
        <Text style={styles.paragraph}>
          Luego, se calculan los determinantes reemplazando cada columna por los términos independientes:
          {'\n'}| 5  3 |
          {'\n'}| 1 -1 | = -8
          {'\n'}
          {'\n'}| 2  5 |
          {'\n'}| 1  1 | = 7
        </Text>
        <Text style={styles.paragraph}>
          Finalmente, se dividen estos determinantes por el determinante original para obtener las soluciones:
          {'\n'}x = -8 / -5 = 1.6
          {'\n'}y = 7 / -5 = -1.4
        </Text>

        <Text style={styles.paragraph}>
          En resumen, el método de determinantes es una técnica clásica para resolver sistemas de ecuaciones lineales. Aunque puede ser computacionalmente costoso para sistemas grandes, es una herramienta valiosa para sistemas pequeños y cuando se requieren soluciones en términos de parámetros.
        </Text>

        <Text style={styles.subtitle}>Información Adicional</Text>
        <Video
          source={require('@/assets/videos/determinantes.mp4')}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#8B4513',
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 26,
    color: '#333',
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: 240,
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

export default DeterminantsLesson;