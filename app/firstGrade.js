import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button, Card } from '@rneui/themed';

export default function FirstGradeEquationPage() {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    // Remover espacios en blanco de la ecuación
    const cleanedEquation = equation.replace(/\s/g, '');

    // Verificar si la ecuación es válida
    const isValidEquation = /^-?\d+x?[-+]\d+=-?\d+$/.test(cleanedEquation);

    if (isValidEquation) {
      // Extraer los coeficientes y términos independientes
      const [leftSide, rightSide] = cleanedEquation.split('=');
      const leftTerms = leftSide.split(/[-+]/);
      const rightTerms = rightSide.split(/[-+]/);

      let coefficientX = 0;
      let constantTerm = 0;

      // Calcular el coeficiente de x y el término independiente
      leftTerms.forEach((term) => {
        if (term.includes('x')) {
          coefficientX += parseInt(term.replace('x', '') || '1');
        } else {
          constantTerm -= parseInt(term);
        }
      });

      rightTerms.forEach((term) => {
        constantTerm += parseInt(term);
      });

      // Calcular el resultado
      const calculatedResult = constantTerm / coefficientX;
      setResult(calculatedResult);
    } else {
      setResult(null);
      alert('La ecuación ingresada no es válida.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Title>Calculadora de Ecuaciones de Primer Grado</Card.Title>
        <Card.Divider />
        <View style={styles.inputContainer}>
          <Text style={styles.subtitle}>Ingrese una ecuación:</Text>
          <Input
            placeholder="Ejemplo: 2x + 5 = 11"
            value={equation}
            onChangeText={setEquation}
          />
          <Text style={styles.limitationsText}>
            Limitantes: Solo se permiten números enteros, no fracciones. Las operaciones entre los operadores solo pueden ser suma y resta. La variable debe ser 'x'.
          </Text>
          <Button
            title="Calcular"
            onPress={handleCalculate}
            buttonStyle={styles.calculateButton}
          />
        </View>
        {result !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Resultado: x = {result}</Text>
          </View>
        )}
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  limitationsText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  calculateButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});