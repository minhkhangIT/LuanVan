import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    containerDoctor: {
        flexDirection: 'row',
    },
    isLoading: {
        height: 600,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    avatar: {
        height: 80,
        width: 80,
        marginRight: 10,
    },
    content: {
        flex: 1,
        flexDirection: 'column'
    },
    name: {
        color: '#444444',
        fontWeight: '600',
        flex: 1
    },
    inf: {
        fontSize: 12,
        marginVertical: 10
    },

    containerSchedule: {
        marginVertical: 13,
    },
    dropdownBtnStyle: {
        maxWidth: '32%',
        height: 20,
        backgroundColor: '#FFF',
        borderBottomWidth: 0.2,
        borderColor: 'blue',
    },
    dropdownBtnTxtStyle: {
        textAlign: 'left',
        fontSize: 11,
        color: 'blue'
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
        color: 'blue',

    },
    schedule: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    emptySchedule: {
        marginTop: 4,
        color: 'red',
    },
    calendarContainer: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap'
    },
    calendar: {
        backgroundColor: '#FFD700',
        width: '22%',
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    calendarLabel: {
        textAlign: 'center',
        fontSize: 11,
        fontWeight: '500'
    },
    bookFree: {
        fontSize: 9,
        marginLeft: 10
    },
    infoClinic: {
        marginTop: 15,
    },
    address: {
        fontSize: 12,
    },
    price: {
        marginTop: 15,
        flexDirection: 'row'
    },
    money: {
        color: 'red',
        marginHorizontal: 5,
    },
    showDetail: {
        marginLeft: 15,
        color: '#009ACD'
    },
    isShowDetail: {
        flexDirection: 'column'
    },
    hideDetail: {
        color: '#009ACD'
    },
    detailPriceBox: {
        marginVertical: 11,
        borderWidth: 0.2,
        borderColor: '#E8E8E8'
    },
    detailPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F8F8FF',
        padding: 5
    },
    detailPayment: {
        backgroundColor: '#E0EEEE',
        padding: 5
    },
    extraInfoDoctor: {
        borderTopColor: '#333',
        borderTopWidth: 1,
        paddingBottom: 10
    }
})

export default styles