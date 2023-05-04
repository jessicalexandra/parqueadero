import { useState } from "react";
import { View } from "react-native-web";
import{useForm,Controller} from "react-hook-form"
import { Button,Text,TextInput } from "react-native-paper";
import { users } from "../data/users";
import {cars} from "../data/cars"
import {rents} from "../data/rents"

export const Rent=({navigation})=>{
  const [errorUser, setErrorUser] = useState('');
  const [errorCar, setErrorCar] = useState('');
  const [error, setError] = useState('');

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      rentNumber: '',
      userName: '',
      plateNumber: '',
      rentDate: ''
    }
  });
  const onSubmit = ({ userName, rentNumber, plateNumber, rentDate}) => {
    setErrorUser('');
    setErrorCar('');
    setError('');
    const findUser = users.find(user => user.userName === userName);
    const findCar = cars.find(car => car.plateNumber === Number(plateNumber) && car.state === true);
    const findRent = rents.find(rent => rent.rentNumber === Number(rentNumber));

    if (!findUser) {
      setErrorUser(`El username ingresado no esta registrado`);
      return;
    }

    console.log(cars);

    if (!findCar) {
      setErrorCar(`La placa del carro no esta disponible o\n no se encuentra registrada`);
      return;
    }

    if (findRent) {
      setError('El numero de renta, ya esta registrada');
    } else {
      rents.push({rentNumber, userName, plateNumber, rentDate});
      findCar.state = false;
      reset();
      navigation.navigate('ListCar', { cars });
    }


  }
  return (
    <View style={ styles.container }>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[0-9]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleInput.widthInput}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            label="Numero de renta"
            right={<TextInput.Icon icon='format-list-numbered' />}
          />
        )}
        name="rentNumber"
      />
      {errors.rentNumber?.type === 'required' && <Text style={styleAlert.alert}>El username es obligatorio</Text>}
      {errors.rentNumber?.type === 'pattern' && <Text style={styleAlert.alert}>El numero de renta solo permite numero</Text>}

      {
        error !== '' && <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>
      }

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9\ áéíóúÁÉÍÓÚñÑ\s]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleInput.widthInput}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            label="Usuario"
            right={<TextInput.Icon icon='account' />}
          />
        )}
        name="userName"
      />
      {errors.userName?.type === 'required' && <Text style={styleAlert.alert}>El username es obligatorio</Text>}
      {errors.userName?.type === 'pattern' && <Text style={styleAlert.alert}>El username no permite caracteres especiasles</Text>}
      {
        errorUser !== '' && <Text style={{ color: 'red', marginBottom: 20 }}>{errorUser}</Text>
      }

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[0-9]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleInput.widthInput}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            label="Numero de placa"
            right={<TextInput.Icon icon='car-brake-abs' />}
          />
        )}
        name="plateNumber"
      />
      {errors.plateNumber?.type === 'required' && <Text style={styleAlert.alert}>El numero de placa es obligatorio</Text>}
      {errors.plateNumber?.type === 'pattern' && <Text style={styleAlert.alert}>El numero de placa solo permite numero</Text>}
      {
        errorCar !== '' && <Text style={{ color: 'red', marginBottom: 20 }}>{errorCar}</Text>
      }

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9\ áéíóúÁÉÍÓÚñÑ\s]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleInput.widthInput}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            label="Fecha"
            right={<TextInput.Icon icon='calendar-month' />}
          />
        )}
        name="rentDate"
      />
      {errors.rentDate?.type === 'required' && <Text style={styleAlert.alert}>La fecha es obligatorio</Text>}
      {errors.rentDate?.type === 'pattern' && <Text style={styleAlert.alert}>La fecha no permite caracteres especiasles</Text>}

      <Button
        buttonColor='#2b78fd'
        style={{ marginTop: 20, marginBottom: 10 }}
        icon="content-save"
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        Rent
      </Button>
    </View>
  )
}

