import React from 'react';
import { View, Text } from 'react-native';

const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ExerciseNameRow({name, musclegroups}) {

  const musclegroup = musclegroups.find((mg) => mg.exercises.includes(name))
  const musclegroupName = Capitalize(musclegroup.name)

  return (
    <View style={{ 
      paddingVertical: 5, 
      marginVertical: 2, 
      flexDirection: 'row', 
      alignItems: 'center', 
    }}>
    <View style={{
      width: 4,
      marginRight: 6,
      height: '100%',
      backgroundColor: musclegroup.name === 'chest' ? 'red' : musclegroup.name === 'back' ? 'green' : musclegroup.name === 'legs' ? 'orange' : musclegroup.name === 'triceps' ? 'blue' : musclegroup.name === 'biceps' ? 'yellow' : 'black'
    }}></View>
      <Text style={{ fontSize: 18, flex: 1, }}>{name}</Text>
      <Text style={{ fontSize: 14, paddingRight: 10, }}>{musclegroupName}</Text>
    </View>
  );
}
