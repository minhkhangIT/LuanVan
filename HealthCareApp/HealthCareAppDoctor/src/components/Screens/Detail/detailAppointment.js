import { Text, TouchableOpacity, ScrollView, View, ImageBackground, RefreshControl, ToastAndroid, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import HeaderApp from '../../Header/HeaderApp'
import { handleDeleteBooking } from '../../../services/userService'
import styles from './detailAppointmentStyle'
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import avatar from '../../../../assets/images.png'
import Appointment from '../Appointment';

const uploadIcon = <AntDesign name="upload" size={14} color="#fff" />;
const doctorIcon = <Fontisto name="doctor" size={20} color="#FF3366" />;
const locationIcon = <Entypo name="location" size={20} color="#FF3366" />;
const locationClinicIcon = <MaterialIcons name="add-location" size={20} color="#FF3366" />;
const calendarIcon = <Feather name="calendar" size={20} color="#FF3366" />;
const questionIcon = <Fontisto name="question" size={20} color="#FF3366" />;
const deleteIcon = <AntDesign name="delete" size={20} color="#fff" />;
export default function DetailAppointment() {
    const route = useRoute();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(new Date());
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [dateSelected, setDateSelected] = useState(null);
    const [detailAppointment, setDetailAppointment] = useState({})

    const Toast = (message) => {
        ToastAndroid.show(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
        );
    };

    useEffect(() => {
        setDetailAppointment(route.params.detailAppointment)
    }, [route.params.detailAppointment])

    const handleDeleteAppointment = (id) => {
        Alert.alert(
            "Thông báo !",
            "Xác nhận hủy lịch hẹn!",
            [
                { text: "Hủy" },
                {
                    text: "Xác nhận",
                    onPress: () => deleteAppointment(id)
                }
            ]
        );
    }
    const deleteAppointment = async (id) => {
        let res = await handleDeleteBooking(id)
        if (res && res.errCode === 0) {
            Toast("Hủy lịch hẹn thành công !")
            navigation.navigate("Appointment", { doctorId: detailAppointment.doctorId })
        } else {
            Toast("Hủy lịch hẹn không thành công !")
        }
    }
    var dateBooking
    if (detailAppointment.date) {
        var timesTemp = new Date(+detailAppointment.date)
        dateBooking = timesTemp.getDate() + '/' + (timesTemp.getMonth() + 1) + '/' + timesTemp.getFullYear()
    }
    return (
        <>
            <HeaderApp logOut={true} goBack={true} />
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={["#53A6D8", "#96D7C6", "#BAC94A"]}
                    style={{ height: '100%' }}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.title}>Chi tiết đặt lịch</Text>
                    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                        <View style={styles.infoBox} >
                            <View style={{ flexDirection: 'row', width: '40%', borderRightWidth: 2, borderRightColor: '#00BFFF', alignItems: 'center' }}>
                                <ImageBackground source={avatar} resizeMode="cover" style={{ width: 50, height: 50 }} imageStyle={{ borderRadius: 50 }} />
                                <View style={{ paddingVertical: 10 }}>
                                    <Text style={{ flex: 1, textTransform: 'uppercase', paddingHorizontal: 5, color: 'red', width: 100 }}>{detailAppointment.fullNamePatient}</Text>
                                    <Text style={{ flex: 1, paddingHorizontal: 5, fontSize: 11 }}> {detailAppointment.birthdayPatient}</Text>
                                    <Text style={{ flex: 1, paddingHorizontal: 5, fontSize: 11 }}>{detailAppointment.phoneNumberPatient}</Text>
                                </View>

                            </View>
                            <View style={{ width: '60%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    style={{ flex: 6, backgroundColor: 'red', borderRadius: 20, padding: 6, flexDirection: 'row', alignItems: 'center', marginRight: 5 }}
                                    onPress={() => handleDeleteAppointment(detailAppointment.id)}>
                                    {deleteIcon}
                                    <Text style={{ flex: 1, textAlign: 'center', color: '#fff' }}>Hủy lịch hẹn</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ flex: 6, backgroundColor: '#00BFFF', borderRadius: 20, padding: 6, flexDirection: 'row', alignItems: 'center' }}
                                    onPress={() => navigation.navigate("Prescription", { detailAppointment: detailAppointment })}>
                                    {uploadIcon}
                                    <Text style={{ flex: 1, textAlign: 'center', color: '#fff' }}>Nhập kết quả</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.infoBoxLeft}>
                                {locationIcon}
                                <Text style={{ fontSize: 16, color: '#333', paddingHorizontal: 6 }}>Địa chỉ</Text>
                            </View>
                            <View style={styles.infoBoxRight}>
                                <Text style={{ fontSize: 16, color: '#555' }}>
                                    {detailAppointment.addressPatient}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoBox}>
                            <View style={styles.infoBoxLeft}>
                                {questionIcon}
                                <Text style={{ fontSize: 16, color: '#333', paddingHorizontal: 6 }}>Lý do khám</Text>
                            </View>
                            <View style={styles.infoBoxRight}>
                                <Text style={{ fontSize: 16, color: '#555' }}>
                                    {detailAppointment.reason}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.infoBoxLeft}>
                                {calendarIcon}
                                <Text style={{ fontSize: 16, color: '#333', paddingHorizontal: 6 }}>Ngày khám</Text>
                            </View>
                            <View style={styles.infoBoxRight}>
                                <Text style={{ fontSize: 16, color: '#555' }}>
                                    {detailAppointment.timeTypeDataBooking ? detailAppointment.timeTypeDataBooking.valueVi : ''} ( {dateBooking ? dateBooking : ''} )
                                </Text>

                            </View>
                        </View>

                        <View style={styles.infoBox}>
                            <View style={styles.infoBoxLeft}>
                                {doctorIcon}
                                <Text style={{ fontSize: 16, color: '#333', paddingHorizontal: 6 }}>Bác sĩ khám</Text>
                            </View>
                            <View style={styles.infoBoxRight}>
                                <Text style={{ fontSize: 16, color: '#555' }}>
                                    {detailAppointment.DoctorDataBooking ? detailAppointment.DoctorDataBooking.lastName : ''}{' '}{detailAppointment.DoctorDataBooking ? detailAppointment.DoctorDataBooking.firstName : ''}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoBox}>
                            <View style={styles.infoBoxLeft}>
                                {locationClinicIcon}
                                <Text style={{ fontSize: 16, color: '#333', paddingHorizontal: 6 }}>Địa chỉ khám</Text>
                            </View>
                            <View style={styles.infoBoxRight}>
                                <Text style={{ fontSize: 16, color: '#555' }}>
                                    {(detailAppointment.DoctorDataBooking && detailAppointment.DoctorDataBooking.DoctorInfor) ? detailAppointment.DoctorDataBooking.DoctorInfor.nameClinic : ''} ({detailAppointment.DoctorDataBooking && detailAppointment.DoctorDataBooking.DoctorInfor ? detailAppointment.DoctorDataBooking.DoctorInfor.addressClinic : ''})
                                </Text>
                            </View>
                        </View>

                    </ScrollView>
                </LinearGradient>
            </View>
        </>
    )
}
