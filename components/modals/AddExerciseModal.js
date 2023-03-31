import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Modal, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import S from '../../styles'
import AppInputField from '../AppInputField';
import AppButton from '../AppButton'
import ExerciseNameRow from '../ExerciseNameRow'
import CreateNewExerciseModal from './CreateNewExerciseModal';

// Actions
import { changeWorkoutplanName, setCurrentWorkoutplanName, addWorkoutplan, setErrorMessage } from "../../features/workoutPlans/workoutplansSclice";
// Selectors
import { selectNewWorkoutplanName, selectCurrentWorkoutplanName, selectworkoutplans, selectErrorMessage } from "../../features/workoutPlans/workoutplansSclice";
import { selectExercises, selectMusclegroups } from '../../features/exercises/exercisesSlice';


const addExerciseModal = (props) => {

    const [showCreateExerciseModal, setShowCreateExerciseModal] = useState(false) 

    const choseExercise = (exerciseName) => {
        props.setShowModal(!props.showModal);
        props.onChoose(exerciseName)
    }

    const musclegroups = useSelector(selectMusclegroups);
    const exercises = useSelector(selectExercises)

    return (
        <Modal
            animationType="slide"
            visible={props.showModal}
            presentationStyle='pageSheet'
            transparent={false} 
            onRequestClose={() => {
                props.setShowModal(!props.showModal);
            }}
        >
            <View style={S.container}>
                <Text style={S.h2}>Add exercise modal</Text>
                {/* To do search exercise */}
                <View>
                    <AppInputField
                        value={null}
                        handleChange={null}
                        placeholder="Search exercise.."
                    />
                </View>
                <ScrollView>
                    {exercises.map((exercise) => (
                        <TouchableOpacity 
                        key={exercise} 
                        style={{ marginVertical: 8, }}
                        onPress={() => choseExercise(exercise)} 
                        >
                            <ExerciseNameRow name={exercise} musclegroups={musclegroups} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {/* <View style={{ marginBottom: 35, paddingTop: 10, gap: 30, paddingHorizontal: 24 }}>
                    <AppButton onPress={() => null} title="Create new exercise" />
                </View> */}
                <TouchableOpacity 
                    style={{
                        position: 'absolute',
                        top: -6,
                        right: 24,
                    }}
                    onPress={() => setShowCreateExerciseModal(true)}
                >
                    <Text style={{
                        fontSize: 30,
                    }}>+</Text>
                </TouchableOpacity>
                {showCreateExerciseModal &&
                    <CreateNewExerciseModal
                        showModal={showCreateExerciseModal}
                        setShowModal={setShowCreateExerciseModal}
                    />
                }

            </View>
        </Modal>
    )
}

export default addExerciseModal