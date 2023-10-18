import { View, Text, Image, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
          *[_type == "featured"]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->
          },
        }
      `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  // console.log(featuredCategories);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/*Header */}
      <View className="flex-row items-center mx-4 space-x-2 pd-4">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="rounded-full w-9 bg-gray h-9 pd-4"
        />
        <View className="flex-1">
          <Text className="text-xs font-bold text-gray">Deliver Now!</Text>
          <Text className="text-xl font-bold">
            Current Location <ChevronDownIcon color="#00CCBB" size={20} />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/*Search */}
      <View className="flex-row items-center mx-4 my-2 mb-2 space-x-2 pd-2">
        <View className="flex-row flex-1 p-3 space-x-2 bg-zinc-200">
          <MagnifyingGlassIcon color={"gray"} size={20} />
          <TextInput
            placeholder="Resturants and cuisines"
            keyboardType="default"
            style={{
              flex: 1,
              fontSize: 18,
            }}
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>
      {/* Boby */}
      <ScrollView
        className="mt-2 bg-zinc-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Category */}
        <Categories />
        {/* Offers near you! */}

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}

        {/* Featured Row */}
        {/* <FeaturedRow
          id="123"
          title="Featured"
          description="Paid placement from out partners"
          featuredCategory="featured"
        /> */}
        {/* Tasty Discounts */}
        {/* <FeaturedRow
          id="456"
          title="Tasty Discounts"
          description="Everyone's been enjoying these juicy discounts!"
          featuredCategory="featured"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
