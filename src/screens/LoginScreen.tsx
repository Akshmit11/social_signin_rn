import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })
    const onPress = async() => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    };
  return (
    <>
        <View style={styles.heroSection}>
            <Image
                source={require("../../assets/logo.png")}
                style={styles.heroImage}
            />
            <Text style={styles.heroTitle}>
            AppName
            </Text>
            <Text style={styles.heroText}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam cumque officia 
            </Text>
        </View>
        <View style={styles.signInContainer}>
            <Text style={{
            fontFamily: "Inter-Medium",
            opacity: 0.5
            }}>Continue with</Text>
            <View style={styles.signInButtonsContainer}>
            <TouchableOpacity style={styles.socialButtonsContainer}
              onPress={onPress}
            >
                <Image 
                source={require("../../assets/images/google_login.png")}
                style={styles.socialButtons}
                />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButtonsContainer, {
                borderColor: "black",
                borderWidth: 1.4
            }]}>
                <Image 
                source={require("../../assets/images/apple_login.png")}
                style={styles.socialButtons}
                />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButtonsContainer, {
                borderColor: "#0033ff",
                borderWidth: 1.4
            }]}>
                <Image 
                source={require("../../assets/images/facebook_login.png")}
                style={styles.socialButtons}
                />
            </TouchableOpacity>
            </View>

            
            <Text style={{
            fontFamily: "Inter-Regular",
            fontSize: 12,
            marginTop: 16
            }}>
            By Continuing, you agree to our <Text style={{
                fontFamily: "Inter-Medium",
                textDecorationLine: "underline",
            }}>
                Terms & Conditions
            </Text>
            .
            </Text>
        </View>
      </>
  )
}

export default LoginScreen

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
  