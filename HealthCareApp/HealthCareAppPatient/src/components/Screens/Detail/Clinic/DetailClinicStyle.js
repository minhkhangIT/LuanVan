import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 12,
        backgroundColor: '#F8F8FF',
    },
    header: {
        borderBottomWidth: 1,
        borderColor: '#CFCFCF',
        marginBottom: 10
    },
    avatar: {
        height: 200
    },
    background: {
        opacity: 1,
        height: '100%',
        width: '100%',
        opacity: 0.2,
        position: 'absolute'
    },
    nameClinic: {
        paddingVertical: 15,
    },
    nameClinicText: {
        fontWeight: '800',
        width: '100%',
        textAlign: 'center',
        fontSize: 18
    },
    address: {
        paddingTop: 10,
        textAlign: 'center',
    },
    body: {
        paddingHorizontal: 10,
        borderColor: '#CFCFCF'
    },
    doctorBox: {
        marginBottom: 15,
        borderRadius: 8,
        padding: 5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    introduction: {
        paddingHorizontal: 10
    }
})

export default styles