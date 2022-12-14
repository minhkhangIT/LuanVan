import { Text, TouchableOpacity, ScrollView, View, ImageBackground, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { isLogin, infoUser } from '../../redux/selectors'
import SwitchSelector from "react-native-switch-selector";
// import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderApp from '../Header/HeaderApp'
import ListSchedule from './ListSchedule';
import AddSchedule from './AddSchedule';
import styles from './ScheduleStyle'

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const scheduleIcon = <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Icon name="md-calendar-sharp" size={13} color="#FFF" />
    <Text style={{ fontSize: 11, color: '#FFF' }}>KẾ HOẠCH</Text>
</View>

const addScheduleIcon = <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <FontAwesome name="calendar-plus-o" size={13} color="#FFF" />
    <Text style={{ fontSize: 11, color: '#FFF' }}>THÊM / CẬP NHẬT</Text>
</View>


export default function Schedule() {
    const [isLoading, setIsLoading] = useState(false)
    const [screen, setScreen] = useState(0)
    const options = [
        { label: scheduleIcon, value: 0, activeColor: 'red' },
        { label: addScheduleIcon, value: 1, activeColor: 'red' }
    ];
    return (
        <>
            <HeaderApp logOut={true} />
            <View style={[styles.container]} >
                {isLoading ?
                    <View style={{ backgroundColor: '#fff', flex: 12, }}>
                        <ActivityIndicator style={styles.container} />
                    </View>
                    :
                    <>
                        <View style={styles.toggleBtnBox}>
                            <SwitchSelector
                                backgroundColor='#375e97'
                                style={{ width: 300 }}
                                options={options}
                                initial={screen}
                                onPress={(value) => setScreen(value)
                                }
                            />
                        </View>
                        {screen === 0 ?
                            <ListSchedule />
                            :
                            <AddSchedule />
                        }
                    </>
                }
            </View>
        </>
    )
}
