import React, { useContext } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import firestore from "@react-native-firebase/firestore";
import { FirebaseStorageTypes } from "@react-native-firebase/storage";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import FocusAwareStatusBar from "../../components/common/FocusAwareStatusBar";
import { brandColors } from "../../utils/colors";
import BackIcon from "../../../assets/svg/arrowLeft.svg";
import { AppStackParamList } from "../../navigation/AppStack";
import { HomeStackScreens } from "../../navigation/screens";
import BrandButton from "../../components/common/BrandButton";
import { StoreContext } from "../../store/store";
import ProfileEditForm from "../../components/ProfileEditScreen/ProfileEditForm";
import { Collections } from "../../utils/enums";
import Avatar from "../../components/ProfileEditScreen/Avatar";

export type ProfileEditState = {
  displayName: null | string,
  profession: string,
  email: null | string,
  birthDate: Date,
  imageUploadResult?: FirebaseStorageTypes.FullMetadata,
  imageUploadUrl?: string
}

const EditProfileSchema = Yup.object().shape({
  displayName: Yup.string().required("Enter your name").min(2, "Too short").max(50, "Too long"),
  email: Yup.string().email("Invalid email").required("Enter email"),
  profession: Yup.string().required("Enter your profession").min(2, "Too short").max(50, "Too long")
});

interface IProps {
  navigation: NativeStackNavigationProp<AppStackParamList, HomeStackScreens.ProfileEdit>;
}

const ProfileEditScreen: React.FC<IProps> = ({ navigation }) => {
  const {
    fsUser: [firestoreUser, setFirestoreUser],
    appSnackbar: [snackbar, setSnackbar]
  } = useContext(StoreContext);

  console.log("firestoreUser:", firestoreUser);

  const goBack = (): void => navigation.goBack();

  const onEdit = async (values: ProfileEditState): Promise<void> => {
    if (firestoreUser) {
      try {
        const updateUserValues = {
          ...firestoreUser,
          ...values
        };

        await firestore().collection(Collections.Users).doc(firestoreUser?.uid).set(updateUserValues);

        setFirestoreUser(updateUserValues);

        setSnackbar({
          visible: true,
          color: brandColors.blue,
          text: "Profile info was updated"
        });
      } catch (error) {
        setSnackbar({
          visible: true,
          color: brandColors.red,
          text: "Error has occurred during profile update"
        });
      }
    }
  };

  return <SafeAreaWrapper forcedColor={ brandColors.blue }>
    <FocusAwareStatusBar barStyle="light-content" />

    <ScrollView
      showsVerticalScrollIndicator={ false }
      style={ styles.scrollViewContainer }
    >
      <View style={ styles.headerContainer }>
        <TouchableOpacity style={ styles.backButtonContainer } onPress={ goBack }>
          <BackIcon fill={ brandColors.blue } />
        </TouchableOpacity>

        <Text style={ styles.headerText }>My Profile</Text>

        {/* Transparent filler View */ }
        <View style={ { width: 36, height: 36 } } />
      </View>

      <View style={ styles.container }>
        <Formik
          initialValues={ firestoreUser ? {
            displayName: firestoreUser.displayName,
            email: firestoreUser.email,
            profession: firestoreUser.profession,
            birthDate: firestoreUser.birthDate,
            imageUploadUrl: firestoreUser.imageUploadUrl,
            imageUploadResult: firestoreUser.imageUploadResult
          } : { displayName: "", profession: "", email: "", birthDate: new Date() } }
          onSubmit={ values => onEdit(values) }
          validationSchema={ EditProfileSchema }
          enableReinitialize
        >
          { ({ handleSubmit }) => (
            <>
              <Avatar />

              <View style={ styles.formContainer }>
                <ProfileEditForm />

                <BrandButton
                  onPress={ handleSubmit }
                  text="Save"
                  buttonStyle={ { marginTop: 40 } }
                />
              </View>
            </>
          ) }
        </Formik>
      </View>
    </ScrollView>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 15
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingBottom: 50,
    minHeight: "90%"
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },
  backButtonContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36
  },
  scrollViewContainer: {
    flex: 1
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 50
  }
});

export default ProfileEditScreen;
