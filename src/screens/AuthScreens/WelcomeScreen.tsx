import React, { useCallback, useRef, useState } from "react";
import { Dimensions, FlatList, ListRenderItem, ScrollView, ViewToken } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import { welcomeScreenSlides } from "../../utils/mock";
import { WelcomeSlideType } from "../../utils/types";
import WelcomeScreenSlide from "../../components/WelcomeScreen/WelcomeScreenSlide";
import SliderHeader from "../../components/WelcomeScreen/SliderHeader";
import { AuthStackNavigationList } from "../../navigation/AuthStack";
import { AuthStackScreensList } from "../../navigation/screens";
import BrandButton from "../../components/common/BrandButton";

const { width } = Dimensions.get("window");

interface IProps {
  navigation: NativeStackNavigationProp<AuthStackNavigationList, AuthStackScreensList.WelcomeScreen>;
}

const WelcomeScreen: React.FC<IProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatRef = useRef<FlatList>(null);

  const renderItem: ListRenderItem<WelcomeSlideType> = ({ item }) => {
    return <WelcomeScreenSlide item={ item } />;
  };

  const onViewableItemsChanged = useCallback((info: { viewableItems: Array<ViewToken> }) => {
    if (info.viewableItems[0].index !== null) {
      setCurrentIndex(info.viewableItems[0].index);
    }
  }, []);

  const onSkipButtonPress = (): void => {
    if (flatRef.current && currentIndex !== 2) {
      flatRef.current.scrollToIndex({ animated: true, index: currentIndex + 1 });
    }
  };

  const signinNavigate = async (): Promise<void> => {
    await AsyncStorage.setItem("welcome", "visited");
    navigation.navigate(AuthStackScreensList.SigninScreen);
  };

  return <SafeAreaWrapper>
    <ScrollView>
      <SliderHeader
        currentIndex={ currentIndex }
        onSkipButtonPress={ onSkipButtonPress }
      />

      <FlatList
        ref={ flatRef }
        data={ welcomeScreenSlides }
        renderItem={ renderItem }
        horizontal
        decelerationRate={ 0 }
        snapToInterval={ width }
        snapToAlignment={ "center" }
        showsHorizontalScrollIndicator={ false }
        onViewableItemsChanged={ onViewableItemsChanged }
        viewabilityConfig={ { itemVisiblePercentThreshold: 50 } }
        keyExtractor={ (item, index) => String(index) }
      />

      <BrandButton
        onPress={ signinNavigate } text="Get Started"
        buttonStyle={ { marginHorizontal: 15 } }
      />
    </ScrollView>
  </SafeAreaWrapper>;
};

export default WelcomeScreen;
