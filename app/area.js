import React from 'react';
import { Text,View } from 'react-native';
export default function App() {
    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',

        }}>
            <Text style={{
                fontSize: 30,
                textAlign: 'center',
                fontWeight: 'bold',
                color: "black",
                
            }}>En proceso-Area</Text>
        </View>
    );
}
