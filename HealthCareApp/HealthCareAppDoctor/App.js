import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { MyTabs } from './src/components/Navigation/Navigation';
import store from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <MyTabs />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});