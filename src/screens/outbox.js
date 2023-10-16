/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  Alert
} from 'react-native';
import { VStack, Skeleton, Avatar,Button, FormControl,Input,Pressable, Box, Spacer, Stack, HStack, Badge, Image, Text } from 'native-base';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { Modal } from "native-base";

const Outbox = ({route}) => {
  const {id, dept} = route
  console.log('route',id, dept)
  const [loading, setLoading] = useState(true)
  const [data,setData] = useState([]);
  const [job, setJob] = useState('');
  const [lokasi, setLokasi] = useState('')
  const [woId, setWoId] = useState('')


  const loadData = async () => {
    try {
      const API_URL_SERVER = `https://emshotels.net/myapi/wout.php?id=${id}&dept=${dept}`
      const res = await axios.get(API_URL_SERVER)
      console.log('res',res)
      setData(res.data)
      setLoading(false)
    } catch(err) {
        console.log(err)
        Alert.alert('Error', err)
    }
  }
//membuat fungsi onPress disini
 //untuk modal
 const [showModal, setShowModal] = useState(false);
  useFocusEffect(
    useCallback(() => {
      console.log('focus')
      loadData()
    }, [route])
  );

  const handleJob = (text) => {
    setJob(text)
  }
  const handlelokasi = (text) => {
    setLokasi(text)
  }

  const handleSubmit = async () => {
    let valid = true
    if (job === '') {
        Alert.alert('Error', 'job required')
        valid = false
        return
    }
  }

    // {
    //   id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    //   fullName: "Aafreen Khan",
    //   timeStamp: "12:47 PM",
    //   recentText: "Good Day!",
    //   avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    // },{
    //   id: "58694a0f-3da1-471f-bd96-145571e29d72",
    //   fullName: "Anci Barroco",
    //   timeStamp: "6:22 PM",
    //   recentText: "Good Day!",
    //   avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    // }, {
    //   id: "68694a0f-3da1-431f-bd56-142371e29d72",
    //   fullName: "Aniket Kumar",
    //   timeStamp: "8:56 PM",
    //   recentText: "All the best",
    //   avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
    // }

    const handleOpenModal = (id, job, loc) => {
        setShowModal(true)
        setJob(job)
        setLokasi(loc)
        setWoId(id)
    }
    const handleUpdate = async () => {
      let valid = true
      if (job === '') {
          Alert.alert('Error', 'job required')
          valid = false
          return
      }
      if (lokasi === '') {
        Alert.alert('Error', 'lokasi required')
        valid = false
        return
    }
    
      if (valid) {
          // if valid submit to api using axios
          try {
              const data = new FormData() 
              data.append('woId', woId)
              data.append('job',job )
              data.append('lokasi', lokasi)
           
              setLoading(true)
              const API_URL_SERVER = `https://emshotels.net/myapi/updateWO.php`
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
   

  return (
    <Box flex="1" bg="muted.50">
        <VStack space="2.5" mt="4" px="8">
          {loading &&
          <>
          <Skeleton mt="4" rounded="md" />
          <Skeleton mt="2" rounded="md"  />
          <Skeleton mt="2" rounded="md"  />
          <Skeleton mt="2" rounded="md"  />
          </>
          }
          {!loading &&
          <Stack direction="row" mb="2.5" mt="1.5" space={3}>
          <FlatList data={data} renderItem={({
              item,index
            }) => <Box borderBottomWidth="1" _dark={{
              borderColor: "muted.50"
            }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                    <HStack space={[2, 3]} justifyContent="space-between">
                      {/* <Avatar size="48px" source={{
                        uri: `https://emshotels.net/manager/workorder/photo/${item.photo}`
                      }} /> */}
                      <Image source={{
                    uri: `https://emshotels.net/manager/workorder/photo/${item.photo}`
                  }} alt="Alternate Text" size="md" />

          <Pressable onPress={() => handleOpenModal(item.woId, item.job, item.lokasi)}>
                  {
                      <VStack>
                      <Badge bg="muted.200" width="40%">WO-{item.woId}</Badge>
                      <Text color="warmGray.600">
                          Date: {item.mulainya}
                        </Text>
                        <Text  color="warmGray.600">
                          Location: {item.lokasi}
                        </Text>
                        <Text  color="warmGray.600">
                          Order By: {item.orderBy}
                        </Text>
                        <Text  color="warmGray.600">
                          Priority: <Text style={{color:"#F43C4A",fontWeight:'bold'}} >{item.priority.toUpperCase()}</Text>
                        </Text>
                        <Text width="250" numberOfLines={2}  color="warmGray.600">
                          Job: {item.job}
                        </Text>
                      </VStack>
                    }
            </Pressable>


            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Edit WO</Modal.Header>
            <Modal.Body>
                <FormControl>
                <FormControl.Label>Job :</FormControl.Label>
                <Input
            onChangeText={handleJob} value={job} ></Input>
                </FormControl>
                <FormControl>

                <FormControl.Label>Location :</FormControl.Label>
                <Input
            onChangeText={handlelokasi} value={lokasi} ></Input>
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
                    <Button mt="2" onPress={handleUpdate} >
                    Update
                    </Button>
                )}
                
                </Button.Group>
            </Modal.Footer>
            </Modal.Content>
            </Modal>
                      <Spacer />
                      <Text fontSize="xs" _dark={{
                  color: "warmGray.50"
                }} color="coolGray.800" alignSelf="flex-start">
                        {item.timeStamp}
                      </Text>
                    </HStack>
                  </Box>} keyExtractor={(item,index) => index} />
          </Stack>
          }
      </VStack>
    </Box>
  );
}





export default Outbox;