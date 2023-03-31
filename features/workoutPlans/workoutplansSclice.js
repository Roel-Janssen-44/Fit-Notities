import { createSlice } from "@reduxjs/toolkit";

export const workoutplansSlice = createSlice({
  name: "workoutplans",
  initialState: {
    workoutplans: [
        {
            name: 'Push',
            exercises: [
                {
                    name: 'Bench press',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
                {
                    name: 'Fly',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
                {
                    name: 'tricep pushdown',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
            ],
        },
        {
            name: 'Pull',
            exercises: [
                {
                    name: 'Lat pulldown',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
                {
                    name: 'Rows',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
                {
                    name: 'Bicep curl',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
            ],
        },
        {
            name: 'Legs',
            exercises: [
                {
                    name: 'Squat',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
                {
                    name: 'Leg extension',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
            ],
        },
        {
            name: 'Full body',
            exercises: [
                {
                    name: 'Bench press',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
                {
                    name: 'Squat',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
            ],
        },
        {
            name: 'Upper Body',
            exercises: [
                {
                    name: 'Bench press',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
                {
                    name: 'Rows',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
            ],
        },
        {
            name: 'Lower Body',
            exercises: [
                {
                    name: 'Squat',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
                {
                    name: 'Leg extension',
                    sets: [
                        {
                            weight: 40,
                            reps: 12,
                        },
                        {
                            weight: 60,
                            reps: 8,
                        },
                        {
                            weight: 80,
                            reps: 5,
                        },
                        {
                            weight: 100,
                            reps: 1,
                        },
                    ],
                },
            ],
        },
    ],
    newWorkoutplanName: '',
    currentWorkoutplanName: '',
    currentExercise: '',
    errorMessage: '',
},
reducers: {
    changeWorkoutplanName: (state, action) => {
        state.newWorkoutplanName = action.payload
    },
    addWorkoutplan: (state, action) => {
        state.errorMessage = '';
        state.newWorkoutplanName = '';
        state.workoutplans.push({
            name: action.payload,
            exercises: []
        });
    },
    setCurrentWorkoutplanName: (state, action) => {
        state.currentWorkoutplanName = action.payload;
    },
    addExerciseToCurrentWorkoutplan: (state, action) => {
        const workoutplanIndex = state.workoutplans.findIndex(workoutplan => workoutplan.name === state.currentWorkoutplanName);
        if (workoutplanIndex !== -1) {
            state.workoutplans[workoutplanIndex].exercises.push({
                name: action.payload,
                sets: [],
            });
        }
    },
    updateCurrentExercise: (state, action) => {
        const workoutplanIndex = state.workoutplans.findIndex(workoutplan => workoutplan.name === state.currentWorkoutplanName);
        if (workoutplanIndex !== -1) {
            const currentWorkoutplan = state.workoutplans[workoutplanIndex];
            const exerciseIndex = currentWorkoutplan.exercises.findIndex(exercise => exercise.name === state.currentExercise.name); // filter out the exercise with the same name as the updated exercise
            if (exerciseIndex !== -1) {
                const exercises = [...currentWorkoutplan.exercises];
                exercises[exerciseIndex] = {...exercises[exerciseIndex], sets: action.payload}; // replace the sets of the exercise at exerciseIndex with the new sets from action.payload
                state.workoutplans[workoutplanIndex] = {...currentWorkoutplan, exercises}; // update the workoutplan with the updated exercises array
            }
        }
    },
    setCurrentExercise: (state, action) => {
        state.currentExercise = action.payload
    },
    setErrorMessage: (state, action) => {
        state.errorMessage = action.payload;
    },
  },
});

export const { changeWorkoutplanName, updateCurrentExercise, addWorkoutplan, setCurrentExercise, setCurrentWorkoutplanName, editWorkoutplan, setErrorMessage, addExerciseToCurrentWorkoutplan } = workoutplansSlice.actions

export const selectworkoutplans = (state) => state.workoutplans.workoutplans;
export const selectNewWorkoutplanName = (state) => state.workoutplans.newWorkoutplanName;
export const selectErrorMessage = (state) => state.workoutplans.errorMessage;
export const selectCurrentWorkoutplanName = (state) => state.workoutplans.currentWorkoutplanName;
export const selectCurrentExercise = (state) => state.workoutplans.currentExercise;

export default workoutplansSlice.reducer;