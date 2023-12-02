import { FunctionComponent } from "react";
import { SvgProps } from "react-native-svg";
import { FirebaseStorageTypes } from "@react-native-firebase/storage";

export type WelcomeSlideType = {
  image: FunctionComponent<SvgProps>,
  title: string,
  text: string
}

export type SignupFormType = {
  email: string,
  username: string,
  password: string,
  confirmPassword: string
}

export type FirestoreUser = {
  displayName: string | null,
  profession: string,
  uid: string | undefined,
  birthDate: Date,
  email: string | null,
  photoURL: string | null,
  imageUploadResult?: FirebaseStorageTypes.FullMetadata,
  imageUploadUrl?: string
}
