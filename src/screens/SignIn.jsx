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
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    navigation.navigate("Account");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Sign In to <Text style={styles.title}>Noteo</Text>
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
        <Button
          title="Sign In"
          disabled={loading}
          onPress={() => signInWithEmail()}
          style={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonLabel}
        />
      </View>
      <Pressable onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signup}>Don't have an account?</Text>
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
