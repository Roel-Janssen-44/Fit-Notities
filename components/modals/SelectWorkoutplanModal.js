import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Modal, Keyboard, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import S from '../../styles'
import AppInputField from '../AppInputField';
import AppButton from '../AppButton'
import ExerciseNameRow from '../ExerciseNameRow'
import SetRow from '../SetRow'

const SelectWorkoutplanModal = (props) => {


    // const handleUpdate = (deleteState) => {
    //     Keyboard.dismiss()
    //     let newSetsArray = [];
    //     if (props.exercise.sets) newSetsArray = props.exercise.sets
    //     if (deleteState == 'delete') {
    //         // Remove set
    //         console.log('remove')
    //         const updatedSetsArray = [...newSetsArray];
    //         updatedSetsArray.splice(setIndex, 1);
    //         newSetsArray = updatedSetsArray
    //         setUpdateState(false)
    //         setSetIndex(null)
    //     } else if (updateState && deleteState !== 'delete') {
    //         // Update set
    //         const updatedSetsArray = [...newSetsArray];
    //         updatedSetsArray.splice(setIndex, 1, {weight: weight, reps: reps});
    //         newSetsArray = updatedSetsArray
    //         setUpdateState(false)
    //         setSetIndex(null)
    //     } else {
    //         // Add set
    //         console.log('add')
    //         const updatedSetsArray = [...newSetsArray];
    //         updatedSetsArray.push({weight: weight, reps: reps});
    //         newSetsArray = updatedSetsArray
    //     }
    //     props.onComplete(newSetsArray)
    // }

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
                <Text style={S.h2}>Select Workoutplan</Text>
                <ScrollView>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                        {props.workoutplans?.map((workoutplan, index) => (
                            <View 
                                style={{ 
                                    width: '100%',
                                    marginVertical: 10,
                                
                                }}
                                key={workoutplan.name + index}
                            >
                                <TouchableOpacity 
                                    style={{ 
                                        borderWidth: 1, 
                                        borderRadius: 10,
                                        borderTopColor: '#1e1e1e', 
                                        backgroundColor: '#red', 
                                        padding: 20, 
                                    }}
                                    onPress={() => props.handleSelect(workoutplan)}
                                >
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                    }}>{workoutplan.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

export default SelectWorkoutplanModal
