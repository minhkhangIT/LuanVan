import { Text, View, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator, ImageBackground, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import styles from './HistoryStyle'
import HeaderApp from '../Header/HeaderApp'
import Icon from 'react-native-vector-icons/Ionicons';
import { getPrescriptionByPatientAccountId } from '../../services/userService'
import NumberFormat from 'react-number-format';
import background from '../../../assets/appointment.jpg'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
const detailIcon = <Icon name="information-circle-sharp" size={22} color="#49bce2" style={styles.icon} />;

export default function History() {
    const routeName = useRoute();
    const navigation = useNavigation();
    const [user, setUser] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [history, setHistory] = useState([])


    useEffect(() => {
        navigation.addListener('focus', () => {
            setIsLoading(true)
            loadData()
        });
    }, [routeName]);

    useEffect(() => {
        loadData()
    }, []);

    const getHistory = async (phone) => {
        setIsLoading(true)
        try {
            let res = await getPrescriptionByPatientAccountId(1, "ALL")
            if (res && res.errCode === 0) {
                if (res.data !== history) {
                    setHistory(res.data)
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
                getHistory(value.replace('+84', '0'))
            } else {
                navigation.navigate('Login', { goBack: Math.floor(Math.random() * 100) + 1, parent: 'History' })
            }
        } catch (e) {
            navigation.navigate('Login', { goBack: Math.floor(Math.random() * 100) + 1, parent: 'History' })
        }
    }
    const onRefresh = () => {
        getHistory(user)
    }
    return (
        <>
            <HeaderApp logOut={true} />
            <View style={[styles.container]} >
                {isLoading === true ?
                    <ActivityIndicator style={styles.container} />
                    :
                    <ScrollView style={styles.listSChedule} showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {history && history.length > 0 ?
                            history.map((item, index) => {
                                var timesTemp = new Date(+item.date);
                                return (
                                    <TouchableOpacity style={styles.schedule} onPress={() => navigation.navigate('DetailHistory', { detailHistory: item })} key={index}>
                                        <View style={styles.left}>
                                            <View style={styles.dateBox}>
                                                <Text>Ngày khám</Text>
                                                <Text style={styles.date}>
                                                    {timesTemp.getDate()}
                                                </Text>
                                                <Text style={styles.month}>
                                                    {timesTemp.getMonth() + 1}/{timesTemp.getFullYear()}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.right}>
                                            <View>
                                                <Text>Bệnh nhân : {item.fullNamePatient}</Text>
                                                <Text>Tên bệnh: {item.Prescription ? item.Prescription.diagnostic : ''}</Text>
                                                <Text>Nơi khám: {item.DoctorDataBooking && item.DoctorDataBooking.DoctorInfor ? item.DoctorDataBooking.DoctorInfor.nameClinic : ''}</Text>
                                            </View>
                                            <View style={styles.iconDetail}><Text>{detailIcon}</Text></View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                            :
                            <View >
                                <ImageBackground source={background} resizeMode="contain" style={styles.appointmentNull} >
                                    <Text style={styles.text}>
                                        Chưa có lịch sử khám bệnh !
                                    </Text>
                                </ImageBackground>
                            </View>
                        }
                    </ScrollView>
                }
            </View>
        </>
    )
}



