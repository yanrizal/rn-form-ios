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
import { VStack, Skeleton, Avatar, Box, Spacer, Stack, HStack, Badge, Image, Text } from 'native-base';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({route}) => {
  const {id, dept} = route
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
      loadData()
    }, [route])
  );

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
                      <VStack>
                      <Badge bg="muted.200" width="40%">WO-12356</Badge>
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
