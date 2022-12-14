import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#F8F8FF',
        flexDirection: 'row',
        height: 100,
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
        padding: 10,
    },
    avatar: {
        height: 80,
        width: 80,
        marginRight: 10,
    },
    content: {
        flex: 1
    },
    name: {
        color: '#49bce2',
        fontSize: 16,
        marginBottom: 5
    },
    timeType: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    iconEdit: {
        marginLeft: 6
    },
    time: {
        fontSize: 11,
    },
    body: {
        padding: 10
    },
    price: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#FF9900',
        padding: 10,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#FF9900'
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#BBBBBB',
        marginVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 4,
        height: 36,
    },
    icon: {
        width: '8%',
    },
    input: {
        padding: 8,
        height: 36,
        width: '92%',
        color: '#666',

    },
    footer: {
        padding: 10,
        width: '100%',
        alignItems: 'center'
    },
    btnBooking: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#3366FF',
        paddingVertical: 6,
        borderRadius: 5,
        color: '#fff',
    },
    checkbox: {
        marginLeft: 7,
    },
    a: {
        position: 'absolute',
        backgroundColor: '#EEEEEE',
        width: '100%',
        height: '100%',
        zIndex: 999999999,
        opacity: 0.3
    }
})

export default styles