import React from "react";
import { View, Flatlist, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../initSupabase.js";
import { StyleSheet, Alert, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";
import NoteList from "../components/NoteList.jsx";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Your Notes</Text>
      </View>
      {notes && (
        <NoteList notes={notes} refresh={getProfile} refreshing={loading} />
      )}
      {loading && <Text style={{ color: "white" }}>Loading...</Text>}
      <Button
        title="Capture Note Image"
        onPress={() => navigation.navigate("OCR")}
      ></Button>
      <Button
        title="Create Note"
        onPress={() =>
          navigation.navigate("CreateNote", {
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Oreo-Two-Cookies.png/2560px-Oreo-Two-Cookies.png",
            content:
              "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
            title: "Pacer Test",
          })
        }
      ></Button>
      <Button title="Refresh" onPress={() => getProfile()}></Button>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: "#2B2D42",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    color: "#EF233C",
    fontFamily: "Poppins",
    fontWeight: "800",
  },
});
