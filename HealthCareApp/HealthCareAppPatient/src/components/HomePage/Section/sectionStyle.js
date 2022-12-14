import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        height: 200,
        backgroundColor: '#F8F8FF'
    },
    odd: {
        backgroundColor: '#F5F5F5'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 0.25,
    },
    title: {
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 11,
        color: 'red'
    },
    btnSeeMore: {
        backgroundColor: '#f7d800',
        padding: 5,
        marginRight: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSeeMoreTitle: {
        color: '#444444',
        fontSize: 12
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    content: {
        flex: 0.9,
        width: 170,
        marginRight: 10
    },

    contentImg: {
        flex: 2,
    },
    contentTitle: {
        flex: 1,
        marginTop: 8,
        height: '100%',
        fontSize: 12
    },
    position: {
        fontSize: 11,
        fontWeight: '400',
        textAlign: 'center',
        overflow: 'hidden',
        height: 20
    },
    name: {
        fontSize: 11,
        fontWeight: '400',
        textAlign: 'center',
        height: 20
    },
    contentDoctor: {
        borderWidth: 1,
        borderColor: '#C6E2FF',
        width: 130,
        alignItems: 'center',
        marginBottom: 10
    },
    contentImgDoctor: {
        marginTop: 5,
        flex: 2,
        width: 90,
        height: 90,
        borderRadius: 90
    },
    containerHandBook: {
        height: 300,
    },
    contentHandBook: {
        flex: 0.9,
        width: 200,
    },
    titleVideo: {
        justifyContent: 'center',
        height: 40,
    },
    containerVideo: {
        height: 300,
    },
    contentVideo: {
        marginHorizontal: 10,
    },
})

export default styles