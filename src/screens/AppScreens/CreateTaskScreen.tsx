import React from "react";
import { Text } from "react-native";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import FocusAwareStatusBar from "../../components/common/FocusAwareStatusBar";

const CreateTaskScreen: React.FC = () => {
  return <SafeAreaWrapper>
    <FocusAwareStatusBar barStyle="dark-content" />

    <Text>Create Task Screen</Text>
  </SafeAreaWrapper>;
};

export default CreateTaskScreen;
