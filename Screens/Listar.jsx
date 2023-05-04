import { Text } from "react-native-paper";
import { View } from "react-native";
import { cars } from "../data/cars";

export const Listar = ({navigation, route}) => {
  console.log(route);
  return (
    <View>
      { 
        cars.map(car => {
          console.log(car)
          return (<Text key={ car.plateNumber }>{ car.plateNumber } - { car.brand } - { (car.state) ? 'Disponible' : 'No disponible' }</Text>)

        })
      }
    </View>
  )
}