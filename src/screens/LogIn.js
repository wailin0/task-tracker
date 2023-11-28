import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../constants/theme";
import { useContext, useState } from "react";
import { style } from "../constants/style";
import icons from "../constants/icons";
import { Context } from "../components/Context";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import jwt_decode from "jwt-decode";
import storage from "../utils/storage";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setAuth, setUser } = useContext(Context);

  const [Login] = useMutation(LOGIN);

  const handleLogin = async () => {
    try {

      const response = await Login({
        variables: {
          username,
          password,
        },
      });
      if (response.data.UserLogIn.error) {
        Alert.alert("", "invalid username or password");
      } else {
        const { user_id, user_name } = jwt_decode(response.data.UserLogIn.accessToken);
        await storage.saveToken(response.data.UserLogIn.accessToken);
        setUser({
          id: user_id,
          username: user_name,
        });
        setAuth(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: "center",
      marginHorizontal: 20,

    }}>
      {/*<Image source={{ uri: "https://cdn.pixabay.com/photo/2016/12/27/13/10/logo-1933884_640.png" }}*/}
      {/*       style={{*/}
      {/*         width: 150, height: 150,*/}
      {/*         marginBottom: 100,*/}
      {/*         alignSelf: "center",*/}
      {/*       }}*/}
      {/*       resizeMode="contain"*/}
      {/*/>*/}


      <Text style={{
        ...fonts.h3,
        marginTop: 10,
      }}>
        Username
      </Text>
      <TextInput
        value={username}
        onChangeText={text => setUsername(text)}
        autoCapitalize="none"
        style={{
          width: "100%",
          marginTop: 10,
          height: 40,
          color: colors.black,
          paddingLeft: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: colors.primary,
        }}
      />

      <Text style={{
        ...fonts.h3,
        marginVertical: 10,
      }}>
        Password
      </Text>
      <View style={style.flexRowSpace}>
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry={passwordVisible}
          style={{
            width: "100%",
            color: colors.black,
            paddingLeft: 10,
            paddingRight: 60,
            borderColor: colors.primary,
            height: 40,
            borderWidth: 1,
            borderRadius: 5,
          }}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={{
            height: "100%", width: 50,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right: 0,
          }}>
          <Image source={passwordVisible ? icons.hide : icons.show}
                 style={{
                   width: 24, height: 20,
                 }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        disabled={!(username && password)}
        onPress={handleLogin}
        style={{
          height: 40,
          width: "100%",
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
          ...style.shadow,
          borderRadius: 5,
          backgroundColor: !(username && password) ? colors.secondary : colors.primary,
        }}>
        <Text style={{
          ...fonts.body1,
          color: colors.white,
        }}>
          Log In
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LogIn;
