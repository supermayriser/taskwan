import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { brandColors } from "../../utils/colors";
import LocationSmallIcon from "../../../assets/svg/Profile/locationSmall.svg";
import BagIcon from "../../../assets/svg/Profile/bag.svg";
import { StoreContext } from "../../store/store";
import ProfileIcon from "../../../assets/svg/Profile/profile.svg";

const UserInfo: React.FC = () => {
  const { fsUser: [firestoreUser] } = useContext(StoreContext);

  return <View style={ styles.userInfoContainer }>
    <View style={ styles.pushTopWrapper }>
      {
        firestoreUser?.photoURL ?
          <Image
            source={ { uri: firestoreUser.imageUploadUrl ? firestoreUser.imageUploadUrl : firestoreUser.photoURL } }
            style={ styles.avatarStyle }
          /> : <View style={ styles.noImageContainer }>
            <ProfileIcon width={ 30 } height={ 30 } />
          </View>
      }

      <Text style={ styles.userNameText }>{ firestoreUser?.displayName }</Text>
      <Text style={ styles.jobText }>{ firestoreUser?.profession ? firestoreUser.profession : "(no profession assigned)" }</Text>

      <View style={ styles.iconInfoContainer }>
        <View
          style={ [
            styles.iconInfoItemContainer, {
              borderRightWidth: 1, borderRightColor: brandColors.snowBlue
            }
          ] }
        >
          <LocationSmallIcon />

          <Text style={ styles.infoDescriptionText }>(no location selected)</Text>
        </View>
        <View style={ styles.iconInfoItemContainer }>
          <BagIcon />

          <Text style={ styles.infoDescriptionText }>0 Task Completed</Text>
        </View>
      </View>
    </View>
  </View>;
};

const styles = StyleSheet.create({
  noImageContainer: {
    width: 84,
    height: 84,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: brandColors.blue,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: brandColors.snowBlue
  },
  pushTopWrapper: {
    alignItems: "center",
    top: -30
  },
  infoDescriptionText: {
    color: brandColors.darkGrey,
    fontSize: 10,
    lineHeight: 15,
    marginLeft: 5
  },
  iconInfoItemContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "center"
  },
  iconInfoContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10
  },
  jobText: {
    lineHeight: 18,
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 15
  },
  userNameText: {
    color: brandColors.blue,
    fontSize: 16,
    fontWeight: "600"
  },
  avatarStyle: {
    width: 84,
    height: 84,
    borderRadius: 50,
    marginBottom: 10
  },
  userInfoContainer: {
    height: 174,
    marginHorizontal: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: brandColors.snowBlue,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.75,
    shadowRadius: 15,
    elevation: 12,
    borderRadius: 10,
    zIndex: 10,
    overflow: "visible"
  }
});

export default UserInfo;
