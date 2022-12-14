import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, ScrollView, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect, memo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './DoctorInforStyle';
import img from '../../../../../assets/doctor-icon-png-708262.jpg'
import { getDetailInforDoctorService, getScheduleByDateService } from '../../../../services/userService'
import NumberFormat from 'react-number-format';
import Markdown from 'react-native-markdown-text'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';

function DoctorInfor(props) {
    const navigation = useNavigation();
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [position, setPosition] = useState('')
    const [specialty, setSPecialty] = useState('')
    const [description, setDescription] = useState('')
    const [addressClinic, setAddressClinic] = useState('')
    const [nameClinic, setNameClinic] = useState('')
    const [price, setPrice] = useState('')
    const [note, setNote] = useState('')
    const [extraInfoDoctor, setExtraInfoDoctor] = useState('')
    const [imageBase64, setImageBase64] = useState('')
    const [isShowDetail, setIsShowDetail] = useState(false)
    const [schedule, setSchedule] = useState([])
    const [isShowExtraInfoDoctor, setIsShowExtraInfoDoctor] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const getDetailDoctor = async (id) => {
        try {
            const response = await getDetailInforDoctorService(id)
            setIsLoading(false)
            if (response.errCode === 0 && response.data) {
                setLastName(response.data.lastName)
                setFirstName(response.data.firstName)
                setPosition(response.data.positionData.valueVi)
                setSPecialty(response.data.DoctorInfor.dataSpecialty.nameVi)
                setDescription(response.data.Markdown ? response.data.Markdown.description : '')
                setAddressClinic(response.data.DoctorInfor.addressClinic)
                setNameClinic(response.data.DoctorInfor.nameClinic)
                setPrice(response.data.DoctorInfor.priceTypeData.valueVi)
                setImageBase64(response.data.image)
                setNote(response.data.DoctorInfor.note)
                setExtraInfoDoctor(response.data.Markdown ? response.data.Markdown.contentMarkdown : '')
            }
        } catch (error) {
            Alert.alert(
                "Lỗi !",
                "Không thể tải thông tin bác sĩ !",
                [
                    { text: "Quay lại", onPress: () => navigation.goBack() }
                ]
            );
        }


    }

    const getSchedule = async (doctorId, date) => {
        try {
            let schedule = await getScheduleByDateService(doctorId, date)
            if (schedule && schedule.errCode === 0) {
                setSchedule(schedule.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (props.doctorId !== '') {
            setIsLoading(true)
            const doctorId = props.doctorId
            let date = getArrayDays()[0].value
            getSchedule(props.doctorId, date)
            getDetailDoctor(doctorId)
        }
    }, [props.doctorId])

    useEffect(() => {
        if (!props.isShowExtraInfoDoctor) {
            setIsShowExtraInfoDoctor(false)
        }
    })

    const getArrayDays = () => {
        let Vi = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let En = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${ddMM}`;
                object.label = today;
            } else {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                for (let i = 0; i < Vi.length; i++) {
                    if (labelVi.substring(0, labelVi.indexOf("-") - 1) === Vi[i]) {
                        object.label = En[i] + labelVi.substring(labelVi.indexOf("-") - 1)
                    }
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDays.push(object);
        }
        return arrDays;
    }

    const dataSelectDropDown = () => {
        let Vi = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let En = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let data = '';
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${ddMM}`;
                data = today;
            } else {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                for (let i = 0; i < Vi.length; i++) {
                    if (labelVi.substring(0, labelVi.indexOf("-") - 1) === Vi[i]) {
                        data = En[i] + labelVi.substring(labelVi.indexOf("-") - 1)
                    }
                }
            }
            arrDays.push(data);
        }
        return arrDays;
    }

    const handleOnChangeSelect = async (index) => {
        try {
            let date = getArrayDays()[index].value
            let schedule = await getScheduleByDateService(props.doctorId, date)
            if (schedule && schedule.errCode === 0) {
                setSchedule(schedule.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onRefresh = () => {
        if (props.doctorId !== '') {
            setIsLoading(true)
            let doctorId = props.doctorId
            getDetailDoctor(doctorId)
            let date = getArrayDays()[0].value
            getSchedule(props.doctorId, date)
        }
    }

    const checkLogin = async () => {
        setIsLoading(true)
        try {
            const value = await AsyncStorage.getItem('@Login')
            if (value !== null) {
                setIsLoading(false)
                return value.replace('+84', '0')
            } else {
                setIsLoading(false)
                return false
            }
        } catch (e) {
            setIsLoading(false)
            return false
        }
    }

    const handleNavigate = () => {
        navigation.navigate('Login', { goBack: Math.floor(Math.random() * 100) + 1, doctorId: props.doctorId })
    }

    const handleBooking = async (item) => {
        try {
            let login = await checkLogin()
            if (login) {
                if (props.detailAppointment) {
                    navigation.navigate('Booking', { detailAppointment: props.detailAppointment, time: item })
                } else {
                    navigation.navigate('Booking', { time: item, patientAccountPhone: login })
                }
            } else {
                Alert.alert(
                    "Thông báo !",
                    "Đăng nhập trước khi đặt lịch",
                    [
                        {
                            text: "Hủy",
                            style: "cancel"
                        },
                        { text: "Đăng nhập", onPress: () => handleNavigate() }
                    ]
                );
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                isLoading ?
                    <View style={styles.isLoading} >
                        <ActivityIndicator />
                    </View>
                    :
                    <ScrollView
                        style={styles.container}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={onRefresh}
                            />
                        }>
                        <View style={styles.containerDoctor}>
                            <TouchableOpacity onPress={() => navigation.navigate('DetailDoctor', { doctorId: props.doctorId })}>
                                <ImageBackground source={imageBase64 !== '' ? { uri: `${imageBase64}` } : img} resizeMode="cover" imageStyle={{ borderRadius: 50 }} style={styles.avatar} />
                            </TouchableOpacity>
                            <View style={styles.content}>
                                <Text style={styles.name}>{position} {specialty} || {lastName} {firstName}</Text>
                                <Text style={styles.inf}>{description}</Text>
                            </View>
                        </View>

                        <View style={styles.containerSchedule}>
                            <SelectDropdown
                                data={dataSelectDropDown()}
                                onSelect={(selectedItem, index) => {
                                    handleOnChangeSelect(index)
                                }}
                                defaultButtonText={dataSelectDropDown()[0]}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                                buttonStyle={styles.dropdownBtnStyle}
                                buttonTextStyle={styles.dropdownBtnTxtStyle}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'blue'} size={9} />;
                                }}
                                dropdownIconPosition={'right'}
                                dropdownStyle={styles.dropdownDropdownStyle}
                                rowStyle={styles.dropdownRowStyle}
                                rowTextStyle={styles.dropdownRowTxtStyle}

                            />
                            <View style={styles.schedule}>
                                <Entypo name={'calendar'} color={'#333333'} size={13} />
                                <Text>LỊCH KHÁM</Text>
                            </View>
                            <View style={styles.calendarContainer}>
                                {schedule.length > 0 ?
                                    <>
                                        {schedule.map((item, index) => {
                                            return (
                                                <TouchableOpacity style={styles.calendar} key={item.id} onPress={() => handleBooking(item)}>
                                                    <Text style={styles.calendarLabel}>{item.timeTypeData.valueVi}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}

                                    </>
                                    :
                                    <>
                                        <Text style={styles.emptySchedule}>Bác sĩ không có lịch khám vào thời gian này !</Text>
                                    </>

                                }
                            </View>
                            {schedule.length > 0 &&
                                <View >
                                    <Text style={styles.bookFree}>Chọn <FontAwesome name={'hand-o-up'} color={'#000'} size={9} /> và đặt lịch miễn phí</Text>
                                </View>
                            }
                            <View style={styles.infoClinic}>
                                <Text>ĐỊA CHỈ KHÁM</Text>
                                <Text style={{fontSize:14,fontWeight:'400'  }}>{nameClinic}</Text>
                                <Text style={styles.address}>{addressClinic}</Text>
                            </View>
                            <View style={isShowDetail ? [styles.price, styles.isShowDetail] : styles.price}>
                                <Text>GIÁ KHÁM:</Text>
                                {isShowDetail === false ?
                                    <>
                                        <Text style={styles.money}>
                                            <NumberFormat
                                                value={price}
                                                displayType="text"
                                                thousandSeparator
                                                renderText={(value) => <Text>{value}</Text>}
                                            >
                                            </NumberFormat>
                                            đ
                                        </Text>
                                        <TouchableOpacity onPress={() => setIsShowDetail(true)}>
                                            <Text style={styles.showDetail}>Xem chi tiết</Text>
                                        </TouchableOpacity>
                                    </>
                                    :
                                    <>
                                        <View>
                                            <View style={styles.detailPriceBox}>
                                                <View style={styles.detailPrice}>
                                                    <Text>Giá khám</Text>
                                                    <Text style={styles.money}>
                                                        <NumberFormat
                                                            value={price}
                                                            displayType="text"
                                                            thousandSeparator
                                                            renderText={(value) => <Text>{value}</Text>}
                                                        >
                                                        </NumberFormat>
                                                        đ
                                                    </Text>
                                                </View>
                                                <View style={styles.detailPayment}>
                                                    <Text>{note}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={() => setIsShowDetail(false)}>
                                                <Text style={styles.hideDetail}>Ẩn bảng giá</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                }
                            </View>
                        </View>

                        {isShowExtraInfoDoctor &&
                            <View style={styles.extraInfoDoctor}>
                                <Markdown >
                                    {extraInfoDoctor}
                                </Markdown>
                            </View>
                        }

                    </ScrollView>
            }
        </>
    )
}

export default memo(DoctorInfor)