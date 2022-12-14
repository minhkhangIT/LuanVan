import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        zIndex: 9999,
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#dddddd',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#00B2BF'
    },
    left: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        flex: 7,
    },
    right: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 5
    },
    icon: {
        paddingRight: 20,
    },
    logo: {
        height: '100%',
        width: 170,
    }
})

export default styles