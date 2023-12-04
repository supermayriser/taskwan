import React, { ReactNode } from "react";
import { KeyboardType, StyleSheet, TextInput, View } from "react-native";
import { HelperText } from "react-native-paper";

import { brandColors } from "../../utils/colors";

interface IProps {
  value: string,
  handleChange: (value: string) => void,
  handleBlur: (event: any) => void,
  errorMessage?: string,
  touched?: boolean,
  secure?: boolean,
  placeholder?: string,
  icon?: ReactNode,
  keyboardType?: KeyboardType,
  disabled?: boolean,
  marginBottom?: number
}

const IconInput: React.FC<IProps> = ({
  marginBottom,
  icon,
  value,
  placeholder,
  handleChange,
  errorMessage,
  touched,
  secure,
  keyboardType,
}) => {
  return <View style={ { marginBottom: marginBottom ? marginBottom : 20 } }>
    <View style={ styles.container }>
      <View style={ styles.iconContainer }>
        { icon }
      </View>

      <TextInput
        value={ value }
        placeholder={ placeholder }
        onChangeText={ handleChange }
        style={ styles.textInputStyle }
        placeholderTextColor={ brandColors.grey }
        autoCapitalize="none"
        secureTextEntry={ secure }
        keyboardType={ keyboardType }
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
    color: brandColors.red,
  },
  textInputStyle: {
    height: 40,
    marginLeft: 20,
    fontFamily: "Poppins-Regular",
    width: "100%",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    color: "#000000",
  },
  iconContainer: {
    width: 50,
    height: "100%",
    backgroundColor: brandColors.blue,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 48,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 110, 233, 0.1)",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default IconInput;
