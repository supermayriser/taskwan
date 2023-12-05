import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import GoogleIcon from "../../../assets/svg/SocialLogin/google.svg";
import FacebookIcon from "../../../assets/svg/SocialLogin/facebook.svg";
import TwitterIcon from "../../../assets/svg/SocialLogin/twitter.svg";

interface IProps {
  type: "facebook" | "twitter" | "google",
  onPress: () => void
}

const SocialLoginButton: React.FC<IProps> = ({ type, onPress }) => {
  const renderIcon = (): ReactElement => {
    switch (type) {
      case "facebook":
        return <FacebookIcon />;
      case "google":
        return <GoogleIcon />;
      case "twitter":
        return <TwitterIcon />;
    }
  };

  return <TouchableOpacity style={ styles.socialButtonContainer } onPress={ onPress }>
    { renderIcon() }
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  socialButtonContainer: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "rgba(0, 110, 233, 0.1)",
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SocialLoginButton;
