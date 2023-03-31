import { createSlice } from "@reduxjs/toolkit";

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState: {
    workouts: [
        {
            id: '19-03-2023',
            exercises: [
                {
                    name: 'Lat Pulldown',
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
                    name: 'Row',
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
            id: '20-03-2023',
            exercises: [
                {
                    name: 'Lat Pulldown',
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
                    name: 'Row',
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
    currentWorkoutId: null,
    currentExercise: null,
    currentMarkedDate: null,
},
reducers: {
    setCurrentWorkoutId: (state, action) => {
        console.log('set current id')
        state.currentWorkoutId = action.payload
        let temporaryCurrentDate;
        // To do check if exists
        const dateParts = action.payload.split('-')
        for(let i = 0; i < dateParts.length; i++) {
            if (i === 0) {
                temporaryCurrentDate = dateParts[dateParts.length - i - 1]
            } else {
                temporaryCurrentDate += '-' + dateParts[dateParts.length - i - 1]
            }
        }
        state.currentMarkedDate = {[temporaryCurrentDate]: { selected: true, marked: true }}
    },
    setCurrentExercise: (state, action) => {
        console.log('set current exercise')
        state.currentExercise = action.payload
    },
    updateWorkouts: (state, action) => {
        console.log('Update workouts')
        state.currentExercise = action.payload
        const updatedWorkouts = state.workouts.map((workout) => {
            if (workout.id === state.currentWorkoutId) {
              const updatedExercises = workout.exercises.map((exercise) => {
                if (exercise.name === action.payload.name) {
                  return {
                    ...exercise,
                    sets: action.payload.sets
                  };
                }
                return exercise;
              });
              const isExerciseInWorkout = workout.exercises.some((exercise) => exercise.name === action.payload.name);
              if (!isExerciseInWorkout) {
                updatedExercises.push(action.payload);
              }
              return {
                ...workout,
                exercises: updatedExercises
              };
            }
            return workout;
        });
        state.workouts = updatedWorkouts
    },
    useWorkoutplan: (state, action) => {
        console.log('Use plan')
        state.workouts.push({
            id: state.currentWorkoutId,
            exercises: action.payload.exercises
        })
    },
    removeExerciseFromWorkout: (state, action) => {
        console.log('Remove exercise')
        const updatedWorkouts = state.workouts.map((workout) => {
            if (workout.id === state.currentWorkoutId) {
              const updatedExercises = workout.exercises.filter((exercise) => exercise.name !== action.payload);
              return {
                ...workout,
                exercises: updatedExercises,
              };
            }
            return workout;
        });
        state.workouts = updatedWorkouts
    },
  },
});

export const { setCurrentWorkoutId, removeExerciseFromWorkout, useWorkoutplan, updateWorkouts, setCurrentExercise } = workoutsSlice.actions

export const selectworkouts = (state) => state.workouts.workouts;
export const selectCurrentWorkout = (state) => state.workouts.currentWorkoutId;
export const selectCurrentExercise = (state) => state.workouts.currentExercise;
export const selectCurrentMarkedDate = (state) => state.workouts.currentMarkedDate;

export default workoutsSlice.reducer;