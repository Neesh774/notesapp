import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export default function Note({ route }) {
  const note = route.params.note;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Picture</Text>
      <Text style={styles.content}>TBD</Text>
      <Text style={styles.header}>Summary</Text>
      <Text style={styles.content}>TBD</Text>
      <Text style={styles.header}>Content</Text>
      <Text style={styles.content}>{note.content.trim()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2D42",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#EF233C",
  },
  content: {
    padding: 8,
    backgroundColor: "#0F1123",
    borderWidth: 1,
    borderColor: "#45475B",
    borderRadius: 4,
    color: "white",
    fontFamily: "Lexend Deca",
  },
});
