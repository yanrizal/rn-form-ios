/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  useColorScheme,
  Alert,
  ActivityIndicator
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Center, Box, Button, Input, Heading, VStack, FormControl, HStack, Link, Image, Text } from "native-base";
import axios from 'axios';
import avatarIcon from '../assets/images/avatar_default.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = (props) => {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [email, setEmail] = useState('admin@demo.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    retrieveData()
  },[])

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@AppStoreKey');
      console.log('vakue', value)
      if (value !== null) {
        // We have data!!
        const data = JSON.parse(value)
        console.log(data);
        navigation.navigate('Hometab', {
          screen: 'Home',
          params: { id: data.id, dept: data.dept, email: data.email }
        });
        setTimeout(() => {
          setLoading(false)
        },2000)
        
      } else {
        setLoading(false)
      }

    } catch (error) {
      // Error retrieving data
    }
  };

  const handleChangeEmail = (text) => {
    setEmail(text)
  }

  const handleChangePassword = (text) => {
    setPassword(text)
  }

  const storeData = async (data, email) => {
    try {
      const stData = {
        id: data.propID,
        dept: data.dept,
        email
      }
      console.log('store', JSON.stringify(stData))
      await AsyncStorage.setItem('@AppStoreKey',JSON.stringify(stData));
    } catch (error) {
      // Error saving data
    }
  };
  

  const handleSubmit = async () => {
    let valid = true
    if (email === '') {
        Alert.alert('Error', 'email required')
        valid = false
        return
    }
    if (password === '') {
        Alert.alert('Error', 'password required')
        valid = false
        return
    }
    if (valid) {
        // if valid submit to api using axios
        try {
            const API_URL_SERVER = `http://emshotels.net/myapi/login.php?email=${email}&password=${password}`
            const res = await axios.post(API_URL_SERVER)
            console.log(res)
            if (res.data.length === 0) {
              Alert.alert('Error', 'Email atau password salah')
            } else {
              console.log(res.data[0])
              storeData(res.data[0], email)
              navigation.navigate('Hometab', {
                screen: 'Home',
                params: { id: res.data[0].propID, dept: res.data[0].dept, email: email }
              });
            }
        } catch(err) {
            console.log(err)
            Alert.alert('Error', err.message)
        }
    }
  }

  if (loading) {
    return (
      <Box flex="1" bg="white" style={{justifyContent:'center'}}>
      <ActivityIndicator/>
       </Box>
    )
  }

  return (
    <Box flex="1" bg="gray.500">
    <Text color="primary.500" style={{position:'absolute',top:20,left:20}}>EMS</Text>
    <Center w="100%">
    <Box safeArea p="2" pt="40" py="8" w="90%" maxW="290">
        {/* <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading> */}
        <Image size={20} alt="fallback text" borderRadius={100} source={avatarIcon} style={{alignSelf:'center'}} />
        <VStack space={3} mt="6">
          <FormControl>
            <Input 
            autoCapitalize="none"
            placeholder="Email"
            value={email}
            bg="white"
            color="black"
            _focus={{
              bg: "white"
            }}
            onChangeText={handleChangeEmail}/>
          </FormControl>
          <FormControl style={{marginTop:5}}>
            <Input 
            type="password"
            placeholder="Password"
            value={password}
            bg="white"
            color="black"
            _focus={{
              bg: "white"
            }}
            onChangeText={handleChangePassword}/>
            {/* <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link> */}
          </FormControl>
          <Button mt="2" onPress={handleSubmit} 
          >
            Login
          </Button>
          <HStack mt="6" justifyContent="center">
            <Link 
            _text={{
              color: "primary.500",
            fontWeight: "medium",
            fontSize: "sm",
            textDecoration: "none"
          }} href="#">
              Forgot Password
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
    </Box>
  );
}



export default LoginPage;