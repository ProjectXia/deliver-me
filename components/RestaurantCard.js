import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      className="mb-1 mr-3 bg-white shadow"
      onPress={() => {
        dispatch(
          setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
          })
        );
        navigation.navigate("Restaurant");
        // , {
        //   id,
        //   imgUrl,
        //   title,
        //   rating,
        //   genre,
        //   address,
        //   short_description,
        //   dishes,
        //   long,
        //   lat,
        // });
      }}
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="w-64 rounded-sm h-36"
      />

      <View className="px-3 pb-4">
        <Text className="pt-2 text-lg font-bold">{title}</Text>

        <View className="flex-row items-center space-x-1">
          <StarIcon color={"green"} size={22} opacity={0.5} />
          <Text className="text-xs text-zinc-500">
            <Text className="text-green-500">{rating}</Text> . {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color={"gray"} size={22} opacity={0.4} />
          <Text className="text-xs text-zinc-500">Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
