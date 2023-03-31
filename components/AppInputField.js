import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField(props) {
  console.log(props.placeholder)
  return (
    <TextInput
        style={styles.input}
        onChangeText={text => props.handleChange(text)}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor="black"
    />
  );
}

const styles = StyleSheet.create({
    input: {
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
      borderWidth: 2,
      borderColor: '#009688',
    },
});
  
  