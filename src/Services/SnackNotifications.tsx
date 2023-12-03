import React, { ReactNode, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar, Text } from "react-native-paper";

import { StoreContext } from "../store/store";

/**
 * Snack notifications wrapper app component
 * @param children
 * @constructor
 */
const SnackNotifications: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { appSnackbar: [snackbar, setSnackbar] } = useContext(StoreContext);

  useEffect(() => {
    if (snackbar.visible) {
      setTimeout(() => {
        setSnackbar({ ...snackbar, visible: false });
      }, 7500);
    }
  }, [snackbar.visible]);

  return <View style={ styles.container }>
    { children }

    <Snackbar
      style={ { backgroundColor: snackbar.color } }
      visible={ snackbar.visible }
      onDismiss={ () => null }
    >
      <Text style={ { color: "#FFFFFF" } }>{ snackbar.text }</Text>
    </Snackbar>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default SnackNotifications;
