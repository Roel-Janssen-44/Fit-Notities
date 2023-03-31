import React, { useState } from 'react'
import { StyleSheet, Keyboard, ScrollView, View, TouchableOpacity, Modal, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';

import S from '../../styles'
import AppInputField from '../AppInputField';
import AppButton from '../AppButton'
import ExerciseNameRow from '../ExerciseNameRow'

// Actions
import { setMusclegroupValue } from '../../features/exercises/exercisesSlice';
import { setNewExercise, addExercise } from '../../features/exercises/exercisesSlice';
// Selectors
import { selectNewExercise } from '../../features/exercises/exercisesSlice';

const musclegroupsTemplate = [
    {label: 'Chest', value: 'chest'},
    {label: 'Back', value: 'back'},
    {label: 'Legs', value: 'legs'},
    {label: 'Tricep', value: 'tricep'},
    {label: 'Bicep', value: 'bicep'},
    {label: 'Abs', value: 'abs'},
]

const CreateNewExerciseModal = (props) => {

    const dispatch = useDispatch()

    // Musclegroup picker
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('chest');

    const [errorMessage, setErrorMessage] = useState('');

    const newExerciseName = useSelector(selectNewExercise)

    const handleInputChange = (text) => {
        dispatch(setNewExercise(text))
        if(!text) {
            setErrorMessage('Field must be filled in.')
        } else {
            setErrorMessage('')
        }
    }

    const handleAddExercise = () => {
        // if(newExerciseName)
        console.log('newExerciseName')
        console.log(newExerciseName)
        if(!newExerciseName) {
            setErrorMessage('Field must be filled in.')
        } else {
            setErrorMessage('')
            Keyboard.dismiss()
            dispatch(addExercise(newExerciseName))
            props.setShowModal(!props.showModal)
        }
    }

    return (
        <Modal
            animationType="slide"
            visible={props.showModal}
            presentationStyle='pageSheet'
            onRequestClose={() => {
                props.setShowModal(!props.showModal);
            }}
        >
            <View style={S.container}>
                <Text style={[S.h2, { flex: 1, }]}>Create exercise modal</Text>
                <KeyboardAvoidingView 
                    style={{ marginBottom: 35, paddingTop: 10, }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={160}
                >
                    {errorMessage &&
                        <Text>{errorMessage}</Text>
                    }
                    <DropDownPicker
                        style={{ 
                            backgroundColor: 'transparent', 
                            borderColor: '#009688',
                            borderWidth: 2,
                            marginBottom: 10,
                        }}
                        open={open}
                        value={value}
                        items={musclegroupsTemplate}
                        setOpen={setOpen}
                        setValue={setValue}
                        onChangeValue={(value) => {
                                dispatch(setMusclegroupValue(value))
                        }}
                    />
                    <AppInputField 
                        handleChange={(text) => handleInputChange(text)}
                        value={newExerciseName}
                        placeholder="Exercise name"
                    />
                    <AppButton onPress={handleAddExercise} title="Add Exercise" />
                </KeyboardAvoidingView>
            </View>
        </Modal>
    )
}

export default CreateNewExerciseModal