import React, { useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { profileActionButtons } from "../../utils/mock";
import * as NavigationMethods from "../../navigation/NavigationMethods";
import { HomeStackScreens } from "../../navigation/screens";
import { StoreContext } from "../../store/store";
import { Modals } from "../../utils/enums";
import ModalWrapper from "../common/ModalWrapper";
import LogoutModal from "./LogoutModal";
import { isModalVisible } from "../../utils/functions";
import NavigationButton from "../common/NavigationButton";

const ProfileActions: React.FC = () => {
  const {
    modal: [modalVisible, setModalVisible],
  } = useContext(StoreContext);

  const onPress = async (path: HomeStackScreens | null): Promise<void> => {
    if (path) {
      return NavigationMethods.navigate(path);
    }

    setModalVisible(Modals.ProfileLogout);
  };

  const onModalClose = () => setModalVisible(null);

  const isLogoutModalVisible = useMemo(() => {
    return isModalVisible(modalVisible, Modals.ProfileLogout);
  }, [modalVisible]);

  return <View style={ styles.container }>
    { profileActionButtons.map((item, index) => {
      return <NavigationButton
        onPress={ () => onPress(item.path) }
        label={ item.label }
        icon={ <item.icon /> }
        key={ index }
      />;
    }) }

    <ModalWrapper
      modal={ <LogoutModal /> }
      onBackdropPress={ onModalClose }
      isVisible={ isLogoutModalVisible }
      styles={ styles.modalStyle }
    />
  </View>;
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
  },
  container: {
    marginTop: 25,
  },
});

export default ProfileActions;
