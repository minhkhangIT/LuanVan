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
        width: 100,
        backgroundColor: 'orange',
        padding: 6,
        color: '#fff',
        borderRadius: 4,
        marginRight: 6,
        marginBottom: 6,
        textAlign: 'center'
    },

})

export default styles