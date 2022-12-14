import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import styles from './OtpStyle'
import HeaderApp from '../components/Header/HeaderApp'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseConfig } from '../firebase'
import firebase from 'firebase/compat/app'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { createNewPatientAccountService } from '../../src/services/userService'

let back = <Icon name="ios-chevron-back" size={18} color="#fff" style={styles.icon} />

export default function Otp({ route }) {
    const routeName = useRoute();
    const navigation = useNavigation();
    const [checkValidatePhone, setCheckValidatePhone] = useState(false)
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const [showCodeInput, setShowCodeInput] = useState(false)
    const [verificationId, setVerificationId] = useState(null)
    const recaptchaVerifier = useRef(null)
    const [waiting, setWaiting] = useState(false)


    const sendVerification = async () => {
        setWaiting(true)
        let phoneInput = '+84' + phone.slice(1)
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        try {
            let ID = await phoneProvider.verifyPhoneNumber(phoneInput, recaptchaVerifier.current)
            setVerificationId(ID)
            setShowCodeInput(true)
        } catch (error) {
            console.log(error)
            Alert.alert(
                "Lỗi !",
                "Không thể xác thực số điện thoại !"
            )
        }
        setWaiting(false)
    }

    useFocusEffect(
        useCallback(() => {
            checkLogin()
        }, [routeName])
    )

    const checkLogin = async () => {
        setWaiting(true)
        try {
            const value = await AsyncStorage.getItem('@Login')
            if (value !== null) {
                if (routeName.params.parent && routeName.params.parent === 'Schedule') {
                    navigation.navigate('Schedule')
                } else {
                    if (routeName.params.parent && routeName.params.parent === 'History') {
                        navigation.navigate('History')
                    }
                }
            }
        } catch (e) {
        }
        setWaiting(false)
    }

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@Login', value)
        } catch (e) {
        }
    }

    const confirmCode = async () => {
        setWaiting(true)
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        try {
            let response = await firebase.auth().signInWithCredential(credential)
            if (response) {
                let a = await createNewPatientAccountService({
                    phoneNumber: phone
                })
                storeData('+84' + phone.slice(1))
                if (routeName.params.doctorId) {
                    navigation.navigate('DetailDoctor', { doctorId: routeName.params.doctorId })
                } else {
                    if (routeName.params.parent && routeName.params.parent === 'Schedule') {
                        navigation.navigate('Schedule')
                    } else {
                        if (routeName.params.parent && routeName.params.parent === 'History') {
                            navigation.navigate('History')
                        }
                    }
                }
                setCode('');
            }
        } catch (error) {
            Alert.alert(
                "Lỗi !",
                "Mã không hợp lệ !"
            )
            setCode('')
        }
        setWaiting(false)
    }

    useEffect(() => {
        if (phoneValidation(phone)) {
            setCheckValidatePhone(true)
        } else {
            setCheckValidatePhone(false)
        }
    }, [phone])

    useEffect(() => {
        setShowCodeInput(false)
        storeData('')
    }, [route.params.goBack])

    const phoneValidation = (phone) => {
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        if (regex.test(phone) === false || phone.length !== 10) {
            return false
        }
        return true
    }
    return (
        <>
            <HeaderApp />
            {waiting && <ActivityIndicator style={styles.waiting} />}
            <View style={[styles.container]}>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
                {showCodeInput === false ?
                    <View style={styles.schedule}>
                        <Text>Nhập số điện thoại của bạn để tiếp tục</Text>
                        <View>
                            <TextInput
                                value={phone}
                                style={styles.input}
                                placeholder="Số điện thoại của bạn"
                                onChangeText={setPhone}
                                placeholderTextColor="#666"
                                keyboardType='phone-pad'
                            />
                        </View>
                        {checkValidatePhone ?
                            <TouchableOpacity style={styles.login} onPress={sendVerification}>
                                <Text style={{ color: '#fff' }}>ĐĂNG NHẬP</Text>
                            </TouchableOpacity>
                            :
                            <View style={[styles.login, styles.check]}>
                                <Text style={{ color: '#fff' }}>ĐĂNG NHẬP</Text>
                            </View>
                        }
                    </View>
                    :
                    <View style={styles.schedule}>
                        <Text>Nhập mã</Text>
                        <View>
                            <TextInput
                                value={code}
                                style={styles.input}
                                placeholder="Mã code"
                                onChangeText={setCode}
                                placeholderTextColor="#666"
                                keyboardType='phone-pad'
                            />
                        </View>
                        <TouchableOpacity style={styles.login} onPress={confirmCode}>
                            <Text style={{ color: '#fff' }}>XÁC NHẬN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.login} onPress={sendVerification}>
                            <Text style={{ color: '#fff' }}>GỬI LẠI MÃ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.login} onPress={() => setShowCodeInput(false)}>
                            <Text>{back}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </>
    )
}


