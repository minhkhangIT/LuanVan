import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    activityIndicator: {
        position: "absolute",
        backgroundColor: '#fefefe',
        width: '100%',
        height: '100%',
        opacity: 0.8,
        zIndex: 1,
    },
    title: {
        textAlign: 'center',
        padding: 15,
        fontSize: 20,
        textTransform: 'uppercase',
        color: '#fff',
        fontWeight: '700'
    },
    body: {
        backgroundColor: '#F8F8F8',
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10
    },
    titleInput: {
        fontWeight: '600'
    },
    input: {
        borderWidth: 1.5,
        borderColor: 'blue',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 25
    }


})

export default styles