/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { NativeBaseProvider, extendTheme } from "native-base";
import axios from 'axios';
import RootNavigator from './src/routes/RootNavigator';
// import FormExample from './src/screens/form';

function App(){
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#01a659",
        100: "#01a659",
        200: "#01a659",
        300: "#01a659",
        400: "#01a659",
        500: "#01a659",
        600: "#01a659",
        700: "#01a659",
        800: "#01a659",
        900: "#01a659",
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: "#d97706",
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "dark",
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <RootNavigator/>
    </NativeBaseProvider>
  );
}



export default App;
