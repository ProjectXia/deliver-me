import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  selectBasketItems,
  removeFromBasket,
  selectBasketTotal,
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  const [groupedItemInBasket, setGroupedItemInBasket] = useState([]);

  useEffect(() => {
    const groupItems = items.reduce((result, item) => {
      (result[item.id] = result[item.id] || []).push(item);
      return result;
    }, {});
    setGroupedItemInBasket(groupItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-slate-100">
        <View className="p-5 border-b border-[#00ccBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-slate-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute rounded-full bg-slate-100 top-3 right-5"
          >
            <XCircleIcon color={"#00CCBB"} height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center px-4 py-3 my-5 space-x-4 bg-white">
          <Image
            source={require("../assets/bike.png")}
            className="p-4 rounded-full h-7 w-7 bg-slate-300"
          />
          <Text className="flex-1">Deliver in 50-70 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="divide-y divide-zinc-200"
          style={{ flex: 1 }}
          // showsHorizontalScrollIndicator={Platform.OS === "web" ? true : false}
        >
          {Object.entries(groupedItemInBasket).map(([key, item]) => (
            <View
              key={key}
              className="flex-row items-center px-3 py-2 space-x-4 bg-white"
            >
              <Text className="text-[#00CCBB]">{item.length} x</Text>
              <Image
                source={{ uri: urlFor(item[0]?.image).url() }}
                className="w-12 h-12 rounded-full"
              />
              <Text className="flex-1">{item[0]?.name}</Text>
              <Text>${item[0]?.price}</Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(removeFromBasket({ id: key }));
                }}
              >
                <Text className="text-[#00CCBB]">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 mt-5 space-y-4 bg-white ">
          <View className="flex-row justify-between">
            <Text className="text-slate-400">Subtotal</Text>
            <Text className="text-slate-400">${basketTotal}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-slate-400">Delivery Fee</Text>
            <Text className="text-slate-400">${5.99}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold text-slate-400">
              ${basketTotal + 5.99}
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-lg bg-[#00CCBB] p-4 items-center"
            onPress={() => {
              navigation.navigate("PreparingOrderScreen");
            }}
          >
            <Text className="text-lg font-bold text-white">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
