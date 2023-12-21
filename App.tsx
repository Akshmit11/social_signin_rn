import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { ClerkProvider, SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import LoginScreen from './src/screens/LoginScreen';
import * as SecureStore from "expo-secure-store";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
const SignOut = () => {
  const { isLoaded,signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default function App() {

  const [fontsLoaded] = useFonts({
    'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={'pk_test_bGlnaHQtbGlvbi0zLmNsZXJrLmFjY291bnRzLmRldiQ'}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <SignedIn>
          <Text>You are signed in</Text>
          <SignOut/>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  heroSection: {
    flex: 0.5,
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  heroImage: {
    width: 50,
    height: 50,
    objectFit: "contain",
    marginVertical: 10
  },
  heroTitle: {
    fontSize: 30,
    fontFamily: "Inter-ExtraBold",
    marginBottom: 10
  },
  heroText: {
    textAlign: "center",
    fontFamily: "Inter-Regular",
    fontSize: 12
  },
  signInContainer: {
    flex: 0.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  socialButtonsContainer: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "lavender",
  },
  socialButtons: {
    width: 20,
    height: 20,
    objectFit: "contain",
  }
});
