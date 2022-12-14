import React, { useState, useEffect, createContext } from 'react'
import { Text, View, ScrollView, RefreshControl } from 'react-native'
import styles from './HomeStyle'
import HeaderApp from '../Header/HeaderApp'
import Navbar from '../Header/Navbar'
import Specialty from '../HomePage/Section/Specialty'
import Clinic from '../HomePage/Section/Clinic'
import Doctor from '../HomePage/Section/Doctor'
import HandBook from '../HomePage/Section/HandBook'
import { Refresh } from './Refresh'
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState('');

  const onRefresh = () => {
    setRefreshing(Math.floor(Math.random() * 100) + 1);
  }

  return (
    <Refresh.Provider value={refreshing}>
      <HeaderApp />
      <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
          />
        }>
        <Navbar />
        <View style={styles.container}>
          <Specialty />
          <Clinic />
          <Doctor />
          <HandBook />
        </View>
      </ScrollView>
    </Refresh.Provider>
  )
}
export default Home