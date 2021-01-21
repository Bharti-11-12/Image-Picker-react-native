import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform,TouchableOpacity,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "pink" }}>
    <TouchableOpacity style={{ width: 250, height:40,top:-50, justifyContent: 'center',alignItems: 'center',marginBottom:20,borderRadius:30, backgroundColor: "brown"}} onPress={() =>pickImage()}>
          <Text style={{color:'white', fontSize: 15,fontWeight:'bold', fontStyle: 'italic'}}>Pick an image from camera roll</Text>
        </TouchableOpacity>
     
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200,top:20}} />}
    </View>
  );
}