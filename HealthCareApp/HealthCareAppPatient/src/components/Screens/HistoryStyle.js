import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listSChedule: {
        backgroundColor: '#fff',
    },
    schedule: {
        height: 120,
        backgroundColor: '#66A5Ad',
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'row',
        margin: 10
    },
    left: {
        borderRightWidth: 0.6,
        borderColor: '#C6E2FF',
        flex: 1,
        width: '25%',
        alignItems: 'center',
        padding: 5,
        justifyContent: 'center',
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
        color: '#0000FF'
    },

    right: {
        width: '74%',
        padding: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C4DFE6',
    },
    iconDetail: {
        justifyContent: 'space-between',
        height: '100%',
        right: 15
    },
    appointmentNull: {
        height: 600,
    },
    text: {
        height: 400,
        textAlign: 'center',
        textAlignVertical: 'bottom',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '700',
    }
})

export default styles