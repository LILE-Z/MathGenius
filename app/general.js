import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';

export default function App() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState('');
  const [process, setProcess] = useState('');

  const calculateQuadraticEquation = () => {
    if (a === '' || b === '' || c === '') {
      Alert.alert('Error', 'Por favor, ingresa todos los coeficientes.');
      return;
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      Alert.alert('Error', 'Por favor, ingresa valores numéricos válidos.');
      return;
    }

    if (numA === 0) {
      Alert.alert('Error', 'El coeficiente "a" no puede ser cero.');
      return;
    }

    const discriminant = numB * numB - 4 * numA * numC;

    if (discriminant < 0) {
      Alert.alert('Error', 'La ecuación no tiene soluciones reales.');
      setResult('');
      setProcess('');
      return;
    }

    const sqrtDiscriminant = Math.sqrt(discriminant);
    const x1 = (-numB + sqrtDiscriminant) / (2 * numA);
    const x2 = (-numB - sqrtDiscriminant) / (2 * numA);

    const processText = `Fórmula general: x = (-b ± √(b^2 - 4ac)) / (2a)

Paso 1: Reemplazar los coeficientes en la fórmula.
a = ${numA}, b = ${numB}, c = ${numC}

Paso 2: Calcular el discriminante.
Discriminante = b^2 - 4ac
Discriminante = ${numB}^2 - 4(${numA})(${numC})
Discriminante = ${discriminant}

Paso 3: Calcular las soluciones.
x1 = (-b + √(discriminante)) / (2a)
x1 = (${-numB} + √(${discriminant})) / (2 * ${numA})
x1 = ${x1}

x2 = (-b - √(discriminante)) / (2a)
x2 = (${-numB} - √(${discriminant})) / (2 * ${numA})
x2 = ${x2}`;

    setProcess(processText);
    setResult(`Las soluciones son: x1 = ${x1}, x2 = ${x2}`);
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={50} style={styles.blurContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Resolución de Ecuaciones Cuadráticas</Text>
          <Text style={styles.subtitle}>Ingresa los coeficientes de la ecuación:</Text>
          <View style={styles.equationContainer}>
            <TextInput
              style={styles.input}
              placeholder="a"
              value={a}
              onChangeText={setA}
              keyboardType="numeric"
            />
            <Text style={styles.equationText}>x^2 + </Text>
            <TextInput
              style={styles.input}
              placeholder="b"
              value={b}
              onChangeText={setB}
              keyboardType="numeric"
            />
            <Text style={styles.equationText}>x + </Text>
            <TextInput
              style={styles.input}
              placeholder="c"
              value={c}
              onChangeText={setC}
              keyboardType="numeric"
            />
            <Text style={styles.equationText}> = 0</Text>
          </View>
          <Button title="Calcular" onPress={calculateQuadraticEquation} />
          <View style={styles.resultContainer}>
            <Text style={styles.process}>{process}</Text>
            <Text style={styles.result}>{result}</Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBF1F5',
  },
  blurContainer: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  equationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  equationText: {
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  process: {
    textAlign: 'left',
  },
  result: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});