import { Text, View, ScrollView, TouchableOpacity, RefreshControl, ToastAndroid, ActivityIndicator, ImageBackground, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react'
import styles from './ScheduleStyle'
import HeaderApp from '../Header/HeaderApp'
import Icon from 'react-native-vector-icons/Ionicons';
import { getScheduleByPhonePatient, handleDeleteBooking } from '../../services/userService'
import NumberFormat from 'react-number-format';
import background from '../../../assets/appointment.jpg'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
const detailErrIcon = <Icon name="information-circle-sharp" size={22} color='#FF0000' style={styles.icon} />;
export default function Schedule() {
    const routeName = useRoute();
    const navigation = useNavigation();
    const [user, setUser] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [appointment, setAppointment] = useState([])

    const Toast = ({ visible, message }) => {
        if (visible) {
            ToastAndroid.showWithGravityAndOffset(
                message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return null;
        }
        return null;
    };

    useEffect(() => {
        navigation.addListener('focus', () => {
            loadData()
        });
    }, [routeName]);


    useEffect(() => {
        loadData()
    }, []);

    const getAppointment = async (phone) => {
        setIsLoading(true)
        try {
            let res = await getScheduleByPhonePatient(phone)
            if (res && res.errCode === 0) {
                if (res.data !== appointment) {
                    setAppointment(res.data)
                }
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
      
    }

    const loadData = async () => {
        try {
            const value = await AsyncStorage.getItem('@Login')
            if (value !== null) {
                if (user !== value.replace('+84', '0')) {
                    setUser(value.replace('+84', '0'))
                }
                getAppointment(value.replace('+84', '0'))
            } else {
                if (routeName.params && routeName.params.doctorId) {
                    navigation.navigate('Login', { goBack: Math.floor(Math.random() * 100) + 1, parent: 'Schedule', doctorId: routeName.params.doctorId })
                } else {
                    navigation.navigate('Login', { goBack: Math.floor(Math.random() * 100) + 1, parent: 'Schedule' })
                }
            }
        } catch (e) {
            navigation.navigate('Login', { goBack: Math.floor(Math.random() * 100) + 1, parent: 'Schedule' })
        }
    }
    const onRefresh = () => {
        getAppointment(user)
    }


    const handleDeleteAppointment = async (id) => {
        let res = await handleDeleteBooking(id)
        if (res && res.errCode === 0) {
            Toast("Hủy lịch hẹn thành công!")
            getAppointment(user)
        } else {
            Toast("Hủy lịch hẹn thất bại!")
        }
    }

    const handleEditAppointment = (detailAppointment) => {
        navigation.navigate('DetailDoctor', { doctorId: detailAppointment.doctorId, detailAppointment: detailAppointment })
    }

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

    return (
        isLoading === true ?
            <View style={{ backgroundColor: '#fff', flex: 12, }}>
                <ActivityIndicator style={styles.container} />
            </View>
            :
            <>
                <HeaderApp logOut={true} />
                <View style={[styles.container]} >

                    <ScrollView style={styles.listSChedule} showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {appointment && appointment.length > 0 ?
                            appointment.map((item, index) => {
                                var timesTemp = new Date(+item.date)
                                return (
                                    <TouchableOpacity style={styles.schedule}
                                        onPress={() => handleDetailSchedule(item)} key={item.id}
                                    >
                                        <View style={styles.left}>
                                            <View style={styles.dateBox}>
                                                <Text style={styles.date}>
                                                    {timesTemp.getDate()}
                                                </Text>
                                                <Text style={styles.month}>
                                                    {timesTemp.getMonth() + 1}/{timesTemp.getFullYear()}
                                                </Text>
                                            </View>
                                            <Text style={styles.time}>
                                                {item.timeTypeDataBooking ? item.timeTypeDataBooking.valueVi : ''}
                                            </Text>
                                        </View>
                                        <View style={styles.right}>
                                            <View>
                                                <Text style={styles.nameDoctor}>{item.DoctorDataBooking ? item.DoctorDataBooking.positionData.valueVi : ''}  || {item.DoctorDataBooking ? item.DoctorDataBooking.lastName : ''} {item.DoctorDataBooking ? item.DoctorDataBooking.firstName : ''}</Text>
                                                <Text style={styles.specialty}>Bệnh viện:  {item.DoctorDataBooking.DoctorInfor ? item.DoctorDataBooking.DoctorInfor.nameClinic : ''}</Text>
                                                <Text style={styles.specialty}>Chuyên khoa:  {item.DoctorDataBooking.DoctorInfor ? item.DoctorDataBooking.DoctorInfor.dataSpecialty.nameVi : ''}</Text>
                                                <Text style={[styles.price, styles.firstChild]}>Bệnh nhân: {item.fullNamePatient}</Text>
                                                <Text style={styles.price}>Lý do khám: {item.reason}</Text>
                                                <Text style={styles.price}>Giá khám:
                                                    <Text style={{ color: 'red' }}>
                                                        <NumberFormat
                                                            value={item.DoctorDataBooking.DoctorInfor ? item.DoctorDataBooking.DoctorInfor.priceTypeData.valueVi : ''}
                                                            displayType="text"
                                                            thousandSeparator
                                                            renderText={(value) => <Text>{value}</Text>}
                                                        >
                                                        </NumberFormat>
                                                        đ
                                                    </Text>
                                                </Text>
                                            </View>
                                            {
                                                !item.checkTime && <View style={styles.iconDetail}><Text>{detailErrIcon}</Text></View>
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                            :
                            <View >
                                <ImageBackground source={background} resizeMode="contain" style={styles.appointmentNull} >
                                    <Text style={styles.text}>
                                        Chưa có lịch hẹn !
                                    </Text>
                                </ImageBackground>
                            </View>
                        }
                    </ScrollView>
                </View>

            </>
    )
}



