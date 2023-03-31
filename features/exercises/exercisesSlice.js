import { createSlice } from "@reduxjs/toolkit";

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState: {
    exercises: [
      'Bench press', 
      'Fly', 
      'tricep pushdown', 
      'skullcrushers',
      'Lat pulldown',
      'Rows',
      'Bicep curl',
      'Hammer curl',
      'Squat',
      'Leg extension',
    ],
    musclegroups: [
      {
        name: 'chest',
        exercises: ['Bench press', 'Fly'],
      },
      {
        name: 'back',
        exercises: ['Lat pulldown', 'Rows'],
      },
      {
        name: 'legs',
        exercises: ['Squat', 'Leg extension'],
      },
      {
        name: 'triceps',
        exercises: ['tricep pushdown', 'skullcrushers'],
      },
      {
        name: 'biceps',
        exercises: ['Bicep curl', 'Hammer curl'],
      },
      {
        name: 'abs',
        exercises: [],
      },
    ],
    newExercise: '',
    errorMessage: '',
    musclegroupValue: 'chest',
  },
  reducers: {
    addExercise: (state, action) => {
      state.exercises.push(action.payload);
      const musclegroup = state.musclegroups.find(group => group.name === state.musclegroupValue);
      if (musclegroup) {
        musclegroup.exercises.push(action.payload);
      }
      state.errorMessage = ''
      state.newExercise = ''
    },
    setNewExercise: (state, action) => {
      state.newExercise = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setMusclegroupValue: (state, action) => {
      state.musclegroupValue = action.payload;
    },
  },
});

export const { addExercise, setNewExercise, setErrorMessage, setMusclegroupValue } = exercisesSlice.actions

export const selectExercises = (state) => state.exercises.exercises;
export const selectNewExercise = (state) => state.exercises.newExercise;
export const selectErrorMessage = (state) => state.exercises.errorMessage;
export const selectMusclegroupValue = (state) => state.exercises.musclegroupValue;
export const selectMusclegroups = (state) => state.exercises.musclegroups;

export default exercisesSlice.reducer;