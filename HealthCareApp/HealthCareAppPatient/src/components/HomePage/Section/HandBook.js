import { Text, View, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import styles from '../Section/sectionStyle'
import { getAllHandBook } from '../../../services/userService'
import { Refresh } from '../../Screens/Refresh'
import { useNavigation } from '@react-navigation/native';

export default function HandBook() {
    const navigation = useNavigation();
    const [listHandBook, setListHandBook] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () => {
        setIsLoading(true)
        try {
            let response = await getAllHandBook()
            if (response && response.errCode === 0) {
                setListHandBook(response.data)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };
    useEffect(() => {
        const timer = setTimeout(fetchData, 4000);
        return () => clearTimeout(timer);
    }, [useContext(Refresh)]);

    // useEffect(() => {
    //     fetchData()
    // }, [useContext(Refresh)])

    var Buffer = require('buffer/').Buffer
    return (
        <View style={[styles.container, styles.containerHandBook]}>
            <View style={styles.header}>
                <Text style={styles.title}>Cẩm nang</Text>
                <TouchableOpacity style={styles.btnSeeMore} onPress={() => navigation.navigate('HandBook')}>
                    <Text style={styles.btnSeeMoreTitle}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
            {isLoading === true ?
                <ActivityIndicator style={styles.body} />
                :
                <ScrollView style={[styles.body]} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {listHandBook && listHandBook.length > 0 &&
                        listHandBook.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            return (
                                <TouchableOpacity style={[styles.content, styles.contentHandBook]} onPress={() => navigation.navigate("DetailHandBook", { handBookId: item.id })} key={item.id}>
                                    <ImageBackground source={{ uri: `${imageBase64}` }} resizeMode="cover" imageStyle={{ borderRadius: 6 }} style={styles.contentImg} />
                                    <Text style={styles.contentTitle}>{item.nameVi}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            }
        </View>
    )
}
