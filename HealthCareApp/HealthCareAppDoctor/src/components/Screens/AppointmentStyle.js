import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    calendarBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 3,
        borderBottomWidth: 1,
        width: '60%',
    },
    listAppointment: {
        marginVertical: 10
    },
    appointment: {
        overflow: 'hidden',
        backgroundColor: '#4d648d',
        marginBottom: 20,
        marginHorizontal: 10,
        height: 120,
        borderRadius: 6,
        flexDirection: 'row'
    },
    appointmentLeft: {
        width: '35%',
        backgroundColor: '#426EB4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    appointmentLeftErr: {
        width: '35%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateBox: {
        alignItems: 'center',
        marginBottom: 15
    },
    date: {
        fontSize: 36,
        fontWeight: '700',
        color: '#EDAE01'
    },
    month: {
        fontSize: 13,
        fontWeight: '600',
        color: '#EDAE01'
    },
    time: {
        color: '#fff'
    },
    appointmentRight: {
        width: '65%',
        backgroundColor: '#f1f1f2',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconDetail: {
        justifyContent: 'space-between',
        height: '100%'
    },
    textInfo: {
        color: '#4d648d'
    },
    textAppointmentNull: {
        color: 'red',
        height: 400,
        textAlign: 'center',
        textAlignVertical: 'bottom',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '700',
    }
})

export default styles