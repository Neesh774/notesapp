import { useNavigation } from "@react-navigation/native";
import { ChevronRight, X } from "lucide-react-native";
import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import formatDate from "../formatDate";
import { useMemo, useState } from "react";
import { Input } from "react-native-elements";
import Fuse from "fuse.js";

export default function NoteList({ notes }) {
  const [search, setSearch] = useState(null);
  const filteredNotes = useMemo(() => {
    if (!search) return notes;
    const fuse = new Fuse(notes, {
      keys: ["title", "content"],
    });

    return fuse.search(search).map((result) => result.item);
  }, [search]);

  return (
    <View>
      <Input
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        inputContainerStyle={{
          borderBottomWidth: 0,
        }}
      />
      <FlatList
        style={styles.list}
        data={filteredNotes}
        renderItem={(note) => <Note note={note.item} />}
        keyExtractor={(note) => note.id}
      />
    </View>
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
  search: {
    backgroundColor: "#ffffff20",
    borderRadius: 1000,
    padding: 12,
    color: "white",
  },
});
