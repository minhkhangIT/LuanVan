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
            Toast("H???y l???ch h???n th??nh c??ng!")
            getAppointment(user)
        } else {
            Toast("H???y l???ch h???n th???t b???i!")
        }
    }

    const handleEditAppointment = (detailAppointment) => {
        navigation.navigate('DetailDoctor', { doctorId: detailAppointment.doctorId, detailAppointment: detailAppointment })
    }

    const handleDetailSchedule = (dataSchedule) => {
        if (dataSchedule.checkTime === null) {
            Alert.alert(
                "Th??ng b??o !",
                "B??c s?? ???? thay ?????i k??? ho???ch kh??m b???nh, vui l??ng ch???n l???i kho???n th???i gian th??ch h???p !",
                [
                    { text: "H???y l???ch h???n", onPress: () => handleDeleteAppointment(dataSchedule.id) },
                    {
                        text: "C???p nh???t",
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
                                                <Text style={styles.specialty}>B???nh vi???n:  {item.DoctorDataBooking.DoctorInfor ? item.DoctorDataBooking.DoctorInfor.nameClinic : ''}</Text>
                                                <Text style={styles.specialty}>Chuy??n khoa:  {item.DoctorDataBooking.DoctorInfor ? item.DoctorDataBooking.DoctorInfor.dataSpecialty.nameVi : ''}</Text>
                                                <Text style={[styles.price, styles.firstChild]}>B???nh nh??n: {item.fullNamePatient}</Text>
                                                <Text style={styles.price}>L?? do kh??m: {item.reason}</Text>
                                                <Text style={styles.price}>Gi?? kh??m:
                                                    <Text style={{ color: 'red' }}>
                                                        <NumberFormat
                                                            value={item.DoctorDataBooking.DoctorInfor ? item.DoctorDataBooking.DoctorInfor.priceTypeData.valueVi : ''}
                                                            displayType="text"
                                                            thousandSeparator
                                                            renderText={(value) => <Text>{value}</Text>}
                                                        >
                                                        </NumberFormat>
                                                        ??
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
                                        Ch??a c?? l???ch h???n !
                                    </Text>
                                </ImageBackground>
                            </View>
                        }
                    </ScrollView>
                </View>

            </>
    )
}



