import { View, Text, ScrollView, ImageBackground, ActivityIndicator, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './DetailClinicStyle'
import HeaderApp from '../../../Header/HeaderApp'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Markdown from 'react-native-markdown-text'
import DoctorInfor from '../Doctor/DoctorInfor';
import { getDetailClinicById } from '../../../../services/userService'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
export default function DetailClinic({ route }) {
    const routeName = useRoute();
    const navigation = useNavigation();
    const [detailClinic, setDetailClinic] = useState({})
    const [id, setId] = useState(route.params.id ? route.params.id : '')
    const [isLoading, setIsLoading] = useState(true)

    const getDetailClinic = async (id) => {
        try {
            const response = await getDetailClinicById(id)
            setIsLoading(false)
            if (response && response.errCode === 0) {
                setDetailClinic(response.data)
            } else {
                Alert.alert(
                    "Lỗi !",
                    "Không thể tải thông tin phòng khám !",
                    [
                        { text: "Quay lại", onPress: () => navigation.goBack() }
                    ]
                );
            }

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }

    useEffect(() => {
        setIsLoading(true)
        getDetailClinic(id)
    }, [id])

    const onRefresh = () => {
        setIsLoading(true)
        getDetailClinic(id)
    }

    var Buffer = require('buffer/').Buffer
    let imageBase64 = 'null';
    if (detailClinic.image) {
        imageBase64 = Buffer.from(detailClinic.image, 'base64').toString('binary');
    }

    return (
        <>
            <HeaderApp goBack={true} />
            {isLoading ?
                <View style={{ backgroundColor: '#fff', flex: 12 }}>
                    <ActivityIndicator style={styles.container} />
                </View>
                :
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.header}>
                        <View style={styles.avatar}>
                            <ImageBackground source={{ uri: `${imageBase64}` }} resizeMode="cover" style={styles.avatar}></ImageBackground>
                        </View>
                        <View style={styles.nameClinic}>
                            <Text style={styles.nameClinicText}>{detailClinic.nameVi}</Text>
                            <Text style={styles.address}><FontAwesome5 name={'map-marker-alt'} color={'black'} size={13}></FontAwesome5> {detailClinic.address}</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        {detailClinic.doctorClinic && detailClinic.doctorClinic.length > 0 &&
                            detailClinic.doctorClinic.map((item, index) => {
                                return (
                                    <View style={styles.doctorBox} key={item.doctorId}>
                                        <DoctorInfor doctorId={item.doctorId} />
                                    </View>
                                )
                            })
                        }
                    </View>

                    <View style={styles.introduction}>
                        <Markdown>
                            {detailClinic.descriptionMarkdown}
                        </Markdown>
                    </View>
                </ScrollView>
            }
        </>
    )
}