import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import auth from "@react-native-firebase/auth";

import { brandColors } from "../../utils/colors";
import BrandButton from "../common/BrandButton";
import { StoreContext } from "../../store/store";

const LogoutModal: React.FC = () => {
  const {
    modal: [modalVisible, setModalVisible],
    user: [user, setUser],
    fsUser: [firestoreUser, setFirestoreUser],
  } = useContext(StoreContext);

  const onLogout = async (): Promise<void> => {
    try {
      await auth().signOut();
      setUser(null);
      setFirestoreUser(null);
      setModalVisible(null);
    } catch (error) {
      console.log("Logout error");
    }
  };

  const onCancel = (): void => setModalVisible(null);

  return <View style={ styles.container }>
    <Text style={ styles.titleText }>Logout of Taskwan?</Text>

    <BrandButton
      onPress={ onLogout }
      labelStyle={ { fontSize: 12, fontWeight: "500" } }
      text="Logout"
    />

    <TouchableOpacity style={ styles.cancelButtonContainer } onPress={ onCancel }>
      <Text style={ styles.cancelText }>Cancel</Text>
    </TouchableOpacity>
  </View>;
};

const styles = StyleSheet.create({
  cancelButtonContainer: {
    height: 23,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 7.25,
  },
  cancelText: {
    fontSize: 10,
    fontWeight: "400",
  },
  titleText: {
    textAlign: "center",
    marginTop: 17,
    fontSize: 16,
    fontWeight: "600",
    color: brandColors.blue,
    marginBottom: 25,
  },
  container: {
    borderWidth: 1,
    borderColor: "rgba(0, 110, 233, 0.4)",
    borderRadius: 20,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    paddingBottom: 10,
  },
});

export default LogoutModal;
