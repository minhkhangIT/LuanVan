import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 12,
        backgroundColor: '#F8F8FF',
    },
    introduction: {
        marginBottom: 15
    },
    background: {
        opacity: 1,
        height: '100%',
        width: '100%',
        opacity: 0.2,
        position: 'absolute'
    },
    markDown: {
        height: 150,
        overflow: 'hidden',
        padding: 10,
    },
    seeMoreMarkDown: {
        flex: 1,
        padding: 10,
    },
    listDoctor: {
        padding: 10,
    },
    doctor: {
        marginBottom: 15,
        borderRadius: 8,
        padding: 5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    seeMoreBtn: {
        color: 'blue',
        marginVertical: 8
    },
    btn: {
        padding: 10
    },
    dropDown: {
        marginLeft: 10
    },
    dropdownBtnStyle: {
        width: '26%',
        height: 30,
        backgroundColor: '#FFF',
        borderBottomWidth: 0.2,
        borderColor: 'blue',
    },
    dropdownBtnTxtStyle: {
        textAlign: 'left',
        fontSize: 11,
    },
    dropdownDropdownStyle: {
        marginTop: -50,
    },
    dropdownRowStyle: {
        backgroundColor: '#F8F8FF',
        borderBottomColor: '#C5C5C5',
        height: 32,
    },
    dropdownRowTxtStyle: {
        color: '#444',
        textAlign: 'left',
        fontSize: 11,
    }
})

export default styles