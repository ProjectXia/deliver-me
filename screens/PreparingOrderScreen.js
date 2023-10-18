import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/orderloading.gif")}
        animation={"slideInUp"}
        iterationCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation={"slideInUp"}
        iterationCount={2}
        className="my-10 text-lg font-bold text-center text-white"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      {/* <Progress.Circle size={60} indeterminate={true} color="orange" /> */}
      <Progress.Bar size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
