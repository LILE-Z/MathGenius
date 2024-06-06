import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, ScrollView } from 'react-native';

const SistemaEcuaciones = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [e, setE] = useState('');
  const [f, setF] = useState('');
  const [solucion, setSolucion] = useState(null);

  const calcularSolucion = () => {
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f)) {
      Alert.alert('Error', 'Todos los coeficientes deben ser números.');
      return;
    }

    if (a <= 0 || b <= 0 || c <= 0 || d <= 0 || e <= 0 || f <= 0) {
      Alert.alert('Error', 'Todos los coeficientes deben ser positivos.');
      return;
    }

    const determinante = a * e - b * d;

    if (determinante === 0) {
      Alert.alert('Error', 'El sistema no tiene solución única.');
      return;
    }

    const x = (c * e - b * f) / determinante;
    const y = (a * f - c * d) / determinante;

    setSolucion({ x, y });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.calculatorContainer}>
        <Text style={styles.title}>Sistema de Ecuaciones 2x2</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="a"
            value={a}
            onChangeText={setA}
            keyboardType="numeric"
          />
          <Text style={styles.operator}>x + </Text>
          <TextInput
            style={styles.input}
            placeholder="b"
            value={b}
            onChangeText={setB}
            keyboardType="numeric"
          />
          <Text style={styles.operator}>y = </Text>
          <TextInput
            style={styles.input}
            placeholder="c"
            value={c}
            onChangeText={setC}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="d"
            value={d}
            onChangeText={setD}
            keyboardType="numeric"
          />
          <Text style={styles.operator}>x + </Text>
          <TextInput
            style={styles.input}
            placeholder="e"
            value={e}
            onChangeText={setE}
            keyboardType="numeric"
          />
          <Text style={styles.operator}>y = </Text>
          <TextInput
            style={styles.input}
            placeholder="f"
            value={f}
            onChangeText={setF}
            keyboardType="numeric"
          />
        </View>
        <Button
          title="Calcular"
          onPress={calcularSolucion}
          color="#4CAF50"
          style={styles.button}
        />
        {solucion && (
          <View style={styles.solutionContainer}>
            <Text style={styles.solutionText}>
              x = {solucion.x.toFixed(2)}, y = {solucion.y.toFixed(2)}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Método de Suma y Resta</Text>
        <Text style={styles.cardText}>
          El método de suma y resta es una técnica para resolver sistemas de ecuaciones lineales. Consiste en sumar o restar las ecuaciones para eliminar una de las variables y obtener una ecuación con una sola variable. Luego, se despeja la variable restante y se sustituye su valor en una de las ecuaciones originales para obtener el valor de la otra variable.
        </Text>
        <Text style={styles.cardText}>
          Limitaciones:
          - El sistema debe tener solución única.
          - Los coeficientes deben ser números reales.
          - El método puede volverse tedioso para sistemas grandes.
        </Text>
        <Image
          source={{ uri: 'https://nemdigitalstorage.blob.core.windows.net/nem-main/images/2022/10/14/de7aabc5-4a7e-4298-8ef3-6bdb4175ef5f.png' }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor:"#C7B7A3"
  },
  calculatorContainer: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  operator: {
    fontSize: 18,
    color: 'black',
  },
  button: {
    marginTop: 20,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#B5C18E',
  },
  solutionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  solutionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 150,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default SistemaEcuaciones;