import * as React from 'react';
import { StyleSheet } from 'react-native';
import { MyTabs } from './src/components/Navigation/Navigation';

export default function App() {
  return (
    <>
      <MyTabs />
    </>
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