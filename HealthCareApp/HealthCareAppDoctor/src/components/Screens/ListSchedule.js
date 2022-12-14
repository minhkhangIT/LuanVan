import { Text, TouchableOpacity, ScrollView, View, ImageBackground, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { isLogin, infoUser } from '../../redux/selectors'
import { getScheduleByDoctorIdService, getScheduleByDateService } from '../../services/userService'
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './ScheduleStyle'

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const calendarIcon = <Icon name="md-calendar-sharp" size={26} color="#49bce2" />
const calendarIconSmall = <FontAwesome name="calendar-o" size={16} color="#635BA2" />
const downIcon = <FontAwesome name="angle-down" size={20} color="#635BA2" />
const upIcon = <FontAwesome name="angle-up" size={20} color="#635BA2" />
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
    const [listShedule, setListShedule] = useState([]);
    const [detailShedule, setDetailShedule] = useState([]);
    const [showMoreInfo, setShowMoreInfo] = useState([]);

    const getScheduleByDoctorId = async (doctorId) => {
        try {
            let res = await getScheduleByDoctorIdService(doctorId)
            let listData = []
            if (res && res.errCode === 0) {
                let data = res.data
                data = data.map(item => {
                    if (!listData.includes(item.date)) {
                        listData.push(item.date)
                    }

                })
                listData.sort((a, b) => b - a);
                setListShedule(listData)
                setDateSelected(dateSelected)
                setDetailShedule(res.data)
            }

        } catch (error) {
            consoles.log(error)
        }
    }


    const getScheduleByDate = async (doctorId, currentDate) => {
        try {
            let date = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();
            let dateSelected = date + '/' + month + '/' + year
            const date2 = new Date(+year, month - 1, +date)
            let res = await getScheduleByDateService(doctorId, date2.getTime())
            let listData = []
            if (res && res.errCode === 0) {
                let data = res.data
                data = data.map(item => {
                    if (!listData.includes(item.date)) {
                        listData.push(item.date)
                    }

                })
                listData.sort((a, b) => b - a);
                setListShedule(listData)
                setDateSelected(dateSelected)
                setDetailShedule(res.data)
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getScheduleByDoctorId(user.id)
    }, [])

    const onChangeFunc = (event) => {
        setShowDateTimePicker(false)
        if (event.type !== 'dismissed') {
            let timeTemp = new Date(event.nativeEvent.timestamp);
            getScheduleByDate(user.id, timeTemp)
        }
    }
    const onRefresh = () => {
        getScheduleByDoctorId(user.id)
    }

    const handleSetShowMoreInfo = (item) => {
        if (showMoreInfo.indexOf(item) == -1) {
            setShowMoreInfo(item)
        } else {
            setShowMoreInfo([])
        }
    }

    const clearSearch = () => {
        setDateSelected(null)
        getScheduleByDoctorId(user.id)
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
                <Text style={{ marginBottom: 6, color: '#635BA2' }}>Tìm kiếm :</Text>
                <View style={styles.calendarBox}>
                    <TouchableOpacity style={{ width: '10%' }} onPress={() => setShowDateTimePicker(true)}>
                        {calendarIcon}
                    </TouchableOpacity>
                    <Text style={{ width: '80%', textAlign: 'center', fontSize: 16, fontWeight: '400', padding: 3 }}>{dateSelected}</Text>
                    {
                        dateSelected !== null &&
                        <TouchableOpacity style={{ width: '10%', textAlign: 'center' }} onPress={() => clearSearch()}>{clearIcon}</TouchableOpacity>
                    }
                </View>
            </View>
            {listShedule && listShedule.length > 0 &&
                listShedule.map((item, index) => {
                    var timesTemp = new Date(+item)
                    let dateSchedule = timesTemp.getDate() + '/' + (timesTemp.getMonth() + 1) + '/' + timesTemp.getFullYear()
                    return (
                        <View style={{ backgroundColor: '#F8F8FF', marginBottom: 10, borderRadius: 5, padding: 10, }} key={index}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {calendarIconSmall}
                                    <Text style={{ fontSize: 16, color: '#635BA2', marginLeft: 10 }}>{dateSchedule}</Text>
                                </View>
                                <TouchableOpacity onPress={() => handleSetShowMoreInfo(item)}>
                                    {showMoreInfo.includes(item) === true ? upIcon : downIcon}
                                </TouchableOpacity>
                            </View>
                            {showMoreInfo.includes(item) === true
                                &&
                                <View>
                                    <Text style={{ marginBottom: 6, color: '#635BA2' }}>Thời gian:</Text>
                                    <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {
                                            detailShedule.map((element, index) => {
                                                if (element.date == item) {
                                                    return (
                                                        <View style={{ marginTop: 10 }} key={element.id}>
                                                            <Text style={styles.timeItem}>{element.timeTypeData.valueVi}</Text>
                                                        </View>
                                                    )
                                                }
                                            })
                                        }
                                    </View>

                                </View>
                            }
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}
