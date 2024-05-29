import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';

export default function FirstGradeEquationPage() {
  const [coefficientX, setCoefficientX] = useState('');
  const [operator, setOperator] = useState('+');
  const [constantTerm, setConstantTerm] = useState('');
  const [equalTerm, setEqualTerm] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const parsedCoefficientX = parseInt(coefficientX);
    const parsedConstantTerm = parseInt(constantTerm);
    const parsedEqualTerm = parseInt(equalTerm);

    if (isNaN(parsedCoefficientX) || isNaN(parsedConstantTerm) || isNaN(parsedEqualTerm)) {
      setResult(null);
      alert('Por favor, ingrese valores numéricos válidos.');
      return;
    }

    if (parsedCoefficientX === 0) {
      setResult(null);
      alert('El coeficiente de x no puede ser cero.');
      return;
    }

    const constantTermSign = operator === '+' ? 1 : -1;
    const calculatedResult = (parsedEqualTerm - constantTermSign * parsedConstantTerm) / parsedCoefficientX;

    setResult(calculatedResult);
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Calculadora de Ecuaciones de Primer Grado</Text>
        <View style={styles.equationContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={coefficientX}
            onChangeText={setCoefficientX}
            placeholder="a"
          />
          <Text style={styles.equationText}>x</Text>
          <Picker
            style={styles.operatorPicker}
            selectedValue={operator}
            onValueChange={(value) => setOperator(value)}
          >
            <Picker.Item label="+" value="+" />
            <Picker.Item label="-" value="-" />
          </Picker>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={constantTerm}
            onChangeText={setConstantTerm}
            placeholder="b"
          />
          <Text style={styles.equationText}>=</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={equalTerm}
            onChangeText={setEqualTerm}
            placeholder="c"
          />
        </View>
        <Button
          title="Calcular"
          onPress={handleCalculate}
          buttonStyle={styles.calculateButton}
        />
        {result !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Resultado: x = {result}</Text>
          </View>
        )}
        <View style={styles.limitationsContainer}>
          <Text style={styles.limitationsTitle}>Limitaciones:</Text>
          <Text style={styles.limitationsText}>- Solo se permiten números enteros positivos.</Text>
          <Text style={styles.limitationsText}>- El coeficiente de x no puede ser cero.</Text>
          <Text style={styles.limitationsText}>- Las operaciones entre los términos solo pueden ser suma o resta.</Text>
          <Text style={styles.limitationsText}>- No se admiten fracciones.</Text>
        </View>
      </View>
      <View style={styles.linksContainer}>
        <Text style={styles.linksTitle}>Enlaces relacionados:</Text>
        <Button
          title="Ecuaciones de primer grado - Daniel Carreon"
          onPress={() => openLink('https://www.youtube.com/watch?v=IHblqjW8RY8')}
          type="clear"
          titleStyle={styles.linkText}
        />
        <Button
          title="Resolver ecuaciones lineales - Matematicas profe Alex"
          onPress={() => openLink('https://www.youtube.com/watch?v=lolGRSlyY5E')}
          type="clear"
          titleStyle={styles.linkText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  equationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  equationText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  operatorPicker: {
    width: 60,
    height: 40,
    marginHorizontal: 8,
  },
  calculateButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    marginBottom: 16,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  limitationsContainer: {
    marginBottom: 16,
  },
  limitationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  limitationsText: {
    fontSize: 14,
    marginBottom: 4,
  },
  linksContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
  },
  linksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  linkText: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});