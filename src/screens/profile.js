/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState, useCallback } from 'react';
import {
  useColorScheme,
  Alert,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Center, Box, Button, Input, Heading, VStack, FormControl, Form, HStack, Link, Image, Text } from "native-base";
import axios from 'axios';
import avatarIcon from '../assets/images/avatar_default.jpg'
import { Modal } from "native-base";
import { useNavigation } from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Profile = ({route}) => {
  const navigation = useNavigation();
  const {id, dept, email} = route.params.params
  const isDarkMode = useColorScheme() === 'dark'; 
  const [data,setData] = useState({});
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
 //untuk modal
  const [showModal, setShowModal] = useState(false);
  //--------------------menangani modal-------------------
  const [iduser, setIduser] = useState('')
  const [mail, setEmail] = useState(email)
  const [telp, setTelp] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [date, setDate] = useState(new Date())
  

  const loadData = async () => {
    console.log('load', route)
    try {
      setImageUrl("")
      const API_URL_SERVER = `https://emshotels.net/myapi/readprofile.php?id=${id}&email=${mail}`
      const res = await axios.get(API_URL_SERVER)
      console.log('res',res)
      console.log('res2',res.data[0].photoprofile.trim())
      setData(res.data[0])
      setEmail(res.data[0].email)
      setTelp(res.data[0].Telp)
      setIduser(res.data[0].id)
      setName(res.data[0].nama)
      setImageUrl(res.data[0].photoprofile.trim())
      setDate(new Date())
    } catch(err) {
        console.log(err)
        Alert.alert('Error', err.message)
    }
  }

  useFocusEffect(
    useCallback(() => {
      console.log('focus')
      loadData()
    }, [route])
  );
 

  const handleChangeimage = async () => {
    console.log('id',id)
    const options = {
      mediaType: 'photo'
    }

    // You can also use as a promise without 'callback':
    const result = await launchImageLibrary(options);
    console.log('result image', result)
    let localUri = result.assets[0].uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    console.log({ uri: localUri, name: filename, type }, match[1])
    const formData = new FormData()
    formData.append('id', iduser) 
    formData.append('photoprofile', { uri: localUri, name: `photoprofile.${match[1]}`, type })
    const response = await axios.post('https://emshotels.net/myapi/changephoto.php', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // const response = await axios({
    //   method: "post",
    //   url: "https://emshotels.net/myapi/changephoto.php",
    //   data: data,
    //   headers: { "Content-Type": "multipart/form-data" },
    // })

    console.log('r',response, data)
    if (response.data.status) {
      alert("photo profile updated!")
      loadData()
    } else {
      alert(response.data.status)
    }
  }

  const handleChangeIduser = (text) => {
    setIduser(text)
  }
  const handleChangeEmail = (text) => {
    setEmail(text)
  }

  const handleChangeName = (text) => {
    setName(text)
  }

  const handleChangeTelp = (text) => {
    setTelp(text)
  }

  const handleSubmit = async () => {
    let valid = true
    if (mail === '') {
        Alert.alert('Error', 'email required')
        valid = false
        return
    }
    if (iduser === '') {
      Alert.alert('Error', 'iduser required')
      valid = false
      return
  }
    if (telp === '') {
        Alert.alert('Error', 'Telp required')
        valid = false
        return
    }
    if (valid) {
        // if valid submit to api using axios
        try {
            const data = new FormData() 
            data.append('id', iduser)
            data.append('email', mail)
            data.append('Telp', telp)
            data.append('nama',name)
            setLoading(true)
            const API_URL_SERVER = `https://emshotels.net/myapi/updateprofile.php`
            const res = await axios({
              method: "post",
              url: API_URL_SERVER,
              data: data,
              headers: { "Content-Type": "multipart/form-data" },
            })
            console.log(res)
            
            if (res.data.length === 0) {
              setLoading(false)
              Alert.alert('Error', 'Email atau password salah')
            } else {
              loadData()
              Alert.alert('Success', 'Updated!')
              setShowModal(false)
              setLoading(false)
              
            }
        } catch(err) {
            console.log(err)
            Alert.alert('Error', err.message)
        }
    }
  }

  //----------------------------------------------------------------
  return (
    <Box flex="1" bg="gray.500">
    <Center w="100%">
      
    <Box safeArea p="2" pt="10" py="8" w="90%" maxW="290">
    {imageUrl !== "" &&
        <Image size='lg' borderRadius={100} source={{
      uri: `https://emshotels.net/images/user/profile/${imageUrl}?time=${date}` , cache: "reload"
    }} alt="user image" />
  }

<FormControl>
                    <Button bg="green.400" onPress={handleChangeimage}>Change Image</Button>
                </FormControl>

        <VStack space={3} mt="6" >
        <Text color="muted.50" fontSize="xl">
                          Id User: {data.id}
                        </Text>
                        <Text color="muted.50" fontSize="xl">
                          Company: {data.propName}
                        </Text>
                        <Text color="muted.50" fontSize="xl">
                          Dept: {data.dept}
                        </Text>
                        <Text color="muted.50" fontSize="xl">
                          Name: {data.nama}
                        </Text>
                        <Text  color="muted.50" fontSize="xl">
                          Email: {data.email}
                        </Text>
                        <Text  color="muted.50" fontSize="xl">
                          Mobile: {data.Telp}
                        </Text>
     
            

          <Button onPress={() => setShowModal(true)}>Edit</Button>

     
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit profile</Modal.Header>
          <Modal.Body>
          
          <FormControl>
              <FormControl.Label>ID</FormControl.Label>
              <Input
            value={iduser} onChangeText={handleChangeIduser} defaultValue={data.id} Value={iduser}></Input>
            </FormControl>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
           onChangeText={handleChangeName} defaultValue={data.nama} value={name} ></Input>
            </FormControl>

            
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input onChangeText={handleChangeEmail} defaultValue={data.email} value={mail}/>
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>Mobile</FormControl.Label>
              <Input
            onChangeText={handleChangeTelp} defaultValue={data.Telp} value={telp} ></Input>
            </FormControl>


          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
                Cancel
              </Button>
              {loading ? (
                <Button mt="2"  disabled>
                  Loading...
                </Button>
              ):(
                <Button mt="2" onPress={handleSubmit} >
                  Save
                </Button>
              )}
               
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>


      
        </VStack>
      </Box>
    </Center>
    </Box>
  );
}


export default Profile;