import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant, setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);
  // const {
  //   params: {
  //     id,
  //     imgUrl,
  //     title,
  //     rating,
  //     genre,
  //     address,
  //     short_description,
  //     dishes,
  //     long,
  //     lat,
  //   },
  // } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(restaurant.imgUrl).url() }}
            className="w-full h-56 p-4 bg-slate-400"
          />
          <TouchableOpacity
            className="absolute p-2 rounded-full top-14 left-5 bg-slate-100"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowLeftIcon size={20} color={"#00CCBB"} />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{restaurant.title}</Text>
            <View className="flex-row my-2 space-x-2">
              <View className="flex-row items-center space-x-1">
                <StarIcon size={22} color={"green"} opacity={0.5} />
                <Text className="text-xs text-slate-500">
                  <Text className="text-green-500">{restaurant.rating}</Text> .{" "}
                  {restaurant.genre}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapIcon size={22} color={"gray"} opacity={0.4} />
                <Text className="text-xs text-slate-500">
                  Nearby . {restaurant.address}
                </Text>
              </View>
            </View>
            <Text className="pb-4 mt-2 text-slate-500">
              {restaurant.short_description}
            </Text>
          </View>
          {/* Button */}
          <TouchableOpacity className="flex-row items-center p-4 space-x-2 border-y border-slate-300">
            <QuestionMarkCircleIcon size={20} color={"gray"} opacity={0.6} />
            <Text className="flex-1 pl-2 font-bold text-md">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color={"#00CCBB"} />
          </TouchableOpacity>
        </View>
        {/* Body */}
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 text-xl font-bold">Menu</Text>
          {/* dishrows */}
          {restaurant.dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
