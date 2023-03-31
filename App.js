import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import store from './store';
// Screens
import HomeScreen from './screens/HomeScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';
import WorkoutplansScreen from './screens/WorkoutplansScreen';
import ExercisesScreen from './screens/ExercisesScreen';

export default function App() {
  
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator 
        screenOptions={{ 
          headerShown: false, 
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#e91e63',
          tabBarStyle: {
            backgroundColor: '#f5f5f5',
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            height: 90,
            borderRadius: 15,
          },
          tabBarLabelStyle: {
            fontSize: 12
          }
        }}
      >
        <Tab.Screen 
          name="HomeScreen" 
          children={()=>{
            return(
              <HomeScreen />
            )
          }}
        />
        {/* <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={ faHouse } color={color} size={size} />
            ),
          }} 
        /> */}
        {/* <Tab.Screen 
          name="Workouts" 
          children={()=>{
            return(
              <WorkoutsScreen workouts={workouts} />
            )
          }}
          options={{
            tabBarLabel: 'Workouts',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={ faDumbbell } color={color} size={size} />
            ),
          }} 
        /> */}
        <Tab.Screen 
          name="WorkoutsScreen" 
          children={()=>{
            return(
              <WorkoutsScreen />
            )
          }}
        />
        <Tab.Screen 
          name="WorkoutPlans" 
          children={()=>{
            return(
              <WorkoutplansScreen />
            )
          }}
        />
        <Tab.Screen 
        name="Exercises" 
        children={()=>{
          return(
            <ExercisesScreen />
          )
        }}
        />
        {/* <Tab.Screen 
        name="DoingWorkout" 
        options={{
          tabBarButton: () => null,
        }}
        children={()=>{
          return(
            <>
            <DoingWorkout exercises={exercises} selectedWorkout={selectedWorkout} />
            </>
          )
        }}
        /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


