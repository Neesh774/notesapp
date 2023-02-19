import { useNavigation } from "@react-navigation/native";
import { ChevronRight } from "lucide-react-native";
import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import formatDate from "../formatDate";

export default function NoteList({ notes }) {
  return (
    <FlatList
      style={styles.list}
      data={notes}
      renderItem={(note) => <Note note={note.item} />}
      keyExtractor={(note) => note.id}
    />
  );
}

export function Note({ note }) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.note}
      onPress={() => navigation.navigate("Note", { note })}
    >
      <View>
        <Text style={styles.noteLabel}>{note.title}</Text>
        <Text style={styles.date}>{formatDate(note.created_at)}</Text>
      </View>
      <ChevronRight size={24} style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  note: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff10",
    borderRadius: 10,
  },
  noteLabel: {
    fontSize: 18,
    color: "white",
    fontFamily: "Lexend Deca",
  },
  icon: {
    color: "#8D99AE",
  },
  date: {
    fontSize: 12,
    color: "#8D99AE",
    fontFamily: "Lexend Deca",
  },
});
