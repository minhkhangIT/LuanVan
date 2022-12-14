import { Text, View, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './ScreenStyle'
import HeaderApp from '../Header/HeaderApp'
import { getAllHandBook } from '../../services/userService'
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
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    const onRefresh = () => {
        fetchData()
    }

    var Buffer = require('buffer/').Buffer
    return (
        <>
            <HeaderApp />
            {isLoading === true ?
                <ActivityIndicator style={styles.container} />
                :
                <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {listHandBook && listHandBook.length > 0 &&
                        listHandBook.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            return (
                                <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate("DetailHandBook", { handBookId: item.id })} key={item.id}>
                                    <ImageBackground source={{ uri: `${imageBase64}` }} resizeMode="cover" style={styles.contentImg} />
                                    <Text style={[styles.title]}>{item.nameVi}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            }
        </>
    )
}
