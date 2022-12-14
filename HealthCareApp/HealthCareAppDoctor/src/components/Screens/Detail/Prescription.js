import { Text, TouchableOpacity, ScrollView, View, ImageBackground, ToastAndroid, RefreshControl, ActivityIndicator, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import HeaderApp from '../../Header/HeaderApp'
import { sendRemedyService } from '../../../services/userService'
import styles from './PrescriptionStyle'
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
const calendarIcon = <Feather name="calendar" size={20} color="#FF3366" />;

export default function Prescription() {
    const route = useRoute();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false)
    const [diagnostic, setDiagnostic] = useState('')
    const [advice, setAdvice] = useState('')
    const [prescription, setPrescription] = useState('')
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [dateSelected, setDateSelected] = useState(null);
    const [reExaminationDate, setReExaminationDate] = useState(new Date());

    const Toast = (message) => {
        ToastAndroid.show(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
        );
    };
    const onChangeFunc = (event) => {
        if (event.type !== 'dismissed') {
            let timeTemp = new Date(event.nativeEvent.timestamp);
            let date = timeTemp.getDate();
            let month = timeTemp.getMonth() + 1;
            let year = timeTemp.getFullYear();
            let dateSelected = date + '/' + month + '/' + year
            setDateSelected(dateSelected)
        }
        setShowDateTimePicker(false)
    }

    const handleShowDateTimePicker = () => {
        setShowDateTimePicker(true)
    }

    const handleSendRemedy = async () => {
        try {
            setIsLoading(true)
            let res = await sendRemedyService({
                doctorId: route.params.detailAppointment.doctorId,
                bookingId: route.params.detailAppointment.id,
                email: route.params.detailAppointment.emailPatient,
                timeType: route.params.detailAppointment.timeType,
                patientName: route.params.detailAppointment.fullNamePatient,
                diagnostic: diagnostic,
                advice: advice,
                prescription: prescription,
                reExaminationDate: dateSelected,
                location: "APP"
            })
            if (res.errCode === 0) {
                Toast("Lưu kết quả khám bệnh thành công !")
                navigation.navigate("Appointment", { doctorId: route.params.detailAppointment.doctorId })
            } else {
                Toast("Lưu kết quả khám bệnh thất bại !")
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }


    return (
        <>
            <HeaderApp logOut={true} goBack={true} />
            <View style={{ flex: 1, position: 'relative' }}>
                <LinearGradient
                    colors={["#53A6D8", "#96D7C6", "#BAC94A"]}
                    style={{ height: '100%' }}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.title}>Nhập kết quả khám bệnh</Text>
                    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={styles.titleInput}>Chuẩn đoán bệnh (*)</Text>
                            <TextInput
                                value={diagnostic}
                                style={styles.input}
                                onChangeText={setDiagnostic}
                                placeholderTextColor="#DCDCDC"
                                placeholder="Nhập chuẩn đoán bệnh"
                                multiline
                            />
                        </View>

                        <View>
                            <Text style={styles.titleInput}>Lời dặn (*)</Text>
                            <TextInput
                                value={advice}
                                style={styles.input}
                                onChangeText={setAdvice}
                                placeholderTextColor="#DCDCDC"
                                placeholder="Lời dặn"
                                multiline
                            />
                        </View>
                        <View>
                            <Text style={styles.titleInput}>Đơn thuốc</Text>
                            <TextInput
                                value={prescription}
                                style={styles.input}
                                onChangeText={setPrescription}
                                placeholderTextColor="#DCDCDC"
                                placeholder="Nhập đơn thuốc"
                                multiline
                            />
                        </View>

                        <View>
                            <Text style={styles.titleInput}>Lịch tái khám</Text>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    borderWidth: 1.5,
                                    borderColor: 'blue',
                                    padding: 5,
                                    paddingHorizontal: 10,
                                    borderRadius: 6,
                                    marginTop: 10,
                                    marginBottom: 25,
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                                onPress={() => handleShowDateTimePicker()}
                            >
                                {
                                    dateSelected === null ?
                                        <TextInput
                                            value={dateSelected}
                                            placeholderTextColor="#DCDCDC"
                                            placeholder="Chọn ngày tái khám"
                                            editable={false}

                                        />
                                        :
                                        <Text style={{ height: '100%', paddingVertical: 5, fontWeight: '500' }}>{dateSelected}</Text>
                                }
                                {calendarIcon}
                            </TouchableOpacity>
                            {showDateTimePicker === true &&
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={reExaminationDate}
                                    mode='date'
                                    display="default"
                                    onChange={onChangeFunc}

                                />
                            }
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
                            <TouchableOpacity
                                style={{ width: '60%', alignItems: 'center' }}
                                onPress={() => handleSendRemedy()}
                            >
                                <LinearGradient
                                    style={{ borderRadius: 15, width: '100%' }}
                                    colors={["#53A6D8", "#96D7C6", "#BAC94A"]}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Text style={{ paddingVertical: 12, textAlign: 'center', color: '#fff' }}>LƯU LẠI</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
            {isLoading === true &&
                <ActivityIndicator style={styles.activityIndicator} />
            }
        </>
    )
}
