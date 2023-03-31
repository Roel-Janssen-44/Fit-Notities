import React, { useState, useEffect, useRef } from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
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
import { setCurrentWorkoutId, removeExerciseFromWorkout, useWorkoutplan, setCurrentExercise, updateWorkouts } from '../features/workouts/workoutsSlice'

// Calendar
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';


export default function WorkoutsScreen() {

    const [showWorkoutPlanModal, setShowWorkoutPlanModal] = useState(false)
    const [showEditExerciseModal, setShowEditExerciseModal] = useState(false)
    const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)

    const dispatch = useDispatch();

    const workoutplans = useSelector(selectworkoutplans);
    const workouts = useSelector(selectworkouts);
    const currentWorkoutId = useSelector(selectCurrentWorkout);
    const currentMarkedDate = useSelector(selectCurrentMarkedDate)

    const currentWorkout = workouts.filter(workout => workout.id == currentWorkoutId)
    const currentExercise = useSelector(selectCurrentExercise);


    const handleSelect = (workoutplan) => {
        console.log('chooseExercise')
        // Close modal
        setShowWorkoutPlanModal(false)
        if (workoutplan && !currentWorkoutId) {
            const newDate = new Date()
            const day = ("0" + (newDate.getDate())).slice(-2)
            const month = ("0" + (newDate.getMonth() + 1)).slice(-2)
            const year = newDate.getFullYear()
            const date = `${day}-${month}-${year}`
            dispatch(setCurrentWorkoutId(date))
        } else if(workoutplan && currentWorkoutId) {
            dispatch(useWorkoutplan(workoutplan))
        } else {
            dispatch(useWorkoutplan({
                exercises: [],
            }))
            setShowAddExerciseModal(true)
        }
    }

    const handleWorkoutPlanModal = () => {
        console.log('chooseExercise')
        setShowWorkoutPlanModal(true)
    }

    const editExerciseSets = (exercise) => {
        console.log('edit exercise sets')
        dispatch(setCurrentExercise(exercise))
        setShowEditExerciseModal(true)
    }

    const updateExercise = (newSetsArray) => {
        console.log('update exercise')
        dispatch(updateWorkouts({
            name: currentExercise.name,
            sets: newSetsArray
        }))
    }

    const handleEditExerciseModalClose = (exerciseObject) => {
        // console.log(exerciseObject)
        // console.log(exerciseObject.sets[0])
        // console.log(exerciseObject.name)
        if (exerciseObject.sets[0]) return
        dispatch(removeExerciseFromWorkout(exerciseObject.name))
    }

    const chooseExercise = (exercise) => {
        console.log('chooseExercise')
        dispatch(updateWorkouts({
            name: exercise,
            sets: [],
        }))
        dispatch(setCurrentExercise({
            name: exercise,
            sets: [],
        }))
        setShowEditExerciseModal(true)
    }

    const changeDate = (date) => {
        console.log('changeDate')
        let temporaryCurrentDate;
        const dateParts = date.split('-')
        for(let i = 0; i < dateParts.length; i++) {
            if (i === 0) {
                temporaryCurrentDate = dateParts[dateParts.length - i - 1]
            } else {
                temporaryCurrentDate += '-' + dateParts[dateParts.length - i - 1]
            }
        }
        dispatch(setCurrentWorkoutId(temporaryCurrentDate))
    }
    
  let weekView = false;
  return (
    <View style={[S.container, {paddingHorizontal: 0},]}>
        <Text style={[S.h2, { paddingHorizontal: 24, }]}>{currentWorkout[0]?.name || 'Start new workout'}</Text>
        <View style={{ height: 150, }}>
            <CalendarProvider
                date={'2023-03-20'}
                onDateChanged={(date) => changeDate(date)}
                theme={{
                    backgroundColor: '#f5f5f5',
                    calendarBackground: '#f5f5f5',
                    textSectionTitleColor: 'black',
                    textSectionTitleDisabledColor: 'lightgray',
                    dayTextColor: 'black',
                    todayTextColor: 'red',
                    selectedDayTextColor: 'white',
                    monthTextColor: 'black',
                    indicatorColor: 'black',
                    selectedDayBackgroundColor: '#333248',
                    arrowColor: 'black',
                }}
            >
                {weekView ? (
                    <WeekCalendar 
                        firstDay={1}
                        allowShadow={true}
                        hideDayNames={true}
                    />
                ) : (
                    <ExpandableCalendar
                        firstDay={1}
                        hideKnob
                        openThreshold={100}
                    />
                )}
            </CalendarProvider>
        </View>
        <ScrollView style={{ flex: 1, maxHeight: '100%', paddingHorizontal: 24, }}>
            {currentWorkout[0]?.exercises[0] && (
                <View>
                    {currentWorkout[0]?.exercises?.map((exercise, index) => (
                        <View key={index}>
                            <ExerciseRow exercise={exercise} onPress={() => editExerciseSets(exercise)} />
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
        {!currentWorkout[0]?.exercises[0] &&
            <View style={{ marginBottom: 135, paddingTop: 10, gap: 30, paddingHorizontal: 24 }}>
                <AppButton onPress={handleWorkoutPlanModal} title="Choose workoutplan" />
                <AppButton onPress={() => handleSelect(null)} title="Start without plan" />
            </View>
        }
        {currentWorkout[0]?.exercises[0] &&
            <View style={{ marginBottom: 135, paddingTop: 10, gap: 30, paddingHorizontal: 24 }}>
                <AppButton onPress={() => setShowAddExerciseModal(true)} title="Add exercise" />
            </View>
        }
        {showWorkoutPlanModal && 
            <SelectWorkoutplanModal 
                showModal={showWorkoutPlanModal} 
                setShowModal={setShowWorkoutPlanModal}
                workoutplans={workoutplans}
                handleSelect={handleSelect}
            />
        }
        {showEditExerciseModal && currentExercise && 
            <EditExerciseSetsModal 
                showModal={showEditExerciseModal} 
                setShowModal={setShowEditExerciseModal}
                exercise={currentExercise}
                onComplete={updateExercise}
                onClose={handleEditExerciseModalClose}
            />
        }
        {showAddExerciseModal && 
            <AddExerciseModal 
                showModal={showAddExerciseModal} 
                setShowModal={setShowAddExerciseModal}
                onChoose={chooseExercise}
            />
        }
    </View>
  );
}



