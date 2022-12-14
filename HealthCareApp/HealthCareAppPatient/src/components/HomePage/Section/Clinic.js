import { Text, View, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import styles from '../Section/sectionStyle'
import { getAllClinic } from '../../../services/userService'
import { Refresh } from '../../Screens/Refresh'
import { useNavigation } from '@react-navigation/native';

export default function Clinic() {
    const navigation = useNavigation();
    const [listClinic, setListClinic] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const fetchData = async () => {
        setIsLoading(true)
        try {
            let response = await getAllClinic('')
            if (response && response.errCode === 0) {
                setListClinic(response.data)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        const timer = setTimeout(fetchData, 2000);
        return () => clearTimeout(timer);
    }, [useContext(Refresh)]);

    // useEffect(() => {
    //     fetchData()
    // }, [useContext(Refresh)])

    var Buffer = require('buffer/').Buffer

    return (
        <View style={[styles.container]}>
            <View style={styles.header}>
                <Text style={styles.title}>Cơ sở y tế nổi bậc</Text>
                <TouchableOpacity style={styles.btnSeeMore}>
                    <Text style={styles.btnSeeMoreTitle} onPress={() => navigation.navigate('Clinic')}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
            {isLoading === true ?
                <ActivityIndicator style={styles.body} />
                :
                <ScrollView style={styles.body} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {listClinic && listClinic.length > 0 &&
                        listClinic.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            return (
                                <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('DetailClinic', { id: item.id })} key={item.id}>
                                    <ImageBackground source={{ uri: `${imageBase64}` }} resizeMode="cover" style={styles.contentImg} />
                                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.contentTitle}>{item.nameVi}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            }
        </View>
    )
}
