import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Icons from "react-native-heroicons/solid";


const App = () => {
  const [selectedValue, setSelectedValue] = useState('Dow Jones');
  const today = new Date().toLocaleDateString();
  const callApi = (value,trade) => {

    const strTrade = '6192717234389,'+trade+',US30,risk=1,tp=20,sl=20,betrigger=15,beoffset=0'

    Alert.alert('Confirmer le Trade', '1% de risque '+trade+' US30', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        console.log('Appel API avec la valeur:', value + " " + trade)
        console.log(strTrade)
        fetch("https://pineconnector.net/webhook/", {
          method: 'POST',
          body: strTrade,
          headers: {'Content-Type': strTrade }
        })
        .then(console.log('OK'))
      }},
      ]);
  };

  return (
    <View className="h-full bg-blue-600">
     <Text className="text-3xl mt-20 text-center text-white">
        QUICK TRADE        <Icons.SparklesIcon className="text-white" />
      </Text>
      <View className="mt-10 bg-blue-700 text-white h-25">
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={{color:'white'}}
        >
          <Picker.Item label="Dow Jones" color="white" value="US30" />
          <Picker.Item label="Gold" color="white" value="XAUUSD" />
          <Picker.Item label="Pétrole" color="white" value="OIL" />
        </Picker>
      </View>
      <View className="mt-5 mb-5 flex flex-row bg-blue-800 pb-20 pt-20 rounded-3xl">
        <View className="basis-1/12"></View>
          <TouchableOpacity className="h-40 basis-4/12 rounded-3xl bg-green-500 text-white justify-center" onPress={() => callApi(selectedValue,"long")}>
            <Text className="text-white text-center">
              LONG
              <Icons.ArrowTrendingUpIcon className="text-white" />
            </Text>
          </TouchableOpacity>
          <View className="basis-2/12"></View>
          <TouchableOpacity className="h-40 basis-4/12 rounded-3xl bg-red-500 text-white justify-center" onPress={() => callApi(selectedValue,"short")}>
            <Text className="text-white text-center">
              SHORT
              <Icons.ArrowTrendingDownIcon className="text-white" />
            </Text>
          </TouchableOpacity>
      </View>
        <Text className="text-white text-2xl bg-blue-700 w-full text-center pt-5">{today}</Text>
        <Text className="text-white text-lg bg-blue-700 w-full text-center pb-5">Count for the day : 3</Text>  
    </View>
  );
};

export default App;
