import { Text, ImageBackground, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { memo } from 'react'
import styles from './NavbarStyle'
import background from '../../../assets/header-background.jpg'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();
    const specialty = <IconFontAwesome5 name="briefcase-medical" size={18} color="#49bce2" />;
    const clinic = <IconFontAwesome name="hospital-o" size={18} color="#49bce2" />;
    const doctor = <IconFontisto name="doctor" size={18} color="#49bce2" />;
    const handbook = <IconFontAwesome5 name="hand-holding-medical" size={18} color="#49bce2" />;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ImageBackground source={background} resizeMode="cover" style={styles.navBar}>
                <View style={styles.navbarDown}>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Specialty')} >
                        <View style={styles.icon}>{specialty}</View>
                        <Text style={styles.title}>Chuyên khoa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Clinic')}>
                        <View style={styles.icon}>{clinic}</View>
                        <Text style={styles.title}>Cơ sở y tế</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Doctor')}>
                        <View style={styles.icon}>{doctor}</View>
                        <Text style={styles.title}>Bác sĩ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('HandBook')}>
                        <View style={styles.icon}>{handbook}</View>
                        <Text style={styles.title}>Cẩm nang</Text>
                    </TouchableOpacity>
                </View>
                <LinearGradient
                    colors={['#ffffff1a', '#fcf6f6e6', '#ffffff']}
                    style={styles.linearGradient}

                >
                </LinearGradient>
            </ImageBackground>

        </KeyboardAvoidingView>
    )
}
export default memo(Navbar)