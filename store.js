import { configureStore } from '@reduxjs/toolkit';

import WorkoutsReducer from './features/workouts/workoutsSlice';
import exercisesReducer from './features/exercises/exercisesSlice';
import workoutplansReducer from './features/workoutPlans/workoutplansSclice';

export default configureStore({
    reducer: {
      exercises: exercisesReducer,
      workoutplans: workoutplansReducer,
      workouts: WorkoutsReducer,
    }
});