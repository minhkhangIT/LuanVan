import { Text, View, ScrollView, TouchableOpacity, Alert, ActivityIndicator, ToastAndroid, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import styles from './DetailScheduleStyle'
import HeaderApp from '../Header/HeaderApp'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { handleDeleteBooking } from '../../services/userService'
import { useNavigation } from '@react-navigation/native';
import { getDetailAppointmentService } from '../../services/userService'
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
export default function DetailSchedule() {
    const routeName = useRoute();
    const [detailAppointment, setDetailAppointment] = useState({})
    const [appointmentId, setAppointmentId] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    let dateBooking = new Date(+(detailAppointment.date ? detailAppointment.date : new Date()))
    const navigation = useNavigation();

    const Toast = (message) => {
        ToastAndroid.show(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
        );
    };
    const getDetailAppointment = async (id) => {
        setIsLoading(true)
        try {
            let res = await getDetailAppointmentService(id)
            if (res && res.errCode === 0) {
                if (res.data !== detailAppointment) {
                    setDetailAppointment(res.data)
                }
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getDetailAppointment(appointmentId)
        }, [routeName])
    )

    useEffect(() => {
        setAppointmentId(routeName.params.appointment)
        getDetailAppointment(routeName.params.appointment)
    }, [routeName])

    const handleDeleteAppointment = async (id) => {
        let res = await handleDeleteBooking(id)
        if (res && res.errCode === 0) {
            Toast("H???y l???ch h???n th??nh c??ng!")
            navigation.navigate('Schedule')
        } else {
            Toast("H???y l???ch h???n th???t b???i!")
        }
    }
    const handleEditAppointment = (detailAppointment) => {
        navigation.navigate('Booking', { detailAppointment: detailAppointment })
    }
    const onRefresh = () => {
        getDetailAppointment(appointmentId)
    }
    return (
        <>
            <HeaderApp goBack={true} />
            <View style={[styles.container]}>
                {isLoading === true ?
                    <View style={styles.container} >
                        <ActivityIndicator />
                    </View>
                    :
                    <ScrollView style={styles.scheduleBox} showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <Grid style={styles.schedule}>
                            <Row>
                                <Col>
                                    <Text style={styles.title}>PHI???U KH??M B???NH</Text>
                                </Col>
                            </Row>
                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>M?? phi???u</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{detailAppointment.id}</Text>
                                </Col>
                            </Row>

                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>B??nh vi???n</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{(detailAppointment.DoctorDataBooking && detailAppointment.DoctorDataBooking.DoctorInfor) ? detailAppointment.DoctorDataBooking.DoctorInfor.nameClinic : ''}</Text>
                                </Col>
                            </Row>

                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>Chuy??n khoa</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{(detailAppointment.DoctorDataBooking && detailAppointment.DoctorDataBooking.DoctorInfor) ? detailAppointment.DoctorDataBooking.DoctorInfor.dataSpecialty.nameVi : ''}</Text>
                                </Col>
                            </Row>


                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>B??c s??</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{detailAppointment.DoctorDataBooking ? detailAppointment.DoctorDataBooking.lastName : ''} {detailAppointment.DoctorDataBooking ? detailAppointment.DoctorDataBooking.firstName : ''}</Text>
                                </Col>
                            </Row>

                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>Gi??? kh??m</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{detailAppointment.timeTypeDataBooking ? detailAppointment.timeTypeDataBooking.valueVi : ''}</Text>
                                </Col>
                            </Row>

                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>Ng??y kh??m</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{dateBooking.getDate()}/{dateBooking.getMonth() + 1}/{dateBooking.getFullYear()}</Text>
                                </Col>
                            </Row>

                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>?????a ch??? kh??m</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{(detailAppointment.DoctorDataBooking && detailAppointment.DoctorDataBooking.DoctorInfor) ? detailAppointment.DoctorDataBooking.DoctorInfor.addressClinic : ''}</Text>
                                </Col>
                            </Row>

                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>B???nh nh??n</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{detailAppointment.fullNamePatient && detailAppointment.fullNamePatient}</Text>
                                </Col>
                            </Row>

                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>Ng??y sinh</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{detailAppointment.birthdayPatient && detailAppointment.birthdayPatient}</Text>
                                </Col>
                            </Row>

                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>Gi???i t??nh</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{detailAppointment.genderDataPatient && detailAppointment.genderDataPatient.valueVi}</Text>
                                </Col>
                            </Row>

                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>?????a ch???</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{detailAppointment.addressPatient && detailAppointment.addressPatient}</Text>
                                </Col>
                            </Row>

                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>??i???n tho???i</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{detailAppointment.phoneNumberPatient && detailAppointment.phoneNumberPatient}</Text>
                                </Col>
                            </Row>
                            <Row >
                                <Col size={25} style={styles.cell}>
                                    <Text style={styles.textLeft}>L?? do kh??m</Text>
                                </Col>
                                <Col size={75} style={styles.cell}>
                                    <Text style={styles.textRight}>{detailAppointment.reason && detailAppointment.reason}</Text>
                                </Col>
                            </Row>
                        </Grid>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => handleDeleteAppointment(detailAppointment.id)}>
                            <Text style={styles.textBtn}>H???Y L???CH H???N</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => handleEditAppointment(detailAppointment)}>
                            <Text style={styles.textBtn}>THAY ?????I TH??NG TIN</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
            </View>
        </>
    )
}
