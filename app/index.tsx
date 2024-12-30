import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Page" component={Page} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Page = () => {
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Root;
