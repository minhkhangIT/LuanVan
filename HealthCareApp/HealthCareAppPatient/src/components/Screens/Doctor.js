import { Text, View, TouchableOpacity, ScrollView, TextInput, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './ScreenStyle'
import HeaderApp from '../Header/HeaderApp'
import img from '../../../assets/120331-co-xuong-khop.jpg'
import { getTopDoctorHomeService } from '../../services/userService'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const searchIcon = <IconFontAwesome5 name="search" size={13} color="#000000" />;
const clearIcon = <Ionicons name="close" size={13} color="#000000" />;
export default function Doctor() {
    const navigation = useNavigation();
    const [listDoctor, setListDoctor] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')

    const fetchData = async (by) => {
        setIsLoading(true)
        try {
            let response = await getTopDoctorHomeService(by)
            if (response && response.errCode === 0) {
                setListDoctor(response.data)
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
                        placeholder="Tìm bác sĩ"
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
                    {listDoctor && listDoctor.length > 0 &&
                        listDoctor.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            return (
                                <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate('DetailDoctor', { doctorId: item.id })} key={item.id}>
                                    <ImageBackground source={imageBase64 ? { uri: `${imageBase64}` } : img} resizeMode="cover" style={styles.contentImg} />
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
        </>
    )
}
