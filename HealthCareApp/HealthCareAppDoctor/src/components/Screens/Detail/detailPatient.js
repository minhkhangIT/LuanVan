import { Text, TouchableOpacity, ScrollView, View, ImageBackground, RefreshControl, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { isLogin, infoUser } from '../../../redux/selectors'
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import HeaderApp from '../../Header/HeaderApp'
import styles from './detailPatientStyle'
import Icon from 'react-native-vector-icons/Ionicons';
import { getPrescriptionByPatientAccountId } from '../../../services/userService'



export default function DetailPatient() {
    const route = useRoute();
    const navigation = useNavigation();
    const user = useSelector(infoUser)
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(new Date());
    const [detailPatient, setDetailPatient] = useState([])

    const getdetailPatient = async (patientAccountId, doctorId) => {
        try {
            let res = await getPrescriptionByPatientAccountId(patientAccountId, doctorId)
            if (res && res.errCode === 0) {
                setDetailPatient(res.data)
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getdetailPatient(route.params.patientAccountId, "ALL")
    }, [])

    return (
        <>
            <HeaderApp logOut={true} goBack={true} />
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={["#355c7d", "#6c5b7b", "#c06c84"]}
                    style={{ height: '100%' }}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="person-circle-outline" size={80} color="#fefefe" />
                        </View>
                        <Text style={styles.title}>Tiềm sử khám bệnh</Text>
                    </View>
                    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                        {detailPatient && detailPatient.length > 0 &&
                            detailPatient.map((item, index) => {
                                var timesTemp = new Date(+item.date)
                                let dayExamination = timesTemp.getDate() + '/' + (timesTemp.getMonth() + 1) + '/' + timesTemp.getFullYear()
                                return (
                                    <View style={{ backgroundColor: '#E8E8E8', marginBottom: 10, paddingVertical:10 }} key={index}>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                                            <Text style={{ width: 110 }}>Họ và tên:</Text>
                                            <Text>{item.fullNamePatient}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                                            <Text style={{ width: 110 }}>Địa chỉ:</Text>
                                            <Text>{item.addressPatient}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                                            <Text style={{ width: 110 }}>Giới tính:</Text>
                                            <Text>{item.genderDataPatient ? item.genderDataPatient.valueVi : ''}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                                            <Text style={{ width: 110 }}>Số điện thoại:</Text>
                                            <Text>{item.phoneNumberPatient}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                                            <Text style={{ width: 110 }}>Ngày khám:</Text>
                                            <Text>{dayExamination}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                                            <Text style={{ width: 110 }}>Chuẩn đoán:</Text>
                                            <Text>{item.Prescription ? item.Prescription.diagnostic : ''}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                                            <Text style={{ width: 110 }}>Đơn thuốc:</Text>
                                            <Text>{item.Prescription ? item.Prescription.prescription : ''}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </LinearGradient>
            </View>
        </>
    )
}
