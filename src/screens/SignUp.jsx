import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, Pressable } from "react-native";
import { supabase } from "../initSupabase.js";
import { Button, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function Auth() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    navigation.navigate("SignIn");
    Alert.alert(
      "Check your email for the confirmation link and then try logging in!"
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Sign Up for <Text style={styles.title}>Noteo</Text>
      </Text>
      <View style={styles.form}>
        <View style={styles.verticallySpaced}>
          <Input
            label="EMAIL"
            onChangeText={(text) => setEmail(text)}
            value={email}
            labelStyle={styles.label}
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            inputStyle={styles.input}
            autoCapitalize={"none"}
            selectionColor={"black"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="PASSWORD"
            onChangeText={(text) => setPassword(text)}
            labelStyle={styles.label}
            value={password}
            inputStyle={styles.input}
            secureTextEntry={true}
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            selectionColor={"black"}
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="CONFIRM PASSWORD"
            onChangeText={(text) => setConfirmPassword(text)}
            labelStyle={styles.label}
            value={confirmPassword}
            inputStyle={styles.input}
            secureTextEntry={true}
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            selectionColor={"black"}
            autoCapitalize={"none"}
          />
        </View>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
          style={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonLabel}
        />
      </View>
      <Pressable onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.signup}>Already have an account?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: "#2B2D42",
  },
  header: {
    fontSize: 48,
    color: "#8D99AE",
    fontFamily: "Poppins",
    fontWeight: "800",
  },
  title: {
    color: "#EF233C",
  },
  form: {
    marginTop: 20,
    backgroundColor: "#ffffff20",
    borderRadius: 10,
    padding: 12,
  },
  label: {
    fontSize: 14,
    color: "#8D99AE",
    fontFamily: "Lexend Deca",
  },
  input: {
    backgroundColor: "#EDF2F4",
    borderRadius: 10,
    marginTop: 4,
    paddingHorizontal: 12,
    fontFamily: "Lexend Deca",
  },
  buttonsContainer: {
    flexDirection: "col",
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#EF233C",
  },
  buttonLabel: {
    fontFamily: "Lexend Deca",
  },
  signup: {
    marginTop: 10,
    textAlign: "center",
    color: "#8D99AE",
    textDecorationLine: "underline",
  },
});
