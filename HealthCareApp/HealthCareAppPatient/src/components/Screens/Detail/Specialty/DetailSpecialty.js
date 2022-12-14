import { View, Text, ScrollView, ImageBackground, ActivityIndicator, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './DetailSpecialtyStyle'
import SelectDropdown from 'react-native-select-dropdown'
import HeaderApp from '../../../Header/HeaderApp'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Markdown from 'react-native-markdown-text'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DoctorInfor from '../Doctor/DoctorInfor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../../services/userService'
import { useNavigation } from '@react-navigation/native';
import img from '../../../../../assets/pngtree-medical-logo-png-image_1770394.jpg'
import { useRoute } from '@react-navigation/native';
export default function DetailSpecialty({ route }) {
    const routeName = useRoute();
    const navigation = useNavigation();
    const [seeMore, setSeeMore] = useState(false)
    const [detailSpecialty, setDetailSpecialty] = useState({})
    const [id, setId] = useState(route.params.id ? route.params.id : '')
    const [isLoading, setIsLoading] = useState(true)
    const [dataSelectProvince, setDataSelectProvince] = useState([])
    const [province, setProvince] = useState([])
    const [provinceId, setProvinceId] = useState('ALL')

    const getDetailSpecialty = async (id, location) => {
        try {
            const response = await getDetailSpecialtyById({ id: id, location: location })
            if (response && response.errCode === 0) {
                setDetailSpecialty(response.data)
                setIsLoading(false)
            }
            else {
                Alert.alert(
                    "Lỗi !",
                    "Không thể tải thông tin chuyên khoa !",
                    [
                        { text: "Quay lại", onPress: () => navigation.goBack() }
                    ]
                );
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getProvince = async () => {
        try {
            setIsLoading(true)
            let arrProvince = ['Tất cả'];
            let resProvince = await getAllCodeService('PROVINCE')
            if (resProvince && resProvince.errCode === 0) {
                resProvince.data.forEach(data => {
                    arrProvince.push(data.valueVi)
                });
                setProvince(resProvince.data)
                setDataSelectProvince(arrProvince)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        getProvince()
        getDetailSpecialty(id, 'ALL')
    }, [id])

    const handleOnchangeSelectDropDown = async (index) => {
        setIsLoading(true)
        if (index === 0) {
            getDetailSpecialty(id, 'ALL')
            setProvinceId('ALL')
        } else {
            let location = province[index - 1].id
            setProvinceId(location)
            getDetailSpecialty(id, location)
        }
    }

    var Buffer = require('buffer/').Buffer
    let imageBase64 = '';
    if (detailSpecialty.image) {
        imageBase64 = Buffer.from(detailSpecialty.image, 'base64').toString('binary');
    }

    const onRefresh = () => {
        setIsLoading(true)
        getDetailSpecialty(id, provinceId)
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
                    <View style={styles.introduction}>
                        <ImageBackground source={imageBase64 !== '' ? { uri: `${imageBase64}` } : img} resizeMode="cover" style={styles.background}></ImageBackground>
                        <View style={seeMore === false ? [styles.markDown] : [styles.seeMoreMarkDown]}>
                            <Markdown>
                                {detailSpecialty.descriptionMarkdown}
                            </Markdown>
                        </View>
                        {seeMore === false ?
                            <View style={styles.btn}>
                                <Text>...</Text>
                                <TouchableOpacity onPress={() => setSeeMore(true)}><Text style={styles.seeMoreBtn}>Xem thêm</Text></TouchableOpacity>
                            </View>
                            :
                            <View style={styles.btn}>
                                <TouchableOpacity onPress={() => setSeeMore(false)}><Text style={styles.seeMoreBtn}>Ẩn bớt</Text></TouchableOpacity>
                            </View>
                        }
                    </View>

                    <View style={styles.dropDown}>
                        <SelectDropdown
                            data={dataSelectProvince}
                            onSelect={(selectedItem, index) => {
                                handleOnchangeSelectDropDown(index)
                            }}
                            defaultButtonText={'Tất cả'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={styles.dropdownBtnStyle}
                            buttonTextStyle={styles.dropdownBtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'blue'} size={9} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdownDropdownStyle}
                            rowStyle={styles.dropdownRowStyle}
                            rowTextStyle={styles.dropdownRowTxtStyle}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <View style={styles.listDoctor}>
                        {detailSpecialty.doctorSpecialty && detailSpecialty.doctorSpecialty.length > 0 &&
                            detailSpecialty.doctorSpecialty.map((item, index) => {
                                return (
                                    <View style={styles.doctor} key={item.doctorId}>
                                        <DoctorInfor doctorId={item.doctorId} />
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            }
        </>
    )
}