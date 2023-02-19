import { useState, useEffect } from "react";
import { supabase } from "../initSupabase.js";
import { StyleSheet, View, Alert, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";
import NoteList from "../components/NoteList.jsx";
import { useNavigation } from "@react-navigation/native";

export default function Account({ route }) {
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
    <View>
      {notes && <NoteList notes={notes} />}
      <Button onPress={() => navigation.navigate("OCR")}>
        <Text>OCR</Text>
      </Button>
      <Button onPress={() => supabase.auth.signOut()}>
        <Text>Sign out</Text>
      </Button>
      <Text> {route.params.paremKey} </Text>
    </View>
  );
}
