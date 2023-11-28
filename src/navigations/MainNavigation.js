import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import History from "../screens/History";
import HistoryDetails from "../screens/HistoryDetails";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="History Details" component={HistoryDetails} options={{ title: "" }} />

    </Stack.Navigator>
  );
};

export default MainNavigation;
