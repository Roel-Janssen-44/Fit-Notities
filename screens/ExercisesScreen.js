import React, {useState} from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';

import S from '../styles'
import AppButton from '../components/AppButton'
import AppInputField from '../components/AppInputField'
import ExerciseNameRow from '../components/ExerciseNameRow'
import { selectExercises, selectNewExercise, selectErrorMessage, selectMusclegroups } from "../features/exercises/exercisesSlice";
import { addExercise, setNewExercise, setErrorMessage, setMusclegroupValue } from '../features/exercises/exercisesSlice';

const musclegroupsTemplate = [
    {label: 'Chest', value: 'chest'},
    {label: 'Back', value: 'back'},
    {label: 'Legs', value: 'legs'},
    {label: 'Tricep', value: 'tricep'},
    {label: 'Bicep', value: 'bicep'},
    {label: 'Abs', value: 'abs'},
]

export default function ExercisesScreen() {

    // Musclegroup picker
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('chest');

    const dispatch = useDispatch(); 

    const exercises = useSelector(selectExercises);
    const newExercise = useSelector(selectNewExercise);
    const errorMessage = useSelector(selectErrorMessage);
    const musclegroups = useSelector(selectMusclegroups);
    
    const handleAddExercise = () => {
        if (!newExercise) dispatch(setErrorMessage('Exercise must have a name'))
        else if (!exercises.includes(newExercise)) {
            dispatch(addExercise(newExercise));
            Keyboard.dismiss();
        }
        else dispatch(setErrorMessage('Exercise already exists'))
    }

    
    const handleInputChange = (text) => {
        dispatch(setNewExercise(text));
    }

    const setDropdownValue = (callback) => {
        console.log('callback')
        console.log(callback(state))
    }
    
    // setValue(callback) {
    //     this.setState(state => ({
    //       value: callback(state.value)
    //     }));
    //   }


  return (
    <View style={S.container}>
        <Text style={S.h2}>ExercisesScreen</Text>
        <ScrollView>
            {exercises.map((exercise, index) => (
                <TouchableOpacity 
                    key={exercise + index} 
                    style={{ marginVertical: 8, }}
                    // onPress={showEditModal} 
                    // onLongPress={ShowDeleteModal}
                >
                    <ExerciseNameRow name={exercise} musclegroups={musclegroups} />
                </TouchableOpacity>
            ))}
        </ScrollView>
        <KeyboardAvoidingView 
            style={{ marginBottom: 135, paddingTop: 10, }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={90}
        >
            {errorMessage &&
                <Text>{errorMessage}</Text>
            }
            <AppInputField 
                handleChange={handleInputChange}
                value={newExercise}
            />
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
            <AppButton onPress={handleAddExercise} title="Add Exercise" />
        </KeyboardAvoidingView>

        {/* {showRemoveModal &&
            <RemoveModal
                showRemoveModal={showRemoveModal}
                setShowRemoveModal={setShowRemoveModal}
                onDelete={onDelete}
                title="Remove Workoutplan"
            />
        } */}
    </View>
  );
}



