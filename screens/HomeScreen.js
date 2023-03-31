import React, { useState, useEffect, useRef } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import S from '../styles'
import AppButton from '../components/AppButton'
import SelectWorkoutplanModal from '../components/modals/SelectWorkoutplanModal'
import EditExerciseSetsModal from '../components/modals/EditExerciseSetsModal'
import AddExerciseModal from '../components/modals/AddExerciseModal'
import ExerciseRow from '../components/ExerciseRow';

// Selectors
import { selectworkouts, selectCurrentWorkout, selectCurrentExercise, selectCurrentMarkedDate } from "../features/workouts/workoutsSlice";
import { selectworkoutplans } from "../features/workoutPlans/workoutplansSclice";
// Actions
import { setCurrentWorkoutId, useWorkoutplan, setCurrentExercise, updateWorkouts } from '../features/workouts/workoutsSlice'
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const workoutplans = useSelector(selectworkoutplans)
    const workouts = useSelector(selectworkouts)
    const currentWorkoutId = useSelector(selectCurrentWorkout);
    let currentWorkout = null;
    if(currentWorkoutId !== null) {
        currentWorkout = workouts.filter(workout => workout.id == currentWorkoutId)
    }

    useEffect(() => {
        const newDate = new Date()
        const day = ("0" + (newDate.getDate())).slice(-2)
        const month = ("0" + (newDate.getMonth() + 1)).slice(-2)
        const year = newDate.getFullYear()
        const date = `${day}-${month}-${year}`
        dispatch(setCurrentWorkoutId(date)) 
    }, []);

    const setCurrentWorkout = (workoutplan) => {
        if(currentWorkout[0] !== null) {
            dispatch(useWorkoutplan(workoutplan))
        }
        navigation.navigate('WorkoutsScreen')
    }

  return (
    <View style={S.container}>
        <Text style={[S.h1, { marginBottom: 10, }]}>Welcome,</Text>
        <Text style={S.h1}>Geraldien</Text>
        {/* Stats */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
          <View>
            <Text style={[styles.title, {marginBottom: 6}]}>Workouts:</Text>
            <Text style={[styles.title, {fontWeight: 'bold', fontSize: 28}]}>{workouts.length}</Text>
          </View>
          <View>
            <Text style={[styles.title, {marginBottom: 6}]}>Volume:</Text>
            <Text style={[styles.title, {fontWeight: 'bold', fontSize: 26}]}>20.372 Kg</Text>
          </View>
        </View>
        {/* Workoutplans */}
        <Text style={[styles.title, {marginTop: 48, marginBottom: 16, fontWeight: 'bold'}]}>My workout plans</Text>
        <ScrollView horizontal>
            {workoutplans?.map((workoutplan, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={() => setCurrentWorkout(workoutplan)}>
                    <Text style={styles.cardTitle}>{workoutplan.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        paddingLeft: 24,
        paddingRight: 24,
    },
    title: {
        fontSize: 22,
    },
    card: {
        borderRadius: 24,
        width: 125,
        height: 125,
        borderWidth: 2,
        borderColor: 'black',
        marginRight: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});
