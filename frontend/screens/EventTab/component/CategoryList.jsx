import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { categories } from "../data/category";
import { Category } from "./Category";

export const CategoryList = ({ handlecheckCategory, data }) => {
    const { flatList, container } = styles;
    return (
        <FlatList
            contentContainerStyle={flatList}
            numColumns={2}
            data={categories}
            keyExtractor={(category) => String(category.id)}
            renderItem={({ item }) => <Category id={item.id} name={item.name} image={item.image} onPress={handlecheckCategory} />}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        alignItems: "center",
    },
});
