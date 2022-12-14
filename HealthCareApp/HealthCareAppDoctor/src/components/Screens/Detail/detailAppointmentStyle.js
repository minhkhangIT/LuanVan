import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
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
        paddingVertical: 10
    },
    infoBox: {
        width: "100%",
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        minHeight: 70
    },
    infoBoxLeft: {
        width: '35%',
        flexDirection: 'row',
        alignItems: 'center',

    },
    infoBoxRight: {
        width: '65%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 20,
        paddingLeft: 20,
        paddingVertical: 10
    }

})

export default styles