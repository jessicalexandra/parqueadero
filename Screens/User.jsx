
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Text, TextInput ,Button} from "react-native-paper";
import { users } from "../data/users";
import { useState } from "react";


export const User = ({navigation}) => {
    const [error,setError]=useState('')
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
          userName: '',
          name:'',
          password:''
        }
      });
      const onSubmit = ({userName,password,name}) => {

    

        const buscarUsu=users.find(user=>user.userName===userName)
        if (!buscarUsu) {
            users.push({userName, name,password})
            setError('usuario registrado correctamente')
            reset();
            console.log(users);
        }else{
            setError('usario ya existe')
        }

      }
  return (
    <View style={ styles.container }>
        {error !== '' && <Text>{error}</Text>}
        <Controller
        control={control}
        rules={{
         required: true,
         pattern: /^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="nombre"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name?.type === 'required' && <Text>El nombre es obligatorio</Text>}
      {errors.name?.type === 'pattern' && <Text>Solo se permiten letras y espacios</Text>}
          <Controller
        control={control}
        rules={{
         required: true,
         pattern: /^[a-zA-Z0-9\ áéíóúÁÉÍÓÚñÑ\s]*$/
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
      {errors.userName?.type === 'required' && <Text>El usuario  es obligatorio</Text>}
      {errors.userName?.type === 'pattern' && <Text>solo se permite letras y numeros</Text>}

      <Controller
        control={control}
        rules={{
         required: true,
         pattern: /^[a-zA-Z0-9\ áéíóúÁÉÍÓÚñÑ\s]*$/
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
      {errors.password?.type === 'required' && <Text>La contraseña  es obligatoria</Text>}
      {errors.password?.type === 'pattern' && <Text>La contraseña debe tener solo numeros y letras</Text>}


      <Button icon="camera" mode="contained" onPress={handleSubmit(onSubmit)}>
    ENVIAR
  </Button>

          <Text
              onPress={() => {
                setError('')
                navigation.navigate('Login')
              }}
              >Volver a inicio</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  