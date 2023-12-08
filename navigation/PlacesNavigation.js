import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PlacesListScreen from "../screens/PlacesListScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";

const Stack = createStackNavigator();

const PlacesNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="All Places"
          component={PlacesListScreen}
          options={({ navigation, route }) => ({
            headerTitle: "All places",
            headerTitleStyle: {
              color: "blue", // Set the text color to blue
            },
            headerRight: () => (
              <Ionicons
                name="ios-add"
                size={32}
                color="orange"
                onPress={() => navigation.navigate("NewPlace")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="NewPlace"
          component={NewPlaceScreen}
          options={{
            headerTitle: "Add Place",
            headerTitleStyle: {
              color: "blue", // Set the text color to blue
            },
          }}
        />
        <Stack.Screen
          name="PlaceDetailScreen"
          component={PlaceDetailScreen}
          options={({ route }) => ({
            headerTitle: route.params.placeTitle,
            headerTitleStyle: {
              color: "blue", // Set the text color to blue
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigation;
