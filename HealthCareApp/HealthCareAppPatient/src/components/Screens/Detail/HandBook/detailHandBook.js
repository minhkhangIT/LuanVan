import { View, Text, ScrollView, ImageBackground, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './detailHandBookStyle'
import { getDetailHandBookById } from '../../../../services/userService'
import HeaderApp from '../../../Header/HeaderApp'
import Markdown from 'react-native-markdown-text'
import { useNavigation } from '@react-navigation/native';

export default function DetailHandBook({ route }) {
    const navigation = useNavigation();
    const [title, setTitle] = useState('')
    const [detailHandBook, setDetailHandBook] = useState('')
    const [imageBase64, setImageBase64] = useState('null')
    const [isLoading, setIsLoading] = useState(true)
    const getDetailHandBook = async (id) => {
        let response = await getDetailHandBookById(id)
        setIsLoading(false)
        if (response && response.errCode === 0 && response.data) {
            var Buffer = require('buffer/').Buffer
            let img = 'null'
            if (response.data.image) {
                img = Buffer.from(response.data.image, 'base64').toString('binary');
            }
            setDetailHandBook(response.data.descriptionMarkdown)
            setTitle(response.data.nameVi)
            setImageBase64(img)

        } else {
            Alert.alert(
                "Lỗi !",
                "Không thể tải nội dung cẩm nang !",
                [
                    { text: "Quay lại", onPress: () => navigation.goBack() }
                ]
            );
        }
    }
    useEffect(() => {
        setIsLoading(true)
        getDetailHandBook(route.params.handBookId)
    }, [route.params.id])

    const onRefresh = () => {
        setIsLoading(true)
        getDetailHandBook(route.params.handBookId)
    }
    return (
        <>
            <HeaderApp goBack={true} />
            {isLoading === true ?
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
                        <Text style={styles.title}>{title}</Text>
                        <ImageBackground source={{ uri: `${imageBase64}` }} resizeMode="cover" style={styles.contentImg} />
                    </View>
                    <View style={styles.introduction}>
                        <Markdown>
                            {detailHandBook}
                        </Markdown>
                    </View>
                </ScrollView>
            }
        </>
    )
}