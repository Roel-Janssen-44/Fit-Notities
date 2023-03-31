import React from 'react';
import { View, Text } from 'react-native';

export default function SetRow({ set, index }) {
  return (
    <View
        style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            paddingHorizontal: 8,
            borderTopColor: index !== 0 ? '#1b1b1b' : 'transparent', 
            borderTopWidth: index !== 0 ? 1 : 0, 
            paddingVertical: 8,
            marginVertical: 3 
        }} 
    >
        <Text style={{ fontSize: 16, }}>Weight {set.weight} Kg</Text>
        <Text style={{ fontSize: 16, marginLeft: 20 }}>Reps {set.reps}</Text>
    </View>
  );
}
