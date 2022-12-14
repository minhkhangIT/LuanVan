import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        backgroundColor: '#F8F8FF',
        flexDirection: 'row',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
        alignItems: 'center'
    },
    contentImg: {
        marginHorizontal: 10,
        height: 60,
        width: 100
    },
    title: {
        color: '#333',
        fontSize: 13,
        flex: 1
    },
    containerSearch: {
        alignItems: 'center',
    },
    searchBox: {
        marginVertical: 10,
        height: 35,
        width: 290,
        marginHorizontal: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7d800',
        borderRadius: 15,
        padding: 10,
        opacity: 1
    },
    searchIcon: {
        width: 15,
    },
    clearIcon: {
        width: 15,
    },
    input: {
        paddingHorizontal: 10,
        height: 35,
        width: 245,
        borderWidth: 0,
        alignItems: 'center'
    },


})

export default styles