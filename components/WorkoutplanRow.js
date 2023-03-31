import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import ExerciseNameRow from './ExerciseNameRow';
import { selectMusclegroups } from "../features/exercises/exercisesSlice";

export default function WorkoutplanRow({ workoutplan }) {

  const musclegroups = useSelector(selectMusclegroups);

  return (
    <View style={{ paddingVertical: 7, marginVertical: 2 }}>
        <Text style={{ fontSize: 18, marginBottom: 8, fontWeight: 'bold' }}>{workoutplan.name}</Text>
        {workoutplan.exercises.map((exercise, index) => (
            <ExerciseNameRow key={index} name={exercise.name} musclegroups={musclegroups} />
        ))}
    </View>
  );
}
