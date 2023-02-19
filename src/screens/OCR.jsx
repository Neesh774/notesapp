import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { Aperture, ChevronRight, SwitchCamera } from "lucide-react-native";
import { supabase } from "../initSupabase";
import { decode } from "base64-arraybuffer";
// import TextRecognition from "react-native-text-recognition";
// import ml from "@react-native-firebase/mlkit";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("testing");
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text> No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setSelectedImage(data.uri);
    }
  };

  const getText = async () => {
    // get api route
    console.log("Getting text");

    // get file obj from uri
    const response = await fetch(selectedImage);
    const blob = await response.blob();
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });
    console.log(base64);

    const imageName = selectedImage.split("/").pop();
    const { data, error } = await supabase.storage
      .from("notes")
      .upload(imageName, decode(base64), {
        contentType: "image/jpg",
      });
    if (error || !data || !data.path) {
      Alert.alert("Error");
      console.error(error);
      return;
    }
    console.log(data, error);
    const img = await fetch("http://10.189.36.187:8000/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ img: data.path }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .catch((err) => console.error(err));
    console.log(img);
    navigation.navigate("CreateNote", {
      image: data.path,
      title: "",
      content: "",
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatio}
            x
            type={type}
            ratio={"1:1"}
          />
        </View>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{
              aspectRatio: 1,
              height: "40%",
            }}
          />
        )}
      </View>
      <View style={styles.footer}>
        <Pressable
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <SwitchCamera width={48} height={48} color="white" />
        </Pressable>
        <Pressable
          onPress={() => {
            takePicture();
          }}
        >
          <Aperture
            width={64}
            height={64}
            color="white"
            style={{
              opacity: camera ? 1 : 0.5,
            }}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            if (selectedImage) {
              getText();
            }
            // navigation.navigate("CreateNote", {
            //   image:
            //     "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Oreo-Two-Cookies.png/2560px-Oreo-Two-Cookies.png",
            //   content:
            //     "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
            //   title: "Pacer Test",
            // });
          }}
        >
          <ChevronRight
            width={48}
            height={48}
            color="white"
            style={{
              opacity: selectedImage ? 1 : 0.5,
            }}
          />
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: "#2B2D42",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    aspectRatio: 1,
    width: "100%",
  },
  content: {
    padding: 8,
    backgroundColor: "#DEDEDE",
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 4,
  },
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 48,
    backgroundColor: "#0F1123",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
