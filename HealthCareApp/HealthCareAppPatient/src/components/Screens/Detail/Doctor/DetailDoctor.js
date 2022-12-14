import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './DetailDoctorStyle'
import HeaderApp from '../../../Header/HeaderApp'
import DoctorInfor from './DoctorInfor';

export default function DetailDoctor({ route }) {
    return (
        <>
            <HeaderApp goBack={true} />
            <View style={styles.container} showsVerticalScrollIndicator={false}>
                {
                    route.params.detailAppointment ?
                        <DoctorInfor
                            doctorId={route.params.doctorId ? route.params.doctorId : ''}
                            isShowExtraInfoDoctor={true} n
                            detailAppointment={route.params.detailAppointment}
                        />
                        :
                        <DoctorInfor doctorId={route.params.doctorId ? route.params.doctorId : ''} isShowExtraInfoDoctor={true} />
                }
            </View>
        </>
    )
}