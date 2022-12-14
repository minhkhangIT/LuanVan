import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        height: 350,
        width: '100%',
        backgroundColor: 'blue'
    },
    navBar: {
        flex: 4,
    },
    navbarDown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        flex: 9,
        alignItems: 'flex-end',

    },

    item: {
        alignItems: 'center',
    },

    icon: {
        borderRadius: 33,
        height: 33,
        width: 33,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        opacity: 1,
        backgroundColor: "rgb(225, 66, 66)"
    },
    title: {
        fontSize: 11,
        fontWeight: "bold",
        textAlign: 'center'
    },
    linearGradient: {
        flex: 3,
        opacity: 1
    },
})

export default styles