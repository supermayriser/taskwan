import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBarStyle } from "react-native";

interface IProps {
  forcedColor?: string,
  barStyle?: StatusBarStyle,
  children: ReactNode
}

const SafeAreaWrapper: React.FC<IProps> = ({ children, forcedColor, barStyle }) => {
  return <SafeAreaView
    style={ { flex: 1, backgroundColor: forcedColor ? forcedColor : "#FFFFFF" } }
    edges={ ["top"] }
  >
    { children }
  </SafeAreaView>;
};

export default SafeAreaWrapper;
