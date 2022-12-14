import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    schedule: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 8,
        height: 36,
        backgroundColor: '#FFFFFF',
        color: '#666',
        width: 240,
        borderRadius: 5,
        textAlign: 'center',
        marginVertical: 5
    },
    login: {
        width: 240,
        borderRadius: 5,
        backgroundColor: '#49bce2',
        alignItems: 'center',
        paddingVertical: 8,
        marginTop: 10,
        textAlign: 'center'
    },
    check: {
        backgroundColor: '#87CEEB',
    },
    waiting: {
        position: 'absolute',
        backgroundColor: '#EEEEEE',
        width: '100%',
        height: '100%',
        zIndex: 999999999,
        opacity: 0.6
    }
})

export default styles