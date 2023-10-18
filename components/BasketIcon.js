import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";

const BasketIcon = () => {
  const item = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const total = useSelector(selectBasketTotal);

  if (item.length === 0) return null;

  return (
    <View className="absolute z-50 w-full bottom-10">
      <TouchableOpacity
        className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1"
        onPress={() => {
          navigation.navigate("Basket");
        }}
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2 rounded-sm">
          {item.length}
        </Text>
        <Text className="flex-1 text-lg font-extrabold text-center text-white">
          View Basket
        </Text>
        <Text className="text-lg font-extrabold text-white">${total}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
