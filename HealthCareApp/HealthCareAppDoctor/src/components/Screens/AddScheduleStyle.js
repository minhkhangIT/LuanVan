import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    toggleBtnBox: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 3,
        borderWidth: 1.5,
        borderColor: '#4d648d',
        width: '60%',
        backgroundColor: '#fcfdfe',
        borderRadius: 4
    },
    timeItem: {
        width: 110,
        backgroundColor: '#D1EEEE',
        color: '#fff',
        borderRadius: 4,
        marginRight: 6,
        marginBottom: 6,
        textAlign: 'center'
    },
    timeItemSelected: {
        width: 110,
        backgroundColor: 'orange',
        color: '#fff',
        borderRadius: 4,
        marginRight: 6,
        marginBottom: 6,
        textAlign: 'center'
    },
    timeBox: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        color: '#4d648d',
        textAlign: 'center',
        color: "red"
    }

})

export default styles