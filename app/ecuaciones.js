import React from 'react';
import { Text,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
    return(
        <SafeAreaView>
            <Text style={{
                fontSize: 30,
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'blue'
                
            }}>En proceso-Ecuaciones</Text>
        </SafeAreaView>
    );
}
