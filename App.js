import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) => images.map((image) => Asset.loadAsync(image));

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  async function prepare() {
    try {
      const fonts = loadFonts([Ionicons.font]);
      const images = loadImages([require("./dog-face.webp")]);
      await Promise.all([...fonts, ...images]);
    } catch (e) {
      console.warn(e);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
    }
  };
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  useEffect(() => {
    prepare();
  }, [])

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}
