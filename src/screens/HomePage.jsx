import { useState, useEffect } from "react";
import { supabase } from "../initSupabase.js";
import { StyleSheet, View, Alert, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";
import NoteList from "../components/NoteList.jsx";
import { useNavigation } from "@react-navigation/native";

export default function HomePage({ route }) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  const session = route.params.session;

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("notes")
        .select(`*`)
        .eq("user", session?.user.id);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setNotes(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {notes && <NoteList notes={notes} />}
      <Button
        title="Go to OCR"
        onPress={() => navigation.navigate("OCR")}
      ></Button>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: "#2B2D42",
  },
});
