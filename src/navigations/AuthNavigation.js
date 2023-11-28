import SignIn from "../screens/LogIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Sign In"
    >
      <Stack.Screen name="Sign In" component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
