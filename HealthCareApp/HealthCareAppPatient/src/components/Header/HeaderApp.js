import { Text, View, Image, ImageBackground, TouchableNativeFeedback, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles from '../Styles/GlobalStyles'
import React, { Component } from 'react'
import styles from './HeaderAppStyle'
import logo from '../../../assets/logo.jpg'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
const goBackIcon = <Icon name="arrow-back" size={18} color="#FFFFFF" style={styles.icon} />;
const ScheduleBtn = <Icon name="md-calendar-sharp" size={26} color="#FFFFFF" style={styles.icon} />;
const logOutBtn = <Icon name="ios-log-out-outline" size={26} color="#FFFFFF" style={styles.icon} />;
const HeaderApp = ({ goBack, logOut }) => {
  const navigation = useNavigation();
  const routeName = useRoute();
  const handleLogOut = () => {
    storeData("")
    if (routeName.name === 'Schedule') {
      navigation.navigate('Login', { goBack: Math.floor(Math.random() * 100) + 1, parent: 'Schedule' })
    } else {
      if (routeName.name === 'History') {
        navigation.navigate('Login', { goBack: Math.floor(Math.random() * 100) + 1, parent: 'History' })
      }
    }

  }

  const handleNavigationCalendar = () => {
    navigation.navigate('Calendar', { patientAccountId: 1 })
  }


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@Login', value)
    } catch (e) {
      console.log("err")
    }
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View style={styles.container}>
        <View style={styles.left}>
          {
            goBack !== undefined &&
            <TouchableNativeFeedback onPress={() => navigation.goBack()}>
              {goBackIcon}
            </TouchableNativeFeedback>
          }

          <TouchableNativeFeedback onPress={() => navigation.navigate('Home')}>
            <ImageBackground source={logo} resizeMode="contain" style={styles.logo} />
          </TouchableNativeFeedback>
        </View>
        {logOut !== undefined &&
          <View style={styles.right}>
            <TouchableNativeFeedback onPress={() => handleNavigationCalendar()}>
              {ScheduleBtn}
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => handleLogOut()}>
              {logOutBtn}
            </TouchableNativeFeedback>
          </View>
        }
      </View>
    </SafeAreaView>

  )
}

export default HeaderApp

