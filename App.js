import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import Note from "./src/screens/Note";
import OCR from "./src/screens/OCR";
import Text from "./src/screens/Text";
import CreateNote from "./src/screens/CreateNote";
import HomePage from "./src/screens/HomePage";

import Account from "./src/screens/HomePage";
import { supabase } from "./src/initSupabase.js";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [loaded] = useFonts({
    "Lexend Deca": require("./assets/LexendDeca-VariableFont_wght.ttf"),
    Poppins: require("./assets/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {session && session.user ? (
        <AppStack.Navigator>
          <AppStack.Screen
            name="Account"
            component={Account}
            initialParams={{ session }}
            options={{
              headerShown: false,
            }}
          />
          <AppStack.Screen
            name="HomePage"
            component={HomePage}
            initialParams={{ session }}
            options={{
              headerShown: false,
            }}
          />
          <AppStack.Screen
            name="OCR"
            component={OCR}
            options={{
              title: "New Note",
              headerStyle: {
                backgroundColor: "#2B2D42",
              },
              headerTintColor: "#EF233C",
              headerBackTitleVisible: false,
              headerShadowVisible: false,
            }}
          />
          <AppStack.Screen
            name="Note"
            component={Note}
            options={({ route }) => ({
              title: route.params.note.title,
              headerStyle: {
                backgroundColor: "#2B2D42",
              },
              headerTintColor: "#EF233C",
              headerBackTitleVisible: false,
              headerShadowVisible: false,
            })}
          />
          <AppStack.Screen name="Text" component={Text} />
          <AppStack.Screen
            name="CreateNote"
            component={CreateNote}
            options={{
              title: "Create Note",
              headerStyle: {
                backgroundColor: "#2B2D42",
              },
              headerTintColor: "#EF233C",
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: "Sign In",
              headerStyle: {
                backgroundColor: "#2B2D42",
              },
              headerTintColor: "#EF233C",
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <AuthStack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: "Sign Up",
              headerStyle: {
                backgroundColor: "#2B2D42",
              },
              headerTintColor: "#EF233C",
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
