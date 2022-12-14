import { Text, View, TouchableOpacity, ScrollView, TextInput, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './ScreenStyle'
import HeaderApp from '../Header/HeaderApp'
import { getAllSpecialty } from '../../services/userService'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import img from '../../../assets/pngtree-medical-logo-png-image_1770394.jpg'
const clearIcon = <Ionicons name="close" size={13} color="#000000" />;
const searchIcon = <IconFontAwesome5 name="search" size={13} color="#000000" />;


export default function Specialty() {
    const navigation = useNavigation();
    const [listSpecialty, setListSpecialty] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')

    const fetchData = async (by) => {
        setIsLoading(true)
        try {
            let response = await getAllSpecialty(by)
            if (response && response.errCode === 0) {
                setListSpecialty(response.data)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    };

    const onRefresh = () => {
        fetchData(search)
    }

    useEffect(() => {
        fetchData(search)
    }, [search])

    var Buffer = require('buffer/').Buffer
    return (
        <>
            <HeaderApp />
            <View style={styles.containerSearch}>
                <View style={styles.searchBox} >
                    <View style={styles.searchIcon}>{searchIcon}</View>
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm chuyên khoa"
                        value={search}
                        onChangeText={setSearch}
                    />
                    {search !== '' &&
                        <TouchableOpacity style={styles.clearIcon} onPress={() => setSearch('')}>{clearIcon}</TouchableOpacity>
                    }
                </View>
            </View>
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
                    {listSpecialty && listSpecialty.length > 0 &&
                        listSpecialty.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            return (
                                <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate("DetailSpecialty", { id: item.id })} key={item.id}>
                                    <ImageBackground source={imageBase64 !== '' ? { uri: `${imageBase64}` } : img} resizeMode="cover" style={styles.contentImg} />
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
