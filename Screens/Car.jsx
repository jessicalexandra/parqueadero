
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button, Checkbox } from "react-native-paper";
import { useState } from "react";
import{cars}from "../data/cars"
import{styleV,styles} from "../css/style"


export const Car = ({ navigation }) => {
  const [error, setError] = useState('')
  const [checked, setChecked] = useState(true)

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      plateNumber: '',
      brand: ''
    }
  });
  const onSubmit = ({ plateNumber, brand}) => {

    const buscarPlaca=cars.find(car=>car.plateNumber===plateNumber)
    if (buscarPlaca) {
      setError('esta placa ya fue registrada')
    }else{
      cars.push({
        plateNumber,
        brand,
        state:checked

    })
   

    navigation.navigate('Listar',{cars})
    }

    reset();

 

  }
  return (
    <View style={styles.container}>
      {error !== '' && <Text>{error}</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Ingrese la placa"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="plateNumber"
      />
      {errors.plateNumber?.type === 'required' && <Text>El numero de la placa es obligatorio</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Marca"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="brand"
      />
      {errors.brand?.type === 'required' && <Text>La marca es obligatorio</Text>}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>State</Text>
        <Checkbox
          status={checked === true ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>


      <Button icon="camera" mode="contained" onPress={handleSubmit(onSubmit)}>
        GUARDAR
      </Button>
    </View>
  )
}


