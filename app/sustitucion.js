import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SubstitutionLesson = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const router = useRouter();

  const content = {
    history: 'El método de sustitución para resolver sistemas de ecuaciones fue desarrollado por el matemático árabe Al-Khwarizmi en el siglo IX. Este método se basa en la idea de expresar una variable en términos de otra y luego sustituirla en la otra ecuación para obtener una ecuación con una sola variable.',
    methods: 'El método de sustitución consiste en los siguientes pasos: Primero, se despeja una de las variables en una de las ecuaciones. Luego, se sustituye la expresión obtenida para esa variable en la otra ecuación. Después, se resuelve la ecuación resultante para obtener el valor de la variable restante. Finalmente, se sustituye el valor encontrado en la expresión despejada inicialmente para obtener el valor de la otra variable.',
  };

  const speakText = () => {
    const text = content.history + ' ' + content.methods;
    Speech.speak(text, { language: 'es' });
    setIsSpeaking(true);
  };

  const handleCalculatorPress = () => {
    router.push(
      {
        pathname: '/temporal',
        params: {
          titulo:"Sistema de ecuaciones",
      },
      },
      { animation: 'slide-in-right' }
    );

  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>El Método de Sustitución</Text>

        <Text style={styles.subtitle}>Historia</Text>
        <Text style={styles.paragraph}>{content.history}</Text>

        <Text style={styles.subtitle}>¿Cómo funciona?</Text>
        <Text style={styles.paragraph}>{content.methods}</Text>
        <Image source={{ uri: 'https://d138zd1ktt9iqe.cloudfront.net/media/seo_landing_files/substitution-method-1626429874.png' }} style={styles.image} />

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.paragraph}>
          Una de las ventajas del método de sustitución es que es relativamente sencillo de aplicar y entender. Además, es útil cuando una de las ecuaciones tiene una variable que es fácil de despejar.
        </Text>

        <Text style={styles.subtitle}>Desventajas</Text>
        <Text style={styles.paragraph}>
          Una desventaja del método de sustitución es que puede llevar a expresiones complejas o fracciones después de la sustitución, lo que puede dificultar la resolución de la ecuación resultante.
        </Text>

        <Text style={styles.subtitle}>Ejemplo</Text>
        <Text style={styles.paragraph}>
          Considera el siguiente sistema de ecuaciones:
          {'\n'}x + y = 7
          {'\n'}2x - y = 1
        </Text>
        <Text style={styles.paragraph}>
          Usando el método de sustitución, despejamos una variable, por ejemplo, y, en términos de x en la primera ecuación:
          {'\n'}y = 7 - x
        </Text>
        <Text style={styles.paragraph}>
          Luego, sustituimos esta expresión en la segunda ecuación:
          {'\n'}2x - (7 - x) = 1
        </Text>
        <Text style={styles.paragraph}>
          Simplificamos y resolvemos para x:
          {'\n'}2x - 7 + x = 1
          {'\n'}3x = 8
          {'\n'}x = 8/3
        </Text>
        <Text style={styles.paragraph}>
          Finalmente, sustituimos el valor de x en la expresión despejada inicialmente para obtener el valor de y:
          {'\n'}y = 7 - 8/3
          {'\n'}y = 13/3
        </Text>

        <Text style={styles.paragraph}>
          En resumen, el método de sustitución es una técnica útil para resolver sistemas de ecuaciones lineales. Aunque puede llevar a expresiones complejas en algunos casos, es un método directo y eficaz para encontrar las soluciones de un sistema de ecuaciones.
        </Text>


        <Text style={styles.subtitle}>Información Adicional</Text>
        <Video
          source={require('@/assets/videos/sustitucion.mp4')}
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
        <TouchableOpacity style={styles.button} onPress={handleCalculatorPress}>
          <Text style={styles.buttonText}>Calculadora de sistemas de ecuaciones 2x2 📚</Text>
        </TouchableOpacity>
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
    backgroundColor: '#FFF8DC',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8B4513',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#CD853F',
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 26,
    color: '#A0522D',
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  button: {
    backgroundColor: 'rgba(139, 69, 19, 0.8)',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubstitutionLesson;