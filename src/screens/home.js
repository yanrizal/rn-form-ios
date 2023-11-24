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
import { VStack, Skeleton, Avatar, Box, Button, Spacer, Stack, HStack, Badge, Image, Text } from 'native-base';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
const Home = ({route}) => {
  const {id, dept, filter, filterData} = route
  console.log('route',id, dept)
  const [loading, setLoading] = useState(true)
  const [data,setData] = useState([]);

  const loadData = async () => {
    try {
      const API_URL_SERVER = `https://emshotels.net/myapi/woread.php?id=${id}&dept=${dept}`
      const res = await axios.get(API_URL_SERVER)
      console.log('res',res)
      setData(res.data)
      setLoading(false)
    } catch(err) {
        console.log(err)
        Alert.alert('Error', err)
    }
  }

  useFocusEffect(
    useCallback(() => {
      console.log('focus')
      console.log('filter', filter)
      if (filter) {
        setData(filterData)
      } else {
        loadData()
      }
      
    }, [route])
  );

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
              navigation.navigate('Hometab', {
                screen: 'Home',
                params: { woId: res.data[0].woId, id: res.data[0].propID, dept: res.data[0].dept, email: email } // tambahan provide email juga
              });
            }
        } catch(err) {
            console.log(err)
            Alert.alert('Error', err.message)
        }
    }
  }
  const handleReceive = async (status, woId) => {
    let valid = true
    if (status === '') {
        Alert.alert('Error', 'status required')
        valid = false
        return
    }
 
  
    if (valid) {
        // if valid submit to api using axios
        try {
            const data = new FormData() 
            data.append('woId', woId)
            data.append('status',status )
           
         
            setLoading(true)
            console.log('sta', status, woId)
            const API_URL_SERVER = `https://emshotels.net/myapi/changeStatus.php`
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
              // setShowModal(false)
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
                      
              <VStack>

              {(item.photo === ""  || item.photo === null) ? (
                <Box></Box>
              ):(
                <Image source={{
                  uri: `https://emshotels.net/manager/workorder/photo/${item.photo}`
                }} alt="Alternate Text" size="md" />
              )

                }
              
                  {item.status == 'new' &&
                    <Button bg="purple.400" onPress={() => handleReceive('received', item.woId)}>RECEIVED</Button>
                  }
                  {item.status == 'received' &&
                    <Button bg="success.400" onPress={() => handleReceive('progress', item.woId)}>PROGRESS</Button>
                  }
                  {item.status == 'progress' &&
                    <Button bg="amber.400" onPress={() => handleReceive('pending', item.woId)}>PENDING</Button>
                  }
                  {item.status == 'progress' &&
                   <Button bg="muted.400" onPress={() => handleReceive('done', item.woId)}>DONE</Button>
                  }
                  {item.status == 'pending' &&
                    <Button bg="info.400" onPress={() => handleReceive('continue', item.woId)}>CONTINUE</Button>
                  }
                 {item.status == 'continue' &&
                 
                   <Button bg="muted.400" onPress={() => handleReceive('done', item.woId)}>DONE</Button>
                  }                
                 {item.status == 'continue' &&
                 
                   <Button bg="amber.400" onPress={() => handleReceive('pending', item.woId)}>PENDING</Button>
                 }  
                  </VStack>
                      <VStack>
           
          
                      <Badge bg="muted.200" width="40%">{item.woId}
                      </Badge>
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
                        Job: <Text italic><Text bold>{item.job}</Text> </Text>
                         
                        </Text>
                        <Text  color="warmGray.600">
                          Status: {item.status}
                        </Text>
                      </VStack>
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
export default Home;