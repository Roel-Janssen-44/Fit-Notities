import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Modal, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import S from '../../styles'
import AppInputField from '../AppInputField';
import AppButton from '../AppButton'
import AddExerciseModal from './AddExerciseModal';
import EditExerciseSetsModal from './EditExerciseSetsModal';
import ExerciseRow from '../ExerciseRow';
// Actions
import { changeWorkoutplanName, addExerciseToCurrentWorkoutplan, updateCurrentExercise, setCurrentExercise, setCurrentWorkoutplanName, addWorkoutplan, setErrorMessage } from "../../features/workoutPlans/workoutplansSclice";
// Selectors
import { selectNewWorkoutplanName, selectCurrentExercise, selectCurrentWorkoutplanName, selectworkoutplans, selectErrorMessage } from "../../features/workoutPlans/workoutplansSclice";


const EditWorkoutplan = (props) => {

    const closeModal = () => {
        props.setShowModal(!props.showModal);
    }

    const dispatch = useDispatch();

    const workoutplans = useSelector(selectworkoutplans);
    const currentWorkoutplanName = useSelector(selectCurrentWorkoutplanName);
    const currentWorkoutplan = workoutplans.filter((workoutplan) => workoutplan.name === currentWorkoutplanName)
    const currentExercise = useSelector(selectCurrentExercise);
    
    const chooseExercise = (exerciseName) => {
        console.log('choose Exercise')
        console.log(exerciseName)
        dispatch(addExerciseToCurrentWorkoutplan(exerciseName))
        dispatch(setCurrentExercise({
            name: exerciseName,
            sets: [],
        }))
        setShowEditExerciseModal(true)
    }
    
    const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
    const [showEditExerciseModal, setShowEditExerciseModal] = useState(false)
    
    // console.log('currentExercise')
    // console.log(currentExercise)

    const editExerciseSets = (exercise) => {
        console.log('setCurrentExercise')
        console.log(exercise)
        dispatch(setCurrentExercise(exercise))
        setShowEditExerciseModal(true)
    }

    const updateExercise = (newExerciseSets) => {
        const newExerciseObject = {
            name: currentExercise.name,
            sets: newExerciseSets
        }
        dispatch(setCurrentExercise(newExerciseObject))
        dispatch(updateCurrentExercise(newExerciseSets))
    }

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
                <View style={{ flex: 1, }}>
                    <Text style={S.h2}>{currentWorkoutplan[0].name}</Text>
                    <ScrollView style={{ width: '100%', marginBottom: 40, }}>
                        {currentWorkoutplan[0].exercises?.map((exercise, index) => (
                            <ExerciseRow key={exercise + index} onPress={() => editExerciseSets(exercise)} exercise={exercise} />
                        ))}
                    </ScrollView>
                </View>
                <View style={{ height: 100, }}>
                    <AppButton onPress={() => setShowAddExerciseModal(true)} title="Add exercise" />
                </View>
                {showAddExerciseModal && 
                    <AddExerciseModal 
                        showModal={showAddExerciseModal} 
                        setShowModal={setShowAddExerciseModal}
                        onChoose={chooseExercise}
                    />
                }
                {showEditExerciseModal && 
                    <EditExerciseSetsModal 
                        showModal={showEditExerciseModal} 
                        setShowModal={setShowEditExerciseModal}
                        exercise={currentExercise}
                        onComplete={updateExercise}
                        onclose={null}
                    />
                }
            </View>
        </Modal>
    )
}

export default EditWorkoutplan