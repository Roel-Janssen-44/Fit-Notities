import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import S from '../styles'
import AppButton from '../components/AppButton'
import WorkoutplanRow from '../components/WorkoutplanRow'
import EditNameModal from '../components/modals/EditNameModal'
import EditWorkoutplan from '../components/modals/EditWorkoutplan'
// Actions
import { changeWorkoutplanName, setCurrentWorkoutplanName, addWorkoutplan, setErrorMessage } from "../features/workoutPlans/workoutplansSclice";
// Selectors
import { selectNewWorkoutplanName, selectCurrentWorkoutplanName, selectworkoutplans, selectErrorMessage } from "../features/workoutPlans/workoutplansSclice";


export default function WorkoutplansScreen() {

    const dispatch = useDispatch();

    const workoutplans = useSelector(selectworkoutplans);
    const newWorkoutplanName = useSelector(selectNewWorkoutplanName);
    const errorMessage = useSelector(selectErrorMessage);

    const [showEditNameModal, setShowEditNameModal] = useState(false)
    const [showEditWorkoutplanModal, setShowEditWorkoutplanModal] = useState(false)

    const setNewWorkoutplanName = (text) => {
        dispatch(changeWorkoutplanName(text))
    }
    const cancelEditName = () => {
        dispatch(changeWorkoutplanName(''))
        dispatch(setErrorMessage(''))
    }
    const createNewWorkoutplan = () => {
        setShowEditNameModal(true)
    }
    const editCurrentWorkoutplan = () => {
        if (!newWorkoutplanName) {
            dispatch(setErrorMessage("Workoutplan name can not be empty"))
        } else {
            dispatch(addWorkoutplan(newWorkoutplanName));
            dispatch(setCurrentWorkoutplanName(newWorkoutplanName));
            setShowEditNameModal(false)
            setShowEditWorkoutplanModal(true)
        }
    }
    const editSelectedWorkoutplan = (workoutplan) => {
        dispatch(setCurrentWorkoutplanName(workoutplan.name));
        setShowEditWorkoutplanModal(true)
    }

  return (
    <View style={S.container}>
        <Text style={S.h2}>WorkoutplansScreen</Text>
        <ScrollView>
            {workoutplans.map((workoutplan, index) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => editSelectedWorkoutplan(workoutplan)} 
                // onLongPress={ShowDeleteModal}
                >
                    <WorkoutplanRow workoutplan={workoutplan} />
                </TouchableOpacity>
            ))}
        </ScrollView>
        <View style={{ marginBottom: 135, paddingTop: 10, }}>
            <AppButton onPress={createNewWorkoutplan} title="Create new" />
        </View>

        {showEditNameModal && 
            <EditNameModal 
                showModal={showEditNameModal} 
                setShowModal={setShowEditNameModal}
                onConfirm={editCurrentWorkoutplan}
                onCancel={cancelEditName}
                errorMessage={errorMessage}
                name={newWorkoutplanName}
                setName={setNewWorkoutplanName}
            />
        }
        {showEditWorkoutplanModal && 
            <EditWorkoutplan 
                showModal={showEditWorkoutplanModal} 
                setShowModal={setShowEditWorkoutplanModal}
                // workoutplan={currentWorkoutplan}
            />
        }

    </View>
  );
}



