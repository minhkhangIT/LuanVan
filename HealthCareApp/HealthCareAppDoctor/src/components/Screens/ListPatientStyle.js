import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#49bce2',
        padding: 1,
        paddingHorizontal: 15,
        width: '60%',
        textAlign: 'center',
        position: 'relative'
    },
    clearIcon: {
        position: 'absolute',
        width: 15,
        right: 75
    },
    listPatient: {
        marginVertical: 10
    },
    appointment: {
        overflow: 'hidden',
        backgroundColor: '#4d648d',
        marginBottom: 20,
        marginHorizontal: 10,
        height: 80,
        borderRadius: 6,
        flexDirection: 'row'
    },
    patientLeft: {
        width: '25%',
        backgroundColor: '#426EB4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inforBox: {
        alignItems: 'center'
    },
    avatar: {
        fontSize: 36,
        fontWeight: '700',
        color: '#EDAE01'
    },
    name: {
        color: "#fefefe",
        width: '100%',
        height: 15,
        overflow: 'hidden',
        textAlign: 'center',
        flex:1,
        fontSize:12
    },
    patientRight: {
        width: '75%',
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
    }
})

export default styles