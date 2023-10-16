import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Outbox from '../screens/outbox';
import AddForm from '../screens/addForm';
import WoFilter from '../screens/woFilter';
import { AddIcon, Avatar, HamburgerIcon, Menu, Text } from 'native-base'
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();
function MyTabs(props) {
  const navigation = useNavigation();
  console.log('pro',props)

  const handleLogout = () => {
    AsyncStorage.clear()
    navigation.navigate('Login', {
      params: props.route.params.params
    })
  }

  return (
    <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Add"
        children={()=><AddForm route={props.route.params.params}/>}
        options={{
          title: "Create New", 
          headerShown: true,
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#01a659',
          headerStyle: {
            backgroundColor: '#01a659',
          },
          tabBarLabel: 'ADD',
          tabBarLabelStyle: {
            display:'none'
          },
          headerRight: () => (
            <Menu w="190" trigger={triggerProps => {
              return <Pressable style={{marginRight:20}} accessibilityLabel="More options menu" {...triggerProps}>
                      <HamburgerIcon color="#FFF" />
                    </Pressable>;
            }}>
                <Menu.Item>SETTING</Menu.Item>
                <Menu.Item  onPress={() => navigation.navigate('Profile', {
                params: props.route.params.params
              })}>
                    <Pressable onPress={() => navigation.navigate('Profile', {
                params: props.route.params.params
              })}><Text>PROFILE</Text></Pressable>
                </Menu.Item>
                <Menu.Item  onPress={() => navigation.navigate('Login', {
                params: props.route.params.params
              })}>
                    <Pressable onPress={handleLogout}><Text>LOGOUT</Text></Pressable>
                </Menu.Item>
              </Menu>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <AddIcon size="5" mt="0.5" color="emerald.500" />
          )
          }}/>

<Tab.Screen name="Out"
        children={()=><Outbox route={props.route.params.params}/>}
      
      options={{
        title: "Outbox", 
        headerShown: true,
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#01a659',
        headerStyle: {
          backgroundColor: '#01a659',
        },

        tabBarLabel: 'OUT',
        tabBarLabelStyle: {
          fontSize:23,
          marginBottom:10
        },
        headerRight: () => (
          <Menu w="190" trigger={triggerProps => {
            return <Pressable style={{marginRight:20}} accessibilityLabel="More options menu" {...triggerProps}>
                    <HamburgerIcon color="#FFF" />
                  </Pressable>;
          }}>
              <Menu.Item>SETTING</Menu.Item>
              <Menu.Item  onPress={() => navigation.navigate('Profile', {
              params: props.route.params.params
            })}>
                  <Pressable onPress={() => navigation.navigate('Profile', {
              params: props.route.params.params
            })}><Text>PROFILE</Text></Pressable>
              </Menu.Item>
              <Menu.Item  onPress={() => navigation.navigate('Login', {
                params: props.route.params.params
              })}>
                    <Pressable onPress={handleLogout}><Text>LOGOUT</Text></Pressable>
                </Menu.Item>
            </Menu>
        ),
        tabBarIconStyle: { display: "none" },
        }}/>
      <Tab.Screen name="Home"
          children={()=><Home route={props.route.params.params}/>}
          options={{
          title: "Inbox", 
          headerShown: true,
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#01a659',
          headerStyle: {
            backgroundColor: '#01a659',
          },
               /*--------------------------  */
               headerRight: () => (
                <Menu w="190" trigger={triggerProps => {
                  return <Pressable style={{marginRight:20}} accessibilityLabel="More options menu" {...triggerProps}>
                          <HamburgerIcon color="#FFF" />
                        </Pressable>;
                }}>
                    <Menu.Item>SETTING</Menu.Item>
                    <Menu.Item  onPress={() => navigation.navigate('Profile', {
                    params: props.route.params.params
                  })}>
                        <Pressable onPress={() => navigation.navigate('Profile', {
                    params: props.route.params.params
                  })}><Text>PROFILE</Text></Pressable>
                    </Menu.Item>
                    <Menu.Item  onPress={() => navigation.navigate('Login', {
                params: props.route.params.params
              })}>
                    <Pressable onPress={handleLogout}><Text>LOGOUT</Text></Pressable>
                </Menu.Item>
                  </Menu>
              ),
    
           /*  /----------------------------   */
          tabBarLabel: 'IN',
          tabBarLabelStyle: {
            fontSize:23,
            marginBottom:10
          },
          tabBarIconStyle: { display: "none" },
          }}/>
     

        <Tab.Screen name="WoFilter" 
        children={()=><WoFilter route={props.route.params.params}/>}
        options={{
          title: "WO Filter", 
          headerShown: true,
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#01a659',
          headerStyle: {
            backgroundColor: '#01a659',
          },
          tabBarLabel: 'FILTER',
          tabBarLabelStyle: {
            display:'none'
          },
          headerRight: () => (
            <Menu w="190" trigger={triggerProps => {
              return <Pressable style={{marginRight:20}} accessibilityLabel="More options menu" {...triggerProps}>
                      <HamburgerIcon color="#FFF" />
                    </Pressable>;
            }}>
                <Menu.Item>SETTING</Menu.Item>
                <Menu.Item  onPress={() => navigation.navigate('Profile', {
                params: props.route.params.params
              })}>
                    <Pressable onPress={() => navigation.navigate('Profile', {
                params: props.route.params.params
              })}><Text>PROFILE</Text></Pressable>
                </Menu.Item>
                <Menu.Item  onPress={() => navigation.navigate('Login', {
                params: props.route.params.params
              })}>
                    <Pressable onPress={handleLogout}><Text>LOGOUT</Text></Pressable>
                </Menu.Item>
              </Menu>
          ),
          /*
          tabBarIcon: ({ focused, color, size }) => (
            <Avatar size="35" source={{
                uri: "https://emshotels.net/images/user/profile/USER_1057.jpg"
              }} />
          )  */
          }}/>
    </Tab.Navigator>
  );
}
export default MyTabs