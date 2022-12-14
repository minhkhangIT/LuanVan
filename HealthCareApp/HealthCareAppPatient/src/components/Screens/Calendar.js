import { View, Text, TouchableOpacity, ScrollView, TextInput, ImageBackground, ActivityIndicator, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderApp from '../Header/HeaderApp'
import { useFocusEffect } from '@react-navigation/native';
import { getScheduleByPhonePatient, getScheduleByPhonePatientAndDate, handleDeleteBooking } from '../../services/userService'
import { useNavigation } from '@react-navigation/native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';


LocaleConfig.locales['fr'] = {
    monthNames: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ],
    monthNamesShort: ['Tháng 1.', 'Tháng 2.', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật '],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: "Hôm nay"
};
LocaleConfig.defaultLocale = 'fr';

export default function Calendar() {
    const routeName = useRoute();
    const navigation = useNavigation();
    const [items, setItems] = useState({});
    const [selectedTime, setSelectedTime] = useState(moment().format('YYYY-MM-DD').toString())
    const [isLoading, setIsLoading] = useState(false)
    const timeToString = (time) => {
        const date = new Date(+time);
        const getYear = date.getFullYear()
        const getMonth = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)
        const getDay = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
        return getYear + "-" + getMonth + "-" + getDay;
    };

    useFocusEffect(
        useCallback(() => {
            setSelectedTime(moment().format('YYYY-MM-DD').toString())
            loadItems()
        }, [routeName])
    )

    const getSchedule = async (phone) => {
        try {
            let res = await getScheduleByPhonePatient(phone)
            if (res && res.errCode === 0) {
                return res.data
            }
            return []
        } catch (error) {
            return []
        }
    }

    const handleEditAppointment = (detailAppointment) => {
        navigation.navigate('DetailDoctor', { doctorId: detailAppointment.doctorId, detailAppointment: detailAppointment })
    }

    const handleDeleteAppointment = async (id) => {
        let res = await handleDeleteBooking(id)
        if (res && res.errCode === 0) {
            Alert.alert(
                "Ok !",
                "Hủy lịch hẹn thành công !"
            )
            navigation.navigate('Schedule')
        } else {
            Alert.alert(
                "Lỗi !",
                "hủy lịch hẹn không thành công !"
            )
        }
    }

    const loadItems = async () => {
        setIsLoading(true)
        const value = await AsyncStorage.getItem('@Login')
        if (value !== null) {
            let schedule = await getSchedule(value.replace('+84', '0'))
            if (schedule.length > 0) {
                schedule.forEach(async element => {
                    const strTime = timeToString(element.date)
                    if (!items[strTime]) {
                        items[strTime] = [];
                        let numItems = await getScheduleByPhonePatientAndDate(value.replace('+84', '0'), element.date)
                        if (numItems.errCode === 0) {
                            numItems.data.forEach(element => {
                                items[strTime].push({
                                    name: '[' + element.timeTypeDataBooking.valueVi + ']: ' + 'Khám bệnh tại phòng khám ' + element.DoctorDataBooking.DoctorInfor.nameClinic,
                                    id: element.id,
                                    checkTime: element.checkTime,
                                    doctorId: element.doctorId
                                });
                                const newItems = {};
                                Object.keys(items).forEach((key) => {
                                    newItems[key] = items[key];
                                });
                                setItems(newItems);
                            });
                        }
                    }
                });
            }
            setIsLoading(false)
        } else {
            navigation.navigate('Login', { goBack: Math.floor(Math.random() * 100) + 1, parent: 'Schedule' })
        }
    };

    const handleDetailSchedule = (dataSchedule) => {
        if (dataSchedule.checkTime === null) {
            Alert.alert(
                "Thông báo !",
                "Bác sĩ đã thay đổi kế hoạch khám bệnh, vui lòng chọn lại khoản thời gian thích hợp !",
                [
                    { text: "Hủy lịch hẹn", onPress: () => handleDeleteAppointment(dataSchedule.id) },
                    {
                        text: "Cập nhật",
                        onPress: () => handleEditAppointment(dataSchedule)
                    }
                ]
            );
        } else {
            navigation.navigate('DetailSchedule', { appointment: dataSchedule.id })
        }
    }

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={{ marginTop: 35, marginHorizontal: 20 }} onPress={() => handleDetailSchedule(item)} >
                <View>
                    <Card >
                        <View>
                            <Text style={{ textAlign: "center", padding: 10 }}>{item.name}</Text>
                        </View>
                    </Card>
                </View>
            </TouchableOpacity>
        );
    };

    const renderEmptyData = () => {
        return (
            <TouchableOpacity style={{ margin: 10 }}>
                <Card style={{ padding: 10 }}>
                    <View>
                        <Text style={{ textAlign: "center" }}>Không có lịch hẹn !</Text>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }


    return (
        <>
            <HeaderApp goBack={true} />
            {isLoading === true ?
                <ActivityIndicator style={{ flex: 1 }} />
                :
                <View style={{ flex: 1 }}>
                    <Agenda
                        items={items}
                        selected={selectedTime}
                        renderItem={renderItem}
                        renderEmptyData={renderEmptyData}

                    />
                </View>
            }
        </>
    );
};
