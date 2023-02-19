import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import { createWorker } from "tesseract.js";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("placeholder");
  const worker = createWorker();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);
  const convertImageToText = useCallback(async () => {
    // if (!selectedImage) return;

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initilizes("eng");
    const { data } = await worker.recognize(selectedImage);
    setTextResult(data.text);
    console.log({ textResult });
  }, [worker, selectedImage]);

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
    setSelectedImage(data.uri);
  };

  //   const handleChangeImage = (e) => {
  //     if (e.target.files[0]) {
  //       setSelectedImage(e.target.files[0]);
  //     } else {
  //       setSelectedImage(null);
  //       setTextResult("");
  //     }
  //   };
  const handleChangeImage = useCallback(async () => {
    // if (!selectedImage) return;
    setSelectedImage(data.uri);
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initilizes("eng");
    const { data } = await worker.recognize(selectedImage);
    // setTextResult(data.text);
    setTextResult("hello?");
    console.log({ textResult });
  }, [worker, selectedImage]);

  const checkText = async () => {
    setSelectedImage(image);
  };

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      ></Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}

      <Button
        title="View Text"
        onPress={() => handleChangeImage()}
        // onPress={() => navigation.navigate("Text", { paramKey: textResult })}
      />
      <View style={styles.content}>
        {textResult && <Text> {textResult} </Text>}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  content: {
    padding: 8,
    backgroundColor: "#DEDEDE",
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 4,
  },
});
