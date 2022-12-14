import { Text, View, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import styles from '../Section/sectionStyle'
import img from '../../../../assets/doctor-icon-png-708262.jpg'
import { getTopDoctorHomeService } from '../../../services/userService'
import { Refresh } from '../../Screens/Refresh'
import { useNavigation } from '@react-navigation/native';

export default function Doctor() {
    const navigation = useNavigation();
    const [listDoctor, setListDoctor] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [refresh, setRefresh] = useState('')
    const fetchData = async (a) => {
        setIsLoading(true)
        try {
            let response = await getTopDoctorHomeService('')
            if (response && response.errCode === 0) {
                setListDoctor(response.data)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        const timer = setTimeout(fetchData, 3000);
        return () => clearTimeout(timer);
    }, [useContext(Refresh)]);


    // useEffect(() => {
    //     fetchData()
    // }, [useContext(Refresh)])

    var Buffer = require('buffer/').Buffer
    return (
        <View style={[styles.container, styles.odd]}>
            <View style={styles.header}>
                <Text style={styles.title}>Bác sĩ nổi bậc</Text>
                <TouchableOpacity style={styles.btnSeeMore}>
                    <Text style={styles.btnSeeMoreTitle} onPress={() => navigation.navigate('Doctor')}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
            {isLoading === true ?
                <ActivityIndicator style={styles.body} />
                :
                <ScrollView style={styles.body} horizontal={true} showsHorizontalScrollIndicator={false}

                >

                    {listDoctor && listDoctor.length > 0 &&
                        listDoctor.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            return (
                                <TouchableOpacity style={[styles.content, styles.contentDoctor]} onPress={() => navigation.navigate('DetailDoctor', { doctorId: item.id })} key={item.id}>
                                    <ImageBackground source={imageBase64 ? { uri: `${imageBase64}` } : img} resizeMode="cover" imageStyle={{ borderRadius: 50 }} style={styles.contentImgDoctor} />
                                    <View style={styles.contentTitle}>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.position}>{item.positionData.valueVi} || {item.DoctorInfor.dataSpecialty.nameVi}</Text>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>{item.lastName} {item.firstName}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            }
        </View>
    )
}
