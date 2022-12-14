import { Text, TouchableOpacity, View, TextInput, ImageBackground, Dimensions, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateLogin, updateUser } from '../../redux/actions'
import GlobalStyles from '../Styles/GlobalStyles'
import styles from './LoginStyle'
import { LinearGradient } from 'expo-linear-gradient'
import Entypo from 'react-native-vector-icons/Entypo';
import background from '../../../assets/backgroundLogin.png'
import { useNavigation } from '@react-navigation/native';
import { handleLoginAPI } from '../../services/userService'

const cross = <Entypo name="cross" size={18} color="red" />;
const eye = <Entypo name="eye" size={18} color="#49bce2" />;
const eyeWithLine = <Entypo name="eye-with-line" size={18} color="#49bce2" />;
const check = <Entypo name="check" size={18} color="#49bce2" />;
export default function Login() {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [emailErr, setEmailErr] = useState(true)

    const handleLogin = async () => {
        Keyboard.dismiss()
        try {
            let data = await handleLoginAPI(email, password);
            if (data.errCode === 0 && data.user && data.user.roleId === 'R2') {
                dispatch(updateLogin(true))
                dispatch(updateUser(data.user))
                navigation.navigate("HomeTabs")
            } else {
                setShowErr(true)
            }

        } catch (error) {
            setShowErr(true)
        }
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const checkEmail = (email) => {
        if (reg.test(email) === false) {
            return false
        }
        return true
    }

    useEffect(() => {
        if (checkEmail(email)) {
            if (emailErr !== false) {
                setEmailErr(false)
            }
        } else {
            if (emailErr !== true) {
                setEmailErr(true)
            }
        }
    }, [email]);


    return (
        <SafeAreaView
            style={GlobalStyles.droidSafeArea}
        >
            <KeyboardAvoidingView behavior='position'>
                <ImageBackground
                    source={background}
                    resizeMode="cover"
                    style={{
                        height: Dimensions.get('window').height / 2.5,
                    }}
                />
                <TouchableWithoutFeedback style={{ color: 'red' }} onPress={Keyboard.dismiss}>
                    <LinearGradient
                        colors={["#53A6D8", "#96D7C6", "#BAC94A"]}
                        style={styles.bottomView}
                    >
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: '700', color: '#FFF' }}>Welcome back</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholderTextColor="#666"
                                    onFocus={() => setShowErr(false)}
                                />
                                {email !== '' && emailErr === true &&
                                    <TouchableOpacity>{cross}</TouchableOpacity>
                                }
                                {email !== '' && emailErr === false &&
                                    <TouchableOpacity>{check}</TouchableOpacity>
                                }
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholderTextColor="#666"
                                    secureTextEntry={!showPass}
                                    onFocus={() => setShowErr(false)}
                                />
                                {showPass === true ?
                                    <TouchableOpacity onPress={() => setShowPass(false)} >{eye}</TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => setShowPass(true)}>{eyeWithLine}</TouchableOpacity>
                                }
                            </View>
                            <View style={styles.err}>
                                {showErr &&
                                    <Text style={{ color: 'red' }}>Email hoặc mật khẩu không chính xác !</Text>
                                }
                            </View>
                            <TouchableOpacity style={styles.login} onPress={handleLogin}>
                                <Text style={{ textAlign: 'center', color: '#fff' }}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
