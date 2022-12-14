import { Text, TouchableOpacity, ScrollView, View, ImageBackground, Alert, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPatientForDoctor } from '../../services/userService'
import { useNavigation } from '@react-navigation/native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { isLogin, infoUser } from '../../redux/selectors'
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderApp from '../Header/HeaderApp'
import styles from './AppointmentStyle'
import Icon from 'react-native-vector-icons/Ionicons';
import ListPatient from './ListPatient';
import background from '../../../assets/appointment.jpg'
const CalendarIcon = <Icon name="md-calendar-sharp" size={26} color="#49bce2" />;
const detailIcon = <Icon name="information-circle-sharp" size={22} color="red" style={styles.icon} />;
const clearIcon = <Icon name="close" size={20} color="#000000" />;

export default function Appointment() {
    const login = useSelector(isLogin)
    const user = useSelector(infoUser)
    const [inforUser, setInforUser] = useState({})
    const route = useRoute();
    const navigation = useNavigation();
    const [listAppointment, setListAppointment] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(new Date());
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [dateSelected, setDateSelected] = useState(null);

    const fetchAllPatientForDoctor = async (doctorId, formattedDate, status, search) => {
        setIsLoading(true)
        let res = await getAllPatientForDoctor({
            doctorId: doctorId,
            date: formattedDate,
            status: status,
            search: search
        })
        if (res && res.errCode === 0) {
            setListAppointment(res.data)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            fetchAllPatientForDoctor(user.id, "", "S2", "")
        } else {
            navigation.navigate("Login")
        }
    }, []);

    useEffect(() => {
        setInforUser(user)
        fetchAllPatientForDoctor(user.id, "", "S2", "")
    }, [user]);

    useFocusEffect(
        useCallback(() => {
            if (route.params && route.params.doctorId) {
                fetchAllPatientForDoctor(route.params.doctorId, "", "S2", "")
            }
        }, [route, navigation])
    )
    const handleDetailErr = () => {
        Alert.alert(
            "Thông báo !",
            "Bạn đã thay đổi kế hoạch khám bệnh. Xin chờ bệnh nhân xác nhận !",
            [
                { text: "Quay lại" },
            ]
        );
    }

    const onChangeFunc = (event) => {
        setShowDateTimePicker(false)
        if (event.type !== 'dismissed') {
            let timeTemp = new Date(event.nativeEvent.timestamp);
            let date = timeTemp.getDate();
            let month = timeTemp.getMonth() + 1;
            let year = timeTemp.getFullYear();
            let dateSelected = date + '/' + month + '/' + year
            const date2 = new Date(+year, month - 1, +date)
            setDateSelected(dateSelected)
            fetchAllPatientForDoctor(user.id, date2.getTime(), "S2", "")
        }
    }

    const handleClearDateSearch = () => {
        setDateSelected(null)
        fetchAllPatientForDoctor(user.id, "", "S2", "")
    }

    const onRefresh = () => {
        fetchAllPatientForDoctor(inforUser.id, "", "S2", "")
    }
    return (
        <>
            <HeaderApp logOut={true} />
            <View style={[styles.container]} >
                {isLoading ?
                    <View style={{ backgroundColor: '#fff', flex: 12, }}>
                        <ActivityIndicator style={styles.container} />
                    </View>
                    :
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
                            <View style={styles.calendarBox}>
                                <TouchableOpacity style={{ width: '10%' }} onPress={() => setShowDateTimePicker(true)}>
                                    {CalendarIcon}
                                </TouchableOpacity>
                                <Text style={{ width: '80%', textAlign: 'center', fontSize: 16, fontWeight: '500', padding: 3 }}>{dateSelected}</Text>
                                {
                                    dateSelected !== null &&
                                    <TouchableOpacity style={{ width: '10%', textAlign: 'center' }} onPress={() => handleClearDateSearch()}>{clearIcon}</TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={styles.listAppointment}>
                            {listAppointment.length > 0 ?
                                listAppointment.map((item, index) => {
                                    var timesTemp = new Date(+item.date);
                                    return (
                                        item.checkTime != null ?
                                            <TouchableOpacity style={styles.appointment} onPress={() => navigation.navigate("DetailAppointment", { detailAppointment: item })} key={item.id}>

                                                <View style={styles.appointmentLeft}>
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
                                                <View style={styles.appointmentRight}>
                                                    <View style={{ paddingHorizontal: 10 }}>
                                                        <Text style={styles.textInfo}>Bệnh nhân: <Text style={{ color: "#333333" }}>{item.fullNamePatient ? item.fullNamePatient : ''}</Text> </Text>
                                                        <Text style={styles.textInfo}>Năm sinh: <Text style={{ color: "#333333" }}>{item.birthdayPatient ? item.birthdayPatient : ''}</Text></Text>
                                                        <Text style={styles.textInfo}>Số điện thoại: <Text style={{ color: "#333333" }}>{item.phoneNumberPatient ? item.phoneNumberPatient : ''}</Text></Text>
                                                        <Text style={styles.textInfo}>Lý do khám: <Text style={{ color: "#333333" }}>{item.reason ? item.reason : ''}</Text></Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={styles.appointment} onPress={() => handleDetailErr()} key={item.id}>

                                                <View style={styles.appointmentLeftErr}>
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
                                                <View style={styles.appointmentRight}>
                                                    <View style={{ paddingHorizontal: 10 }}>
                                                        <Text style={styles.textInfo}>Bệnh nhân: <Text style={{ color: "#333333" }}>{item.fullNamePatient ? item.fullNamePatient : ''}</Text> </Text>
                                                        <Text style={styles.textInfo}>Năm sinh: <Text style={{ color: "#333333" }}>{item.birthdayPatient ? item.birthdayPatient : ''}</Text></Text>
                                                        <Text style={styles.textInfo}>Số điện thoại: <Text style={{ color: "#333333" }}>{item.phoneNumberPatient ? item.phoneNumberPatient : ''}</Text></Text>
                                                        <Text style={styles.textInfo}>Lý do khám: <Text style={{ color: "#333333" }}>{item.reason ? item.reason : ''}</Text></Text>
                                                    </View>
                                                    <View style={styles.iconDetail}><Text>{detailIcon}</Text></View>
                                                </View>
                                            </TouchableOpacity>
                                    )
                                })
                                :
                                <ImageBackground source={background} resizeMode="contain" style={{ height: 400 }} >
                                    <Text style={styles.textAppointmentNull}>
                                        Lịch hẹn trống !
                                    </Text>
                                </ImageBackground>
                            }

                        </View>
                    </ScrollView>
                }
            </View>
        </>
    )
}
