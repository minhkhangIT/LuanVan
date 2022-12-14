import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
export default StyleSheet.create({
    droidSafeArea: {
        marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
});