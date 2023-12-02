import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { configureFonts, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { brandColors } from "../utils/colors";
import { FirestoreUser } from "../utils/types";

const fontConfig = {
  ios: {
    regular: {
      fontFamily: "Poppins-Regular",
      fontWeight: "normal"
    },
    medium: {
      fontFamily: "Poppins-Medium",
      fontWeight: "normal"
    },
    light: {
      fontFamily: "Poppins-Light",
      fontWeight: "normal"
    },
    thin: {
      fontFamily: "Poppins-Light",
      fontWeight: "normal"
    }
  },
  android: {
    regular: {
      fontFamily: "Poppins-Regular",
      fontWeight: "normal"
    },
    medium: {
      fontFamily: "Poppins-Medium",
      fontWeight: "normal"
    },
    light: {
      fontFamily: "Poppins-Light",
      fontWeight: "normal"
    },
    thin: {
      fontFamily: "Poppins-Light",
      fontWeight: "normal"
    }
  }
};

const theme = {
  ...DefaultTheme,
  //@ts-ignore
  fonts: configureFonts(fontConfig)
};

const defaultSnackbarState = {
  visible: false, text: "Завантажуємо...", color: brandColors.blue
};

export type Snackbar = {
  visible: boolean,
  text: string,
  color: string
}

export type StoreContextType = {
  modal: [null | string, Dispatch<SetStateAction<null | string>>],
  appSnackbar: [Snackbar, Dispatch<SetStateAction<Snackbar>>],
  user: [FirebaseAuthTypes.User | null, Dispatch<SetStateAction<null | FirebaseAuthTypes.User>>],
  fsUser: [FirestoreUser | null, Dispatch<SetStateAction<null | FirestoreUser>>]
}

export const StoreContext = createContext<StoreContextType>({
  modal: [null, value => value],
  appSnackbar: [defaultSnackbarState, value => value],
  user: [null, value => value],
  fsUser: [null, value => value]
});

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalVisible, setModalVisible] = useState<null | string>(null);
  const [snackbar, setSnackbar] = useState<Snackbar>(defaultSnackbarState);
  const [user, setUser] = useState<null | FirebaseAuthTypes.User>(null);
  const [firestoreUser, setFirestoreUser] = useState<FirestoreUser | null>(null);

  const store: StoreContextType = {
    modal: [modalVisible, setModalVisible],
    appSnackbar: [snackbar, setSnackbar],
    user: [user, setUser],
    fsUser: [firestoreUser, setFirestoreUser]
  };

  return <StoreContext.Provider value={ store }>
    <PaperProvider theme={ theme }>
      { children }
    </PaperProvider>
  </StoreContext.Provider>;
};

export default StoreProvider;
