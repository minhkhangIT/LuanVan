import { Text, View, Image, ImageBackground, TouchableNativeFeedback, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { updateLogin, updateUser } from '../../redux/actions'
import GlobalStyles from '../Styles/GlobalStyles'
import React, { Component } from 'react'
import styles from './HeaderAppStyle'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import logo from '../../../assets/logo.jpg'
import Icon from 'react-native-vector-icons/Ionicons';
const goBackIcon = <Icon name="arrow-back" size={18} color="#FFFFFF" style={styles.icon} />;
const logOutBtn = <Icon name="ios-log-out-outline" size={26} color="#FFFFFF" style={styles.icon} />;
const HeaderApp = ({ goBack, logOut }) => {
  const navigation = useNavigation();
  const routeName = useRoute();
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(updateLogin(false))
    dispatch(updateUser({}))
    navigation.navigate("Login")
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View style={styles.container}>
        <View style={styles.left}>
          {
            goBack !== undefined &&
            <TouchableNativeFeedback onPress={() => navigation.goBack()} style={{ alignItems: 'center' }}>
              {goBackIcon}
            </TouchableNativeFeedback>
          }
          <ImageBackground source={logo} resizeMode="contain" style={styles.logo} />
        </View>

        <View style={styles.right}>
          <TouchableNativeFeedback onPress={() => handleLogOut()}>
            {logOutBtn}
          </TouchableNativeFeedback>
        </View>

      </View>
    </SafeAreaView>

  )
}

export default HeaderApp

