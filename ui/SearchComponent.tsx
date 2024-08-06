import React, { Suspense, useState } from 'react';
import { TextInput, View, Image } from "react-native";

const styles = {
  inputStyle: {
  padding: 6,
  marginTop: 8,
  fontSize: 17
  },
  logo: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  }
};

const SearchComponent = ({onResponse}) => {
const [text, setText] = useState('');
const { inputStyle, logo, containerStyle } = styles;

function submit(){
onResponse(text);
}
  return (
    <Suspense fallback={null}>
    <View style={containerStyle}>
    <Image
        style={logo}
        source={require('./searchIcon.png')}
      />
      <TextInput
        style = {inputStyle}
        placeholder="Type here..."
        onChangeText={(newText) => {setText(newText)}}
        onSubmitEditing={submit}
        defaultValue={text}
      />
    </View>
   </Suspense>
  );
};

export default SearchComponent;