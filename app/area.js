import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';

const App = () => {
  const [coeficiente, setCoeficiente] = useState('');
  const [exponente, setExponente] = useState('');
  const [constante, setConstante] = useState('');
  const [resultado, setResultado] = useState(null);
  const [pasos, setPasos] = useState([]);

  const calcularArea = () => {
    if (coeficiente === '' || exponente === '' || constante === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const a = parseFloat(coeficiente);
    const n = parseFloat(exponente);
    const c = parseFloat(constante);

    if (a <= 0 || n <= 0) {
      alert('El coeficiente y el exponente deben ser positivos.');
      return;
    }

    const limiteInferior = 0;
    const limiteSuperior = Math.pow((c / a), 1 / n);

    const nuevoPasos = [
      `Paso 1: Verifica que el coeficiente ${a} y el exponente ${n} sean positivos.`,
      `Paso 2: Calcula el límite superior utilizando la fórmula: (${c} / ${a})^(1 / ${n})`,
      `Paso 3: Aplica la fórmula para calcular el área bajo la curva: Integral desde ${limiteInferior} hasta ${limiteSuperior} de ${a}x^${n} + ${c} dx`,
      `Paso 4: Resuelve la integral: (${a} / (${n} + 1)) * ${limiteSuperior}^(${n} + 1) + ${c} * ${limiteSuperior}`,
    ];

    setPasos(nuevoPasos);

    const area = (a / (n + 1)) * Math.pow(limiteSuperior, n + 1) + c * limiteSuperior;
    setResultado(area.toFixed(2));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cálculo del Área Bajo la Curva</Text>
      <View style={styles.formulaContainer}>
        <Image source={require('@/assets/images/formula.png')} style={styles.formulaImage} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={coeficiente}
          onChangeText={setCoeficiente}
          keyboardType="numeric"
          placeholder="a"
        />
        <Text style={styles.formulaText}>x</Text>
        <TextInput
          style={[styles.input, styles.exponenteInput]}
          value={exponente}
          onChangeText={setExponente}
          keyboardType="numeric"
          placeholder="n"
        />
        <Text style={styles.formulaText}>+</Text>
        <TextInput
          style={styles.input}
          value={constante}
          onChangeText={setConstante}
          keyboardType="numeric"
          placeholder="b"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={calcularArea}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      {!isNaN(resultado) && (
        <>
          {pasos.map((paso, index) => (
            <View key={index} style={styles.pasoContainer}>
              <Text style={styles.pasoText}>{paso}</Text>
            </View>
          ))}
          {resultado && (
            <Text style={styles.result}>
              El área bajo la curva es: {resultado}
            </Text>
          )}
        </>
      )}
      <View style={styles.limitacionesContainer}>
        <Text style={styles.limitacionesTitle}>Limitaciones del programa:</Text>
        <Text style={styles.limitacionesText}>- El coeficiente y el exponente deben ser positivos.</Text>
        <Text style={styles.limitacionesText}>- La fórmula debe tener la forma ax^n + b.</Text>
        <Text style={styles.limitacionesText}>- El programa calcula el área bajo la curva en el intervalo [0, (b/a)^(1/n)].</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E0F2E9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E8B57',
  },
  formulaContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  formulaImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  exponenteInput: {
    marginTop: -20,
  },
  formulaText: {
    fontSize: 18,
    marginHorizontal: 5,
    color: '#2E8B57',
  },
  button: {
    backgroundColor: '#98FB98',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pasoContainer: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  pasoText: {
    fontSize: 16,
    color: '#2E8B57',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#2E8B57',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  limitacionesContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  limitacionesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E8B57',
  },
  limitacionesText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2E8B57',
  },
});

export default App;