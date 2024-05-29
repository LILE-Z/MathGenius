import React,{useEffect} from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams,useRouter } from 'expo-router';

const getContenido = (titulo) => {
  switch (titulo) {
    case 'Ecuaciones de 1 Grado':
      return {
        Titulo: 'Ecuaciones de 1 Grado',
        Descripcion: 'Las ecuaciones de primer grado son aquellas en las que la incógnita tiene exponente 1. Se pueden resolver despejando la incógnita mediante operaciones algebraicas básicas.',
        Imagen: "https://educacion3775.wordpress.com/wp-content/uploads/2017/09/ecuaciones-de-primer-grado.png",
        Fondo: '#F0E68C',
      };
    case 'Formula general':
      return {
        Titulo: 'Fórmula General',
        Descripcion: 'La fórmula general es una expresión que permite resolver cualquier ecuación de segundo grado. Proporciona las soluciones (raíces) de la ecuación cuadrática.',
        Imagen: "https://mathematicalmysteries.org/wp-content/uploads/2021/11/3eb41-11auhmjxh0gvsn49wzgqhcw.png",
        Fondo: '#87CEFA',
      };
    case 'Calculo de Area debajo de la Curva':
      return {
        Titulo: 'Cálculo de Área debajo de la Curva',
        Descripcion: 'El cálculo del área debajo de una curva se realiza mediante la integración. Consiste en determinar la región encerrada entre la curva y el eje x en un intervalo dado.',
        Imagen: "https://educatemath.com/wp-content/uploads/2022/08/area-under-the-curve.jpg",
        Fondo: '#90EE90',
      };
    case 'Sistema de ecuaciones':
      return {
        Titulo: 'Sistema de Ecuaciones',
        Descripcion: 'Un sistema de ecuaciones es un conjunto de dos o más ecuaciones que involucran las mismas incógnitas. Se resuelve encontrando los valores de las incógnitas que satisfacen todas las ecuaciones simultáneamente.',
        Imagen: "https://yosoytuprofe.20minutos.es/wp-content/uploads/2022/08/tres-me%CC%81todos-para-resolver-sistemas-de-ecuaciones.png",
        Fondo: '#023047',
      };
    default:
      return null;
  }
};

export default function Temporal() {
  const router=useRouter();
  const { titulo } = useLocalSearchParams();
  console.log('Título recibido:', titulo);
  const contenido = getContenido(titulo);

  if (!contenido) {
    return (
      <SafeAreaView style={style.container}>
        <Text style={{backgroundColor:'white'}}>Contenido no encontrado</Text>
        <Text style={{backgroundColor:'white'}}>Título: {titulo}</Text>
      </SafeAreaView>
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('firstGrade');
    }, 10000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={[style.container, { backgroundColor: contenido.Fondo }]}>
      <View style={style.contentContainer}>
        <Text style={style.titulo}>{contenido.Titulo}</Text>
        <Image source={{ uri: contenido.Imagen }} style={style.imagen} />
        <Text style={style.descripcion}>{contenido.Descripcion}</Text>
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
  imagen: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  descripcion: {
    fontSize: 16,
    textAlign: 'center',
  },
});