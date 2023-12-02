import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

import { navigationRef } from "./NavigationMethods";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { StoreContext } from "../store/store";
import { Collections } from "../utils/enums";
import { brandColors } from "../utils/colors";

const Navigation: React.FC = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const {
    user: [user, setUser],
    appSnackbar: [snackbar, setSnackbar],
    fsUser: [firestoreUser, setFirestoreUser]
  } = useContext(StoreContext);

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null): Promise<void> => {
    if (user) {
      const isFacebookProvider = user.providerData.find(item => item.providerId === "facebook.com");

      if (user && (user.emailVerified || isFacebookProvider)) {
        setUser(user);

        try {
          const firestoreDocument: FirebaseFirestoreTypes.DocumentData = await firestore()
            .collection(Collections.Users)
            .doc(user.uid)
            .get();

          if (!firestoreDocument.exists) {
            const userDocument = {
              displayName: user.displayName,
              birthDate: new Date(),
              profession: "",
              email: user.email,
              uid: user.uid,
              photoURL: user.photoURL
            };

            await firestore().collection(Collections.Users).doc(user.uid).set(userDocument);

            setFirestoreUser(userDocument);
          }

          const userDocument = firestoreDocument.data();

          if (userDocument) {
            setFirestoreUser({
              ...userDocument,
              birthDate: userDocument.birthDate.toDate(),
              photoURL: user.photoURL
            });
          }
        } catch (error: any) {
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
              text: "Oops, something went wrong during user record creation"
            });
          }
        }
      }
    }

    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    auth().currentUser?.reload();
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing) {
    return null;
  }

  return <SafeAreaProvider>
    <NavigationContainer ref={ navigationRef }>
      { user ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
  </SafeAreaProvider>;
};

export default Navigation;
