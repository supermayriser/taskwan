/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./src/navigation/Navigation";
import StoreProvider from "./src/store/store";
import SnackNotifications from "./src/Services/SnackNotifications";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  "Require cycle:"
]);

const App = () => {
  return <SafeAreaProvider>
    <StoreProvider>
      <SnackNotifications>
        <Navigation />
      </SnackNotifications>
    </StoreProvider>
  </SafeAreaProvider>;
};

export default App;
