import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Login/Login';
import Appointment from '../Screens/Appointment';
import DetailAppointment from '../Screens/Detail/detailAppointment';
import Prescription from '../Screens/Detail/Prescription';
import Schedule from '../Screens/Schedule'
import ListPatient from '../Screens/ListPatient';
import DetailPatient from '../Screens/Detail/detailPatient';

import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const appointment = (color) => <IconFontAwesome5 name="clipboard-list" size={23} color={color} />;
const calendarEdit = (color) => <MaterialCommunityIcons name="calendar-edit" size={23} color={color} />;
const persons = (color) => <Fontisto name="persons" size={23} color={color} />;

function ListAppointment() {
    return (
        <>
            <Stack.Navigator
                initialRouteName='Appointment'
                screenOptions={{
                    tabBarActiveTintColor: "#49bce2",
                    tabBarInactiveTintColor: "#B5B5B5",
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="Appointment" component={Appointment}
                />
                <Stack.Screen
                    name="DetailAppointment" component={DetailAppointment}
                />
                <Stack.Screen
                    name="Prescription" component={Prescription}
                />
            </Stack.Navigator>
        </>
    );
}

function Patient() {
    return (
        <>
            <Stack.Navigator
                initialRouteName='ListPatient'
                screenOptions={{
                    tabBarActiveTintColor: "#49bce2",
                    tabBarInactiveTintColor: "#B5B5B5",
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="ListPatient" component={ListPatient}
                />
                <Stack.Screen
                    name="DetailPatient" component={DetailPatient}
                />

            </Stack.Navigator>
        </>
    );
}


function HomeTabs() {
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#49bce2",
                    tabBarInactiveTintColor: "#B5B5B5",
                    headerShown: false
                }}
            >
                <Tab.Screen
                    name="ListAppointment" component={ListAppointment}
                    options={{
                        tabBarIcon: ({ color }) => appointment(color),
                        tabBarLabel: 'Lịch hẹn'
                    }}
                />
                <Tab.Screen
                    name="Schedule" component={Schedule}
                    options={{
                        tabBarIcon: ({ color }) => calendarEdit(color),
                        tabBarLabel: 'Kế hoạch'
                    }}
                />
                <Tab.Screen
                    name="Patient" component={Patient}
                    options={{
                        tabBarIcon: ({ color }) => persons(color),
                        tabBarLabel: 'Bệnh nhân'
                    }}
                />

            </Tab.Navigator>
        </>
    );
}


function MyTabs() {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: "#49bce2",
                        tabBarInactiveTintColor: "#B5B5B5",
                        headerShown: false
                    }}
                >
                    {/* <Stack.Screen
                        name="Login" component={Login}
                    /> */}
                    <Stack.Screen
                        name="HomeTabs" component={HomeTabs}
                    />
                    <Stack.Screen
                        name="Login" component={Login}
                    />
                </Stack.Navigator>

            </NavigationContainer>
        </>
    );
}

export {
    MyTabs
}