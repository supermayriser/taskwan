import React, { ReactNode } from "react";
import { KeyboardType, StyleSheet, TextInput, View } from "react-native";
import { HelperText, Text } from "react-native-paper";

import { brandColors } from "../../utils/colors";

interface IProps {
  value: any,
  handleChange: (value: string) => void,
  handleBlur: (event: any) => void,
  errorMessage?: string,
  touched?: boolean,
  secure?: boolean,
  placeholder?: string,
  icon?: ReactNode,
  keyboardType?: KeyboardType,
  disabled?: boolean,
  marginBottom?: number,
  label: string
  multiline?: boolean
}

const RegularInput: React.FC<IProps> = ({
  value,
  placeholder,
  handleChange,
  secure,
  keyboardType,
  label,
  touched,
  errorMessage,
  disabled,
  multiline
}) => {
  return <View style={ { marginBottom: 20 } }>
    <Text style={ styles.labelText }>{ label }</Text>

    <View style={ styles.container }>
      <TextInput
        value={ value }
        placeholder={ placeholder }
        onChangeText={ handleChange }
        style={ [styles.textInputStyle, { color: disabled ? brandColors.grey : "#000000" }] }
        placeholderTextColor={ brandColors.grey }
        autoCapitalize="none"
        secureTextEntry={ secure }
        keyboardType={ keyboardType }
        editable={ !disabled }
        multiline={ multiline }
      />
    </View>

    { (touched && errorMessage) ?
      <HelperText type="error" visible={ !!errorMessage } style={ styles.errorText }>
        { errorMessage }
      </HelperText> : null
    }
  </View>;
};

const styles = StyleSheet.create({
  errorText: {
    color: brandColors.red
  },
  labelText: {
    color: brandColors.blue,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10
  },
  container: {
    minHeight: 48,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 110, 233, 0.1)",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center"
  },
  textInputStyle: {
    minHeight: 40,
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
    width: "100%",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18
  }
});

export default RegularInput;
