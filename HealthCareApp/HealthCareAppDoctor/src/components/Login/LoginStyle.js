import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'

const styles = StyleSheet.create({
    bottomView: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: (Dimensions.get('window').height - (Dimensions.get('window').height / 3))
    },
    inputContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: '15%'
    },
    inputBox: {
        width: '80%',
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        borderRadius: 6,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: '90%',
        height: '100%',
        padding: 8
    },
    err: {
        height: 20,
        marginBottom: 30
    },
    login: {
        width: '50%',
        backgroundColor: '#015C92',
        padding: 10,
        borderRadius: 6,
    }

})

export default styles