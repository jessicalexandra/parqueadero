
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Car } from './Screens/car';
import { Listar } from './Screens/Listar';
import { Login } from './Screens/Login';
import {User} from './Screens/User'
import { Rent } from './Screens/Rent';


const Stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();
export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={HomeTabs} options={{title:'Opciones'}}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}

function HomeTabs() {
  return(
    <Tab.Navigator
     initialRouteName='Login'
     screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'white',
      tabBarActiveBackgroundColor: 'green',
      tabBarInactiveTintColor: 'white',
      tabBarInactiveBackgroundColor: 'gray'
      
     }}>

<Tab.Screen name='User' component={User} options={{
      tabBarStyle: { display: 'none' },
      tabBarIcon:({color})=>(
        <MaterialIcons name='account-circle' color={color} size={20}/>
      )
     }}/>
      
     <Tab.Screen name='Car' component={Car} options={{
      tabBarIcon:({color})=>(
        <MaterialIcons name='directions-car' color={color} size={20}/>
      )
     }}/>
     <Tab.Screen name='Listar' component={Listar} options={{
      tabBarIcon:({color})=>(
        <MaterialIcons name='apps' color={color} size={20}/>
      )
     }}/>
     
     <Tab.Screen name='Rent' component={Rent} options={{
      tabBarIcon:({color})=>(
        <MaterialIcons name='attach-money' color={color} size={20}/>
      )
     }}/>
     
     
     <Tab.Screen name='Login' component={Login} options={{
      tabBarStyle: { display: 'none' },
      title: 'Logout',
      tabBarIcon:({color})=>(
        <MaterialIcons name='logout' color={color} size={20}/>
      )
     }}/>
    </Tab.Navigator>
  )
}



