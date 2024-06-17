import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal } from 'react-native';

const questions = [
  {
    question: '¿Qué son los sistemas de ecuaciones?',
    options: [
      'Conjuntos de ecuaciones que se resuelven simultáneamente',
      'Ecuaciones aisladas sin relación entre sí',
      'Problemas matemáticos sin solución',
      'Fórmulas para calcular áreas y volúmenes',
    ],
    answer: 'Conjuntos de ecuaciones que se resuelven simultáneamente',
  },
  {
    question: '¿Quién realizó importantes contribuciones al estudio de los sistemas de ecuaciones?',
    options: ['Isaac Newton', 'Albert Einstein', 'Carl Friedrich Gauss', 'Stephen Hawking'],
    answer: 'Carl Friedrich Gauss',
  },
  {
    question: '¿Cuál es uno de los métodos comunes para resolver sistemas de ecuaciones?',
    options: ['Método de sustitución', 'Método de integración', 'Método de derivación', 'Método de factorización'],
    answer: 'Método de sustitución',
  },
  {
    question: '¿En qué área se utilizan los sistemas de ecuaciones para modelar y diseñar procesos?',
    options: ['Ingeniería química', 'Medicina', 'Psicología', 'Astronomía'],
    answer: 'Ingeniería química',
  },
  {
    question: '¿Qué habilidades promueve el estudio de los sistemas de ecuaciones?',
    options: [
      'Pensamiento lógico y resolución de problemas',
      'Habilidades artísticas y creativas',
      'Habilidades de comunicación y oratoria',
      'Habilidades de liderazgo y trabajo en equipo',
    ],
    answer: 'Pensamiento lógico y resolución de problemas',
  },
  {
    question: '¿En qué aspecto de la vida cotidiana se pueden aplicar los sistemas de ecuaciones?',
    options: ['Planificación de dietas', 'Diseño de moda', 'Creación de obras de arte', 'Composición musical'],
    answer: 'Planificación de dietas',
  },
];

const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    setShuffledQuestions(shuffle(questions));
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setShuffledQuestions(shuffle(questions));
  };

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/ea/37/27/ea372747316bc1d5fbd626a3fbf270e1.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {!showResult ? (
          <View style={styles.quizContainer}>
            <Text style={styles.questionText}>{shuffledQuestions[currentQuestion]?.question}</Text>
            <View style={styles.optionsContainer}>
              {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.selectedOptionButton,
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedOption !== null && (
              <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Your Score:</Text>
            <Text style={styles.scoreText}>
              {score}/{questions.length}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleRetry}>
              <Text style={styles.buttonText}>Retry Quiz</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  quizContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    minWidth: '100%',
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: '100%',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    minWidth: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default QuizScreen;