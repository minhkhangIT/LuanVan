import { Text, TouchableOpacity, ScrollView, View, ImageBackground, ToastAndroid, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { isLogin, infoUser } from '../../redux/selectors'
import { getAllCodeService, getScheduleByDateService, saveScheduleDoctorService } from '../../services/userService'
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient'
import styles from './AddScheduleStyle'

import Icon from 'react-native-vector-icons/Ionicons';

const calendarIcon = <Icon name="md-calendar-sharp" size={26} color="#49bce2" />
const clearIcon = <Icon name="close" size={20} color="#000000" />;


export default function Schedule() {
    const login = useSelector(isLogin)
    const user = useSelector(infoUser)
    const route = useRoute();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(new Date());
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [dateSelected, setDateSelected] = useState(null);
    const [rangeTime, setRangeTime] = useState([])
    const [oldRangeTime,setOldrangeTine] = useState(false)
    const Toast = (message) => {
        ToastAndroid.show(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
        );
    };

    const getAllScheduleTime = async (doctorId, currentDate) => {
        setOldrangeTine(false)
        let date = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let dateSelected = date + '/' + month + '/' + year
        const date2 = new Date(+year, month - 1, +date)
        let scheduleDoctor = await getScheduleByDateService(doctorId, date2.getTime());
        let allScheduleTime = await getAllCodeService('TIME');
        let data = []
        if (allScheduleTime.data && allScheduleTime.data.length > 0) {
            data = allScheduleTime.data
            data = data.map(item => ({
                ...item, isSelected: false
            }))
        }
        if (data && data.length > 0 && scheduleDoctor && scheduleDoctor.errCode === 0 && scheduleDoctor.data.length > 0) {
            data = data.map(item => {
                scheduleDoctor.data.forEach(schedule => {
                    if (item.id === schedule.timeType) {
                        item.isSelected = true;
                        setOldrangeTine(true)
                    }
                })
                return item
            })
        }
        setDateSelected(dateSelected)
        setRangeTime(data)

    }

    useEffect(() => {
        getAllScheduleTime(user.id, date)
    }, [])



    const onChangeFunc = (event) => {
        setShowDateTimePicker(false)
        if (event.type !== 'dismissed') {
            let timeTemp = new Date(event.nativeEvent.timestamp);
            getAllScheduleTime(user.id, timeTemp)
            setDateSelected(dateSelected)
            setDate(timeTemp)
        }
    }

    const onRefresh = () => {
        getAllScheduleTime(user.id, date)
    }

    const handleSaveSchedule = async () => {
        if (dateSelected) {
            let result = [];
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            const date2 = (new Date(+year, month - 1, +day)).getTime()
            if (rangeTime && rangeTime.length > 0) {
                let selectedTime = rangeTime.filter(item => item.isSelected === true);
                if (selectedTime && selectedTime.length > 0) {
                    setOldrangeTine(true)
                    selectedTime.map(time => {
                        let object = {};
                        object.doctorId = user.id;
                        object.date = date2;
                        object.timeType = time.id;
                        result.push(object);
                        return result;
                    })
                } else {
                    if(oldRangeTime == false){
                        Toast("Vui lòng chọn mốc thời gian !");
                        return
                    }
                }
            }
            try {
                let res = await saveScheduleDoctorService({
                    arrSchedule: result,
                    doctorId: user.id,
                    date: date2
                })
                if (res.errCode === 0) {
                    Toast("Lưu kế hoạch thành công !");
                } else {
                    Toast("Lưu kế hoạch thất bại !");
                }
            } catch (error) {
            }
        } else {
            Toast("Vui lòng chọn ngày !");
        }
    }

    const handleClickButtonTime = (time) => {
        if (rangeTime && rangeTime.length > 0) {
            let data = rangeTime
            data = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            setRangeTime(data)
        }
    }

    return (

        <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={{ height: 80, justifyContent: 'center', alignItems: 'center' }}>
                {showDateTimePicker === true &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        display="default"
                        onChange={onChangeFunc}
                    />
                }
                <Text style={{ marginBottom: 6, color: '#635BA2' }}>Chọn ngày :</Text>
                <View style={styles.calendarBox}>
                    <TouchableOpacity style={{ width: '10%' }} onPress={() => setShowDateTimePicker(true)}>
                        {calendarIcon}
                    </TouchableOpacity>
                    <Text style={{ width: '80%', textAlign: 'center', fontSize: 16, padding: 3, fontWeight: "400" }}>{dateSelected}</Text>
                    {
                        dateSelected !== null &&
                        <TouchableOpacity style={{ width: '10%', textAlign: 'center' }} onPress={() => setDateSelected(null)}>{clearIcon}</TouchableOpacity>
                    }
                </View>
            </View>

            <View style={{ backgroundColor: '#F8F8FF', marginBottom: 10, borderRadius: 5, padding: 10, marginTop: 10 }}>
                <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ marginBottom: 6, color: '#635BA2' }}>Thời gian:</Text>
                    <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {rangeTime && rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (
                                    item.isSelected ?
                                        <TouchableOpacity
                                            style={styles.timeItemSelected}
                                            key={index}
                                            onPress={() => handleClickButtonTime(item)}
                                        >
                                            <Text style={styles.timeBox}>{item.valueVi}</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            style={styles.timeItem}
                                            key={index}
                                            onPress={() => handleClickButtonTime(item)}
                                        >
                                            <Text style={styles.timeBox}>{item.valueVi}</Text>
                                        </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </View>

            <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
                <TouchableOpacity style={{ width: '60%', alignItems: 'center' }} onPress={() => handleSaveSchedule()}>
                    <LinearGradient
                        style={{ borderRadius: 15, width: '100%' }}
                        colors={["#53A6D8", "#FF6A6A", "#FF6600"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={{ paddingVertical: 12, textAlign: 'center', color: '#fff' }}>LƯU LẠI</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}