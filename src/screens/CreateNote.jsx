import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Image, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Commponent } from "react";
import { supabase } from "../initSupabase";

export default function CreateNote({ route }) {
  const [title, setTitle] = useState(route.params.title);
  const [image, setImage] = useState(route.params.image);
  const [content, setContent] = useState(route.params.content);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.header}>New Note</Text>
        <ScrollView style={styles.form}>
          <TouchableWithoutFeedback>
            <Input
              label="TITLE"
              onChangeText={(text) => setTitle(text)}
              value={title}
              labelStyle={styles.label}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              inputStyle={styles.input}
              autoCapitalize={"none"}
              selectionColor={"black"}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Input
              label="CONTENT"
              onChangeText={(text) => setContent(text)}
              value={content}
              labelStyle={styles.label}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              inputStyle={[styles.input, { padding: 4, paddingBottom: 60 }]}
              multiline={true}
              autoCapitalize={"none"}
              selectionColor={"black"}
            />
          </TouchableWithoutFeedback>
          {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
        </ScrollView>
        <Button
          title="Submit Note"
          // onPress={() => textFinder()}
          onPress={async () => {
            await supabase.from("notes").insert({
              title: title,
              content: content,
              user: "e3caf174-7f5f-4831-824d-299790903344",
            });
            navigation.navigate("HomePage");
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 48,
    flex: 1,
    backgroundColor: "#2B2D42",
  },
  header: {
    fontSize: 32,
    color: "#EF233C",
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
