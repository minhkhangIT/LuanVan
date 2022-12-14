import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scheduleBox: {
        width: '100%',
        height: '100%',
    },
    schedule: {
        width: '100%',
        padding: 10,
    },
    cell: {
        borderWidth: 0.2,
        alignItems: 'center',
        borderColor: '#898989',
        backgroundColor: '#A1D6E2',
        borderColor:'#333'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#49bce2',
        paddingVertical: 20,
        textAlign: 'center'
    },
    textLeft: {
        textAlign: 'right',
        width: '100%',
        paddingRight: 15,
        fontSize: 13,
        fontWeight: '400',
        paddingVertical: 5,
        alignItems:'center',
        color:'red'
    },
    textRight: {
        textAlign: 'left',
        width: '100%',
        paddingLeft: 15,
        fontSize: 13,
        fontWeight: '400',
        paddingVertical: 5,
        backgroundColor: '#F1F1F2'
    },
    btnCancel: {
        alignItems: 'center',
        backgroundColor: '#49bce2',
        marginHorizontal: 10,
        borderRadius: 6,
        paddingVertical: 10,
        marginTop: 20
    },
    textBtn: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    }
})

export default styles