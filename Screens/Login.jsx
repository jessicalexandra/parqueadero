
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Text, TextInput ,Button} from "react-native-paper";
import { users } from "../data/users";
import { useState } from "react";
import{styleV,styles} from "../css/style"



export const Login = ({navigation}) => {
    const [error,setError]=useState('')
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
          userName: 'jessicaf',
          password: '1'
        }
      });
      const onSubmit = (data) => {

        console.log(data);

        const buscarUsu=users.find(user=>user.password===data.password && user.userName===data.userName)
        if (buscarUsu) {
            navigation.navigate('Car')
            setError('')
            reset();
        }else{
            setError('usario o contraseña incorrecta')
        }

      }
  return (
    
    <View style={ styles.container }>
        {error !== '' && <Text>{error}</Text>}
          <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="usuario"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="userName"
      />
      {errors.userName?.type === 'required' && <Text>El usuario es obligatorio</Text>}
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="contraseña"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password?.type === 'required' && <Text>La contraseña es obligatorio</Text>}


      <Button icon="camera" mode="contained" onPress={handleSubmit(onSubmit)}>
    ENVIAR
  </Button>

          <Text
              onPress={() => {
                setError('')
                navigation.navigate('User')
              }}
              >Registrate aqui</Text>
    </View>
  )  
}


