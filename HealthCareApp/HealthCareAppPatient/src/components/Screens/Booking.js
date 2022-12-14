import { Text, TouchableOpacity, ScrollView, View, TextInput, ImageBackground, ToastAndroid, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './BookingStyle'
import HeaderApp from '../Header/HeaderApp'
import { getDetailInforDoctorService, postPatientBookAppointment, updateBooking } from '../../services/userService'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CheckBox from 'react-native-check-box'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import NumberFormat from 'react-number-format';
import img from '../../../assets/doctor-icon-png-708262.jpg'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
export default function Booking() {
    const route = useRoute();
    const navigation = useNavigation();
    const user = <IconFontAwesome5 name="user" size={18} color="#49bce2" />;
    const mobile = <IconFontAwesome5 name="mobile-alt" size={18} color="#49bce2" />;
    const map = <IconFontAwesome5 name="map-marker-alt" size={18} color="#49bce2" />;
    const emailIcon = <Fontisto name="email" size={18} color="#49bce2" />;
    const schedule = <Fontisto name="date" size={18} color="#49bce2" />;
    const transgender = <IconFontAwesome5 name="transgender" size={18} color="#49bce2" />;
    const question = <IconFontAwesome5 name="question" size={18} color="#49bce2" />;
    const edit = <AntDesign name="edit" size={18} color="#49bce2" />;

    const [isLoading, setIsLoading] = useState(true)
    const [waitingBooking, setWaitingBooking] = useState(false)
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('M')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [birthday, setBirthday] = useState('Ngày sinh')
    const [reason, setReason] = useState('')
    const [detailDoctor, setDetailDoctor] = useState([])
    const Toast = (message) => {
        ToastAndroid.show(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
        );
    };

    const getDetailDoctor = async (id) => {
        try {
            setIsLoading(true)
            const response = await getDetailInforDoctorService(id)
            if (response.errCode === 0 && response.data) {
                setDetailDoctor(response.data)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (route.params && route.params.time && route.params.time.doctorId) {
            getDetailDoctor(route.params.time.doctorId)
        }
        if (route.params && route.params.detailAppointment && route.params.detailAppointment.doctorId) {
            getDetailDoctor(route.params.detailAppointment.doctorId)
        }
    }, [route.params]);

    useEffect(() => {
        if (route.params.detailAppointment) {
            let data = route.params.detailAppointment
            setFullName(data.fullNamePatient)
            setEmail(data.emailPatient)
            setGender(data.genderPatient)
            setAddress(data.addressPatient)
            setPhoneNumber(data.phoneNumberPatient)
            setBirthday(data.birthdayPatient)
            setReason(data.reason)
        }
    }, [route.params.detailAppointment]);

    const data = [
        {
            label: 'nam'
        },
        {
            label: 'nữ'
        }
    ];

    const onChangeFunc = (event) => {
        setShowDateTimePicker(false)
        if (event.type !== 'dismissed') {
            let timeTemp = new Date(event.nativeEvent.timestamp);
            let date = timeTemp.getDate();
            let month = timeTemp.getMonth() + 1;
            let year = timeTemp.getFullYear();
            let birthday = date + '/' + month + '/' + year
            setBirthday(birthday)
            setDate(timeTemp)
        }
    }

    const checkErr = (fullName, phoneNumber, email, birthday, address) => {
        let state = [fullName, phoneNumber, email, birthday, address]
        let alertErr = ['Vui lòng nhập họ tên !', 'Vui lòng nhập số điện thoại !', 'Vui lòng nhập Email !', 'Vui lòng nhập ngày sinh !', 'Vui lòng nhập địa chỉ liên hệ !']
        for (let i = 0; i < state.length; i++) {
            if (state[i] === '') {
                Alert.alert(
                    "Lỗi !",
                    alertErr[i],
                );
                return true
            }
        }

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (birthday === '' || birthday === 'Ngày sinh') {
            Alert.alert(
                "Lỗi !",
                "Vui lòng nhập ngày sinh !",
            );
            return true
        }
        if (reg.test(email) === false) {
            Alert.alert(
                "Lỗi !",
                "Email không hợp lệ !",
            );
            return true
        }
        if (!phoneValidation(phoneNumber)) {
            Alert.alert(
                "Lỗi !",
                "Số điện thoại không hợp lệ !",
            );
            return true
        }

        return false
    }

    const handleBooking = async () => {
        if (checkErr(fullName, phoneNumber, email, birthday, address) === false) {
            setWaitingBooking(true)
            let res = await postPatientBookAppointment({
                type: 'APP',
                patientAccountPhone: route.params.patientAccountPhone,
                fullName: fullName,
                phoneNumber: phoneNumber,
                email: email,
                address: address,
                reason: reason,
                date: route.params.time.date,
                birthday: birthday,
                gender: gender,
                doctorId: route.params.time.doctorId,
                timeType: route.params.time.timeType,
                price: detailDoctor.DoctorInfor && detailDoctor.DoctorInfor.priceTypeData ? detailDoctor.DoctorInfor.priceTypeData.valueVi : ''
            })
            setWaitingBooking(false)
            if (res && res.errCode === 0) {
                Toast("Đặt lịch thành công !")
                navigation.goBack()
            } else {
                Toast("Đặt lịch thất bại !")
            }
        }
    }
    const handleUpdateBooking = async () => {
        if (checkErr(fullName, phoneNumber, email, birthday, address) === false) {
            setWaitingBooking(true)
            let res = await updateBooking({
                patientId: route.params.detailAppointment.patientId,
                bookingID: route.params.detailAppointment.id,
                type: 'APP',
                fullName: fullName,
                phoneNumber: phoneNumber,
                email: email,
                address: address,
                reason: reason,
                date: route.params.time ? route.params.time.date : route.params.detailAppointment.date,
                birthday: birthday,
                gender: gender,
                doctorId: route.params.time ? route.params.time.doctorId : route.params.detailAppointment.doctorId,
                timeType: route.params.time ? route.params.time.timeType : route.params.detailAppointment.timeType,
            })
            setWaitingBooking(false)
            if (res && res.errCode === 0) {
                Toast("Cập nhật lịch hẹn thành công !")
                navigation.navigate('DetailSchedule', { appointment: route.params.detailAppointment.id })
            } else {
                Toast("Cập nhật lịch hẹn thất bại !")
            }
        }
    }

    const handleEditTimeBooking = () => {
        navigation.navigate('DetailDoctor', { doctorId: route.params.detailAppointment.doctorId, detailAppointment: route.params.detailAppointment })
    }

    const show = () => {
        setShowDateTimePicker(true)
    }

    const buildDate = (dateInput) => {
        let Vi = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let En = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
        let date = moment.unix(+dateInput / 1000).format('dddd - DD/MM/YYYY')
        for (let i = 0; i < Vi.length; i++) {
            if (date.substring(0, date.indexOf("-") - 1) === Vi[i]) {
                date = En[i] + date.substring(date.indexOf("-") - 1)
            }
        }
        return date
    }

    const phoneValidation = (phone) => {
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        if (regex.test(phone) === false || phone.length !== 10) {
            return false
        }
        return true
    }
    return (
        <>
            <HeaderApp goBack={true} />
            {isLoading === true ?
                <ActivityIndicator style={styles.container} />
                :
                <>
                    {waitingBooking && <ActivityIndicator style={styles.a} />}
                    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.navigate('DetailDoctor', { doctorId: route.params.time ? route.params.time.doctorId : route.params.detailAppointment.doctorId })}>
                                <ImageBackground source={detailDoctor.image ? { uri: `${detailDoctor.image}` } : img} resizeMode="cover" imageStyle={{ borderRadius: 50 }} style={styles.avatar} />
                            </TouchableOpacity>
                            <View style={styles.content}>
                                <Text style={styles.name}>
                                    {detailDoctor.positionData ? detailDoctor.positionData.valueVi : ''} {detailDoctor.DoctorInfor && detailDoctor.DoctorInfor.dataSpecialty ? detailDoctor.DoctorInfor.dataSpecialty.nameVi : ''} || {detailDoctor.lastName} {detailDoctor.firstName}
                                </Text>
                                <View style={styles.timeType}>
                                    <Text style={styles.time}>{route.params.time && route.params.time.timeTypeData ? route.params.time.timeTypeData.valueVi : route.params.detailAppointment.timeTypeDataBooking.valueVi}  {route.params.time && route.params.time.date ? buildDate(route.params.time.date) : buildDate(route.params.detailAppointment.date)}</Text>
                                    {
                                        route.params.detailAppointment &&
                                        <TouchableOpacity style={styles.iconEdit} onPress={handleEditTimeBooking}>{edit}</TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <Text style={styles.price}>
                                <Text>Giá khám: </Text>
                                <NumberFormat
                                    value={detailDoctor.DoctorInfor && detailDoctor.DoctorInfor.priceTypeData ? detailDoctor.DoctorInfor.priceTypeData.valueVi : ''}
                                    displayType="text"
                                    thousandSeparator
                                    renderText={(value) => <Text style={{ color: '#333' }}>{value} đ</Text>}
                                >
                                </NumberFormat>
                            </Text>
                            <View style={styles.inputBox}>
                                <View style={styles.icon}>{user}</View>
                                <TextInput
                                    value={fullName}
                                    style={styles.input}
                                    placeholder="Họ và tên"
                                    onChangeText={setFullName}
                                    placeholderTextColor="#666"
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <View style={styles.icon}>{mobile}</View>
                                <TextInput
                                    value={phoneNumber}
                                    style={styles.input}
                                    placeholder="Số điện thoại"
                                    onChangeText={setPhoneNumber}
                                    placeholderTextColor="#666"
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <View style={styles.icon}>{emailIcon}</View>
                                <TextInput
                                    value={email}
                                    style={styles.input}
                                    placeholder="Email"
                                    onChangeText={setEmail}
                                    placeholderTextColor="#666"
                                />
                            </View>

                            <View style={styles.inputBox}>
                                <View style={styles.icon}>{transgender}</View>
                                <CheckBox
                                    checkBoxColor={'#49bce2'}
                                    onClick={() => {
                                        setGender('M')
                                    }}
                                    isChecked={gender === 'M' ? true : false}
                                    style={styles.checkbox}
                                    rightTextView={<Text style={{ color: '#666' }}>Nam</Text>}
                                />
                                <CheckBox
                                    checkBoxColor={'#49bce2'}
                                    onClick={() => {
                                        setGender('F')
                                    }}
                                    isChecked={gender === 'F' ? true : false}
                                    style={styles.checkbox}
                                    rightTextView={<Text style={{ color: '#666' }}>Nữ</Text>}
                                />
                            </View>
                            <TouchableOpacity style={styles.inputBox} onPress={show}>
                                <View style={styles.icon}>{schedule}</View>
                                {showDateTimePicker === true &&
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode='date'
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeFunc}
                                    />
                                }
                                <Text style={styles.input}>{birthday}</Text>
                            </TouchableOpacity>
                            <View style={styles.inputBox}>
                                <View style={styles.icon}>{question}</View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Lý do khám"
                                    value={reason}
                                    onChangeText={setReason}
                                    placeholderTextColor="#666"
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <View style={styles.icon}>{map}</View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Địa chỉ lên hệ"
                                    value={address}
                                    onChangeText={setAddress}
                                    placeholderTextColor="#666"
                                />
                            </View>
                        </View>
                        <View style={styles.footer}>
                            {
                                route.params.detailAppointment ?
                                    <TouchableOpacity style={styles.btnBooking} onPress={handleUpdateBooking}>
                                        <Text style={styles.btnBooking}>CẬP NHẬT</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.btnBooking} onPress={handleBooking}>
                                        <Text style={styles.btnBooking}>ĐẶT LỊCH</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </ScrollView>
                </>
            }
        </>
    )
}
