import React, { ReactNode } from "react";
import { ViewStyle } from "react-native";
import Modal from "react-native-modal";

interface IProps {
  modal: ReactNode,
  onBackdropPress: (value?: any) => void,
  isVisible: boolean,
  styles?: ViewStyle,
  backdropOpacity?: number
}

/**
 * Modal wrapper component
 * @constructor
 */
const ModalWrapper: React.FC<IProps> = ({ modal, styles, isVisible, onBackdropPress, backdropOpacity }) => {
  return <Modal
    style={ styles }
    isVisible={ isVisible }
    onBackdropPress={ onBackdropPress }
    backdropOpacity={ backdropOpacity }
    backdropTransitionOutTiming={ 0 }
    backdropColor={ "#FFFFFF" }
    useNativeDriver
    hideModalContentWhileAnimating
  >
    { modal }
  </Modal>;
};

export default ModalWrapper;
