import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Modal, Keyboard, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import S from '../../styles'
import AppInputField from '../AppInputField';
import AppButton from '../AppButton'
import ExerciseNameRow from '../ExerciseNameRow'
import SetRow from '../SetRow'

const EditExerciseSetsModal = (props) => {

    // const choseExercise = (exerciseName) => {
    //     props.setShowModal(!props.showModal);
    //     props.onChoose(exerciseName)
    // }

    const [updateState, setUpdateState] = useState(false)
    const [setIndex, setSetIndex] = useState()

    const [reps, setReps] = useState(0)
    const [weight, setWeight] = useState(0)
    const addRep = () => {
        setReps((prev) => Number(prev) + 1)
        // Keyboard.dismiss()
    }
    const removeRep = () => {
        setReps((prev) => Number(prev) - 1)
        // Keyboard.dismiss()
    }
    const handleRepChange = (value) => {
        setReps(value)
    }
    const addWeight = () => {
        setWeight((prev) => Number(prev) + 2.5)
        // Keyboard.dismiss()
    }
    const removeWeight = () => {
        setWeight((prev) => Number(prev) - 2.5)
        // Keyboard.dismiss()
    }
    const handleWeightChange = (value) => {
        setWeight(value)
    }

    const changeUpdateState = (index, reps, weight) => {
        setSetIndex(index)
        setUpdateState(true)
        setReps(reps)
        setWeight(weight)
    }

    const handleUpdate = (deleteState) => {
        Keyboard.dismiss()
        let newSetsArray = [];
        if (props.exercise.sets) newSetsArray = props.exercise.sets
        if (deleteState == 'delete') {
            // Remove set
            console.log('remove')
            const updatedSetsArray = [...newSetsArray];
            updatedSetsArray.splice(setIndex, 1);
            newSetsArray = updatedSetsArray
            setUpdateState(false)
            setSetIndex(null)
        } else if (updateState && deleteState !== 'delete') {
            // Update set
            const updatedSetsArray = [...newSetsArray];
            updatedSetsArray.splice(setIndex, 1, {weight: weight, reps: reps});
            newSetsArray = updatedSetsArray
            setUpdateState(false)
            setSetIndex(null)
        } else {
            // Add set
            console.log('add')
            const updatedSetsArray = [...newSetsArray];
            updatedSetsArray.push({weight: weight, reps: reps});
            newSetsArray = updatedSetsArray
        }
        props.onComplete(newSetsArray)
    }

    const handleClose = () => {
        console.log('handleClose')
        if (props.onClose) {
            props.onClose(props.exercise)
        }
        props.setShowModal(!props.showModal);
    }

    return (
        <Modal
            animationType="slide"
            visible={props.showModal}
            presentationStyle='pageSheet'
            transparent={false} 
            onRequestClose={handleClose}
        >
            <View style={S.container}>
                <Text style={S.h2}>{props.exercise.name}</Text>
                <ScrollView style={{ flex: 1, }}>
                    {props.exercise?.sets?.map((set, index) => (
                        <TouchableOpacity 
                        key={set + index} 
                        style={{ marginVertical: 8, }}
                        onPress={() => changeUpdateState(index, set.reps, set.weight)}
                        >
                            <SetRow set={set} index={index} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View 
                    style={{ 
                        paddingBottom: 40, 
                        paddingTop: 30,
                        backgroundColor: '#fff',
                    }}
                >
                    <KeyboardAvoidingView
                        style={{ padddginVertical: 50, backgroundColor: '#fff', }}
                        behavior='position'
                        keyboardVerticalOffset={updateState ? 500 : 575}
                    >
                        <View style={{ backgroundColor: '#fff'}}>

                            <View style={{ paddingTop: 20, }}>
                                <Text style={styles.inputLabel}>
                                    Weight:
                                </Text>
                                <View style={styles.inputContainer}>
                                    <View style={{ width: 100, height: 50, }}>
                                        <AppButton onPress={removeWeight} title="-" />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => handleWeightChange(text)}
                                        value={weight.toString()}
                                        placeholder="0"
                                        keyboardType="numeric"
                                    />
                                    <View style={{ width: 100, height: 50, }}>
                                        <AppButton onPress={addWeight} title="+" />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginBottom: 20, marginTop: 10 }}>
                                <Text style={styles.inputLabel}>
                                    Reps:
                                </Text>
                                <View style={styles.inputContainer}>
                                    <View style={{ width: 100, height: 50, }}>
                                        <AppButton onPress={removeRep} title="-" />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => handleRepChange(text)}
                                        value={reps.toString()}
                                        keyboardType="number-pad"
                                        placeholder="0"
                                    />
                                    <View style={{ width: 100, height: 50, }}>
                                        <AppButton onPress={addRep} title="+" />
                                    </View>
                                </View>
                            </View>
                            <View>
                                <AppButton 
                                    onPress={() => {
                                        handleUpdate()
                                    }} 
                                    title={updateState ? 'Update' : 'Add'} 
                                    />
                            </View>
                            {updateState && 
                            <View 
                                style={{ 
                                    paddingTop: 20, 
                                    margin: 0,
                                }}
                            >
                                <AppButton 
                                    onPress={() => 
                                        handleUpdate('delete')
                                    } 
                                    title='Delete' 
                                />
                            </View>
                            }
                        </View>

                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
    )
}

export default EditExerciseSetsModal

const styles = StyleSheet.create({
    exercise: {
        borderBottomWidth: 1,
        paddingVertical: 16,
        borderBottomColor: '#000',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        height: 50,
        borderColor: 'lightgray',
        borderWidth: 1,
        marginHorizontal: 16,
    },
    inputLabel: {
        marginBottom: 32,
    }
});