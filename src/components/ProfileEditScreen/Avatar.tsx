import React, { useContext, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import ImageResizer from "@bam.tech/react-native-image-resizer";
import storage from "@react-native-firebase/storage";
import { useFormikContext } from "formik";
import { ActivityIndicator } from "react-native-paper";

import ProfileIcon from "../../../assets/svg/Profile/profile.svg";
import EditIcon from "../../../assets/svg/editIcon.svg";
import { brandColors } from "../../utils/colors";
import { Collections, PickerOptions } from "../../utils/enums";
import { StoreContext } from "../../store/store";
import { ProfileEditState } from "../../screens/AppScreens/ProfileEditScreen";
import firestore from "@react-native-firebase/firestore";

const Avatar: React.FC = () => {
  const {
    appSnackbar: [snackbar, setSnackbar],
    fsUser: [firestoreUser, setFirestoreUser]
  } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const { setFieldValue, handleSubmit, values } = useFormikContext<ProfileEditState>();

  console.log("firestoreUser:", firestoreUser);

  const deleteOldImage = async (name: string): Promise<void> => {
    try {
      const reference = await storage().ref(name);

      await reference.delete();
    } catch (error: any) {
      console.log("Error deleting old image", error);
    }
  };

  const onImageEdit = async (): Promise<void> => {
    const options = {
      mediaType: PickerOptions.Photo
    };

    const { assets } = await launchImageLibrary(options);

    if (assets && assets[0].uri) {
      const resizedImage = await ImageResizer.createResizedImage(assets[0].uri, 500, 500, "JPEG", 100, 0, undefined, false, {
        mode: "contain"
      });

      const reference = storage().ref(resizedImage.name);

      try {
        const oldImageName = firestoreUser?.imageUploadResult?.name;
        setLoading(true);
        const result = await reference.putFile(resizedImage.uri);

        const imageUrl = await reference.getDownloadURL();

        setFieldValue("imageUploadResult", result.metadata);
        setFieldValue("imageUploadUrl", imageUrl);

        if (firestoreUser) {
          try {
            const updateUserValues = {
              ...firestoreUser,
              imageUploadResult: result.metadata,
              imageUploadUrl: imageUrl
            };

            await firestore().collection(Collections.Users).doc(firestoreUser?.uid).set(updateUserValues);

            setFirestoreUser(updateUserValues);

            setSnackbar({
              visible: true,
              color: brandColors.blue,
              text: "Profile avatar was updated"
            });
          } catch (error) {
            setSnackbar({
              visible: true,
              color: brandColors.red,
              text: "Error has occurred during profile update"
            });
          }
        }

        if (oldImageName) {
          await deleteOldImage(oldImageName);
        }

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error.code) {
          setSnackbar({
            visible: true,
            color: brandColors.red,
            text: error.message
          });
        } else {
          setSnackbar({
            visible: true,
            color: brandColors.red,
            text: "Something went wrong during image upload. Try again later"
          });
        }
      }
    }
  };

  return <TouchableOpacity style={ styles.imageWrapper } onPress={ onImageEdit }>
    { loading ? <View style={ styles.loadingBackground }>
      <ActivityIndicator animating={ true } color={ brandColors.blue } />
    </View> : null }

    {
      values.imageUploadUrl ?

        <Image
          source={ { uri: values.imageUploadUrl } }
          style={ styles.imageStyle }
        /> :

        firestoreUser?.photoURL ?
          <Image
            source={ { uri: firestoreUser.photoURL } }
            style={ styles.imageStyle }
          /> : <View style={ styles.noImageContainer }>
            <ProfileIcon width={ 30 } height={ 30 } />
          </View>
    }

    <EditIcon style={ styles.editIconStyle } />
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  loadingBackground: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255, 0.5)",
    zIndex: 5,
    width: 84,
    height: 84,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    width: 84,
    height: 84,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: brandColors.blue
  },
  editIconStyle: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  imageWrapper: {
    alignSelf: "center",
    marginTop: 32
  },
  noImageContainer: {
    width: 84,
    height: 84,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: brandColors.blue,
    backgroundColor: brandColors.snowBlue,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Avatar;
