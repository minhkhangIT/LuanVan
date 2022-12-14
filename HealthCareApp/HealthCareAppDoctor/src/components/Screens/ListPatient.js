import { Text, TouchableOpacity, ScrollView, View, TextInput, ImageBackground, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { isLogin, infoUser } from '../../redux/selectors'
import HeaderApp from '../Header/HeaderApp'
import { getListPatientByDoctorIdAndStatus } from '../../services/userService'
import styles from './ListPatientStyle'
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const detailIcon = <Icon name="information-circle-sharp" size={22} color="#49bce2" style={styles.icon} />;
const clearIcon = <Icon name="close" size={20} color="#49bce2" />;
const searchIcon = <IconFontAwesome5 name="search" size={13} color="#49bce2" />;
const personIcon = <Icon name="person-add" size={40} color="#49bce2" />;

export default function ListPatient() {
    const login = useSelector(isLogin)
    const user = useSelector(infoUser)
    const route = useRoute();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false)
    const [phoneSearch, setPhoneSearch] = useState('')
    const [listPatient, setListPatient] = useState([])

    const getListPatient = async (doctorId, status, search) => {
        try {
            let result = await getListPatientByDoctorIdAndStatus(
                {
                    doctorId: doctorId,
                    status: status,
                    search: search
                }
            )
            if (result && result.errCode === 0) {
                setListPatient(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getListPatient(user.id, "S3", "")
    }, [])

    useEffect(() => {
        getListPatient(user.id, "S3", phoneSearch)
    }, [phoneSearch])

    const onRefresh = () => {
        getListPatient(user.id, "S3", "")
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
                        <View style={{ height: 80, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={styles.searchIcon}>{searchIcon}</View>
                            <TextInput
                                value={phoneSearch}
                                style={styles.input}
                                placeholder="Nhập số điẹn thoại..."
                                onChangeText={setPhoneSearch}
                                placeholderTextColor="#666"
                            />
                            {phoneSearch !== '' &&
                                <TouchableOpacity style={styles.clearIcon} onPress={() => setPhoneSearch('')}>{clearIcon}</TouchableOpacity>
                            }
                        </View>
                        <View style={styles.listPatient}>
                            {listPatient && listPatient.length > 0 &&
                                listPatient.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={styles.appointment} onPress={() => navigation.navigate("DetailPatient", { patientAccountId: item.patientAccountId })} key={index}>
                                            <View style={styles.patientLeft}>
                                                <View style={styles.inforBox}>
                                                    <Text style={styles.avatar}>
                                                        {personIcon}
                                                    </Text>
                                                </View>
                                                <Text style={styles.name}>
                                                    {item.fullNamePatient}
                                                </Text>
                                            </View>
                                            <View style={styles.patientRight}>
                                                <View style={{ paddingHorizontal: 10 }}>
                                                    <Text style={styles.textInfo}>Số điện thoại: {item.phoneNumberPatient}</Text>
                                                    <Text style={styles.textInfo}>Năm sinh: {item.birthdayPatient}</Text>
                                                    <Text style={styles.textInfo}>Giới tính: {item.genderDataPatient ? item.genderDataPatient.valueVi : ''}</Text>
                                                </View>
                                                <View style={styles.iconDetail}><Text>{detailIcon}</Text></View>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                })

                            }
                        </View>
                    </ScrollView>
                }
            </View>
        </>
    )
}
