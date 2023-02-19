import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export default function Note({ route }) {
  const note = route.params.note;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Content</Text>
      <Text style={styles.content}>{note.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    padding: 8,
    backgroundColor: "#DEDEDE",
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 4,
  },
});
