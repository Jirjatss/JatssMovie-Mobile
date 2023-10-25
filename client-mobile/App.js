import Home from "./src/screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Detail from "./src/screens/Detail";
import Ionicons from "@expo/vector-icons/Ionicons";
import Account from "./src/screens/Account";
import Search from "./src/screens/Search";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const client = new ApolloClient({
  uri: "https://api.jirjatss.online/",
  cache: new InMemoryCache(),
});

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingTop: 13,
          borderBlockColor: "#1a181b",
          backgroundColor: "#1a181b",
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "md-home" : "md-home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "ios-search-sharp" : "ios-search-outline";
          } else if (route.name === "Video") {
            iconName = focused ? "play-circle-sharp" : "play-circle-outline";
          } else if (route.name === "You") {
            iconName = focused ? "person-circle-sharp" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: "#ffd40f",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="You" component={Account} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#282424",
            },
          }}
        >
          <Stack.Screen
            name="home"
            component={TabNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Details"
            component={Detail}
            options={({ route }) => ({
              title: route.params.name,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
