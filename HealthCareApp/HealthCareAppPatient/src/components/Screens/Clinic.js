import { View, Text, TouchableOpacity, ScrollView, TextInput, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './ScreenStyle'
import HeaderApp from '../Header/HeaderApp'
import { getAllClinic } from '../../services/userService'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
const searchIcon = <IconFontAwesome5 name="search" size={13} color="#000000" />;
const clearIcon = <Ionicons name="close" size={13} color="#000000" />;
import { useNavigation } from '@react-navigation/native';

export default function Clinic() {
    const navigation = useNavigation();
    const [listClinic, setListClinic] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')

    const fetchData = async (by) => {
        setIsLoading(true)
        try {
            let response = await getAllClinic(by)
            setIsLoading(false)
            if (response && response.errCode === 0) {
                setListClinic(response.data)
            }
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
                        placeholder="Tìm cơ sở y tế"
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
                    {listClinic && listClinic.length > 0 &&
                        listClinic.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            return (
                                <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate("DetailClinic", { id: item.id })} key={item.id}>
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
