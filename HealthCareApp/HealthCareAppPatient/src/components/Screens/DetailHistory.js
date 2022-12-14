import { Text, View, ScrollView, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import styles from './DetailHistoryStyle'
import HeaderApp from '../Header/HeaderApp'
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment'
import { handleDeleteBooking } from '../../services/userService'
import { useNavigation } from '@react-navigation/native';
export default function DetailHistory() {
    const route = useRoute();
    const [detailHistory, setDetailHistory] = useState({})

    useEffect(() => {
        setDetailHistory(route.params.detailHistory)
    }, [route.params.detailHistory])
    var dayExamination = ''
    if (detailHistory.DoctorDataBooking) {
        var timesTemp = new Date(+(detailHistory.date));
        dayExamination = timesTemp.getDate() + "/" + (timesTemp.getMonth() + 1) + "/" + timesTemp.getFullYear()
    }

    return (
        <>
            <HeaderApp goBack={true} />
            <View style={[styles.container]}>
                <ScrollView style={styles.scheduleBox} showsVerticalScrollIndicator={false}>
                    <Grid style={styles.schedule}>
                        <Row>
                            <Col>
                                <Text style={styles.title}>SỔ KHÁM BỆNH</Text>
                            </Col>
                        </Row>
                        <View>
                            <Text style={styles.namePatient}>{detailHistory.fullNamePatient ? detailHistory.fullNamePatient : ''}</Text>
                        </View>
                        <View style={styles.boxInfoPatient}>
                            <Text style={styles.infoName}>Giới tính</Text>
                            <Text>: {detailHistory.genderDataPatient ? detailHistory.genderDataPatient.valueVi : ''}</Text>
                        </View>
                        <View style={styles.boxInfoPatient}>
                            <Text style={styles.infoName}>Năm sinh</Text>
                            <Text>: {detailHistory.birthdayPatient ? detailHistory.birthdayPatient : ''}</Text>
                        </View>
                        <View style={[styles.boxInfoPatient, styles.lastChild]}>
                            <Text style={styles.infoName}>Địa chỉ</Text>
                            <Text>: {detailHistory.addressPatient ? detailHistory.addressPatient : ''}</Text>
                        </View>
                        <Row >
                            <Col size={30} style={styles.cell}>
                                <Text style={styles.textLeft}>Nơi khám</Text>
                            </Col>
                            <Col size={70} style={styles.cell}>
                                <Text style={styles.textRight}>{detailHistory.DoctorDataBooking ? detailHistory.DoctorDataBooking.DoctorInfor.nameClinic : ''}</Text>
                            </Col>
                        </Row>

                        <Row >
                            <Col size={30} style={styles.cell}>
                                <Text style={styles.textLeft}>Chuyên khoa</Text>
                            </Col>
                            <Col size={70} style={styles.cell}>
                                <Text style={styles.textRight}>{detailHistory.DoctorDataBooking ? detailHistory.DoctorDataBooking.DoctorInfor.dataSpecialty.nameVi : ''}</Text>
                            </Col>
                        </Row>

                        <Row >
                            <Col size={30} style={styles.cell}>
                                <Text style={styles.textLeft}>Bác sĩ</Text>
                            </Col>
                            <Col size={70} style={styles.cell}>
                                <Text style={styles.textRight}>{detailHistory.DoctorDataBooking ? detailHistory.DoctorDataBooking.lastName + " " + detailHistory.DoctorDataBooking.firstName : ''}</Text>
                            </Col>
                        </Row>
                        <Row >
                            <Col size={30} style={styles.cell}>
                                <Text style={styles.textLeft}>Ngày khám</Text>
                            </Col>
                            <Col size={70} style={styles.cell}>
                                <Text style={styles.textRight}>{dayExamination}</Text>
                            </Col>
                        </Row>
                        <Row >
                            <Col size={30} style={styles.cell}>
                                <Text style={styles.textLeft}>Kết quả</Text>
                            </Col>
                            <Col size={70} style={styles.cell}>
                                <Text style={styles.textRight}>{detailHistory.Prescription ? detailHistory.Prescription.diagnostic : ''}</Text>
                            </Col>
                        </Row>
                        <Row >
                            <Col size={30} style={styles.cell}>
                                <Text style={styles.textLeft}>Đơn thuốc</Text>
                            </Col>
                            <Col size={70} style={styles.cell}>
                                <Text style={styles.textRight}>{detailHistory.Prescription ? detailHistory.Prescription.prescription : ''}</Text>
                            </Col>
                        </Row>
                        <Row >
                            <Col size={30} style={styles.cell}>
                                <Text style={styles.textLeft}>Ngày tái khám</Text>
                            </Col>
                            <Col size={70} style={styles.cell}>
                                <Text style={styles.textRight}>{detailHistory.Prescription ? detailHistory.Prescription.dateReExamination : ''}</Text>
                            </Col>
                        </Row>
                        <Row >
                            <Col size={30} style={styles.cell}>
                                <Text style={styles.textLeft}>Lời khuyên</Text>
                            </Col>
                            <Col size={70} style={styles.cell}>
                                <Text style={styles.textRight}>{detailHistory.Prescription ? detailHistory.Prescription.advice : ''}</Text>
                            </Col>
                        </Row>
                    </Grid>
                </ScrollView>
            </View>
        </>
    )
}
