import { Text, View, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import styles from '../Section/sectionStyle'
import { getAllSpecialty } from '../../../services/userService'
import { Refresh } from '../../Screens/Refresh'
import { useNavigation } from '@react-navigation/native';
import img from '../../../../assets/pngtree-medical-logo-png-image_1770394.jpg'


export default function Specialty() {
    const navigation = useNavigation();
    const [listSpecialty, setListSpecialty] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () => {
        setIsLoading(true)
        try {
            let response = await getAllSpecialty('')
            if (response && response.errCode === 0) {
                setListSpecialty(response.data)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };
    useEffect(() => {
        const timer = setTimeout(fetchData, 1000);
        return () => clearTimeout(timer);
    }, [useContext(Refresh)]);

    // useEffect(() => {
    //     fetchData()
    // }, [useContext(Refresh)])

    var Buffer = require('buffer/').Buffer
    return (
        <>
            <View style={[styles.container, styles.odd]}>
                <View style={styles.header}>
                    <Text style={styles.title}>Chuyên khoa phổ biến</Text>
                    <TouchableOpacity style={styles.btnSeeMore}>
                        <Text style={styles.btnSeeMoreTitle} onPress={() => navigation.navigate('Specialty')}>Xem thêm</Text>
                    </TouchableOpacity>
                </View>
                {isLoading === true ?
                    <ActivityIndicator style={styles.body} />
                    :
                    <ScrollView style={styles.body} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {listSpecialty && listSpecialty.length > 0 &&
                            listSpecialty.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                }
                                return (
                                    <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('DetailSpecialty', { id: item.id })} key={item.id}>
                                        <ImageBackground source={imageBase64 !== '' ? { uri: `${imageBase64}` } : img} resizeMode="cover" style={styles.contentImg} />
                                        <Text style={styles.contentTitle}>{item.nameVi}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                }
            </View>
        </>
    )
}
