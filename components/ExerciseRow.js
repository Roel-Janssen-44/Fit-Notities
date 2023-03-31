import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import SetRow from './SetRow';

export default function ExerciseRow({exercise, onPress}) {
  return (
    <View style={{ marginVertical: 20, }}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ fontSize: 18, }}>{exercise.name}</Text>
        {exercise.sets?.map((set, index) => (
          <SetRow key={set + index} index={index} set={set} />
        ))}
      </TouchableOpacity>
    </View>
  );
}
