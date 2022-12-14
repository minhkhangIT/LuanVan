import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Screens/Home';
import Clinic from '../Screens/Clinic';
import Doctor from '../Screens/Doctor';
import HandBook from '../Screens/HandBook';
import Specialty from '../Screens/Specialty';
import Booking from '../Screens/Booking';
import Schedule from '../Screens/Schedule';
import History from '../Screens/History';
import DetailHistory from '../Screens/DetailHistory';
import Otp from '../Otp'
import DetailSchedule from '../Screens/DetailSchedule';
import Calendar from '../Screens/Calendar'

import DetailDoctor from '../Screens/Detail/Doctor/DetailDoctor';
import DetailSpecialty from '../Screens/Detail/Specialty/DetailSpecialty'
import DetailClinic from '../Screens/Detail/Clinic/DetailClinic'
import DetailHandBook from '../Screens/Detail/HandBook/detailHandBook'


import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontisto from 'react-native-vector-icons/Fontisto';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const home = (color) => <IconEntypo name="home" size={23} color={color} />;
const specialty = (color) => <IconFontAwesome5 name="briefcase-medical" size={23} color={color} />;
const clinic = (color) => <IconFontAwesome name="hospital-o" size={23} color={color} />;
const doctor = (color) => <IconFontisto name="doctor" size={23} color={color} />;
const handbook = (color) => <IconFontAwesome5 name="hand-holding-medical" size={23} color={color} />;
const schedule = (color) => <IconFontAwesome5 name="clipboard-list" size={23} color={color} />;
const history = (color) => <IconFontAwesome5 name="history" size={23} color={color} />;

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,

            }}
        >
            <Stack.Screen
                name="Home" component={Home}
            />
            <Stack.Screen
                name="DetailDoctor" component={DetailDoctor}
            />
            <Stack.Screen
                name="DetailSpecialty" component={DetailSpecialty}
            />
            <Stack.Screen
                name="DetailClinic" component={DetailClinic}
            />
            <Stack.Screen
                name="DetailHandBook" component={DetailHandBook}
            />
            <Stack.Screen
                name="Booking" component={Booking}
            />
            <Stack.Screen
                name="Login" component={Otp}
            />
        </Stack.Navigator>
    )
}


const ListSchedule = () => {
    return (
        <Stack.Navigator
            initialRouteName='Schedule'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Schedule" component={Schedule}
            />
            <Stack.Screen
                name="Login" component={Otp}
            />
            <Stack.Screen
                name="Calendar" component={Calendar}
            />
            <Stack.Screen
                name="DetailSchedule" component={DetailSchedule}
            />
        </Stack.Navigator>
    )
}


const ListHistory = () => {
    return (
        <Stack.Navigator
            initialRouteName='History'
            screenOptions={{
                headerShown: false,

            }}
        >
            <Stack.Screen
                name="History" component={History}
            />
            <Stack.Screen
                name="Login" component={Otp}
            />
            <Stack.Screen
                name="Calendar" component={Calendar}
            />
            <Stack.Screen
                name="DetailHistory" component={DetailHistory}
            />
        </Stack.Navigator>
    )
}


function MyTabs() {
    return (
        <>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: "#49bce2",
                        tabBarInactiveTintColor: "#B5B5B5",
                        headerShown: false,

                    }}
                >
                    <Tab.Screen
                        name="HomePage" component={HomeStack}
                        options={{
                            tabBarIcon: ({ color }) => home(color),
                            tabBarLabel: 'Home'
                        }}
                    />
                    <Tab.Screen
                        name="Specialty" component={Specialty}
                        options={{
                            tabBarIcon: ({ color }) => specialty(color),
                            tabBarLabel: 'Chuyên khoa'
                        }}
                    />
                    <Tab.Screen
                        name="Clinic" component={Clinic}
                        options={{
                            tabBarIcon: ({ color }) => clinic(color),
                            tabBarLabel: 'Cơ sở y tế'
                        }}
                    />
                    <Tab.Screen
                        name="Doctor" component={Doctor}
                        options={{
                            tabBarIcon: ({ color }) => doctor(color),
                            tabBarLabel: 'Bác sĩ'
                        }}
                    />

                    <Tab.Screen
                        name="HandBook" component={HandBook}
                        options={{
                            tabBarIcon: ({ color }) => handbook(color),
                            tabBarLabel: 'Cẩm nang'
                        }}
                    />
                    <Tab.Screen
                        name="SchedulePage" component={ListSchedule}
                        options={{
                            tabBarIcon: ({ color }) => schedule(color),
                            tabBarLabel: 'Lịch hẹn'
                        }}
                    />

                    <Tab.Screen
                        name="MedicalHistory" component={ListHistory}
                        options={{
                            tabBarIcon: ({ color }) => history(color),
                            tabBarLabel: 'Lịch sử'
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
}






export {
    MyTabs
}