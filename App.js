import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./src/navigations/rootNavigation";
import { Context } from "./src/components/Context";
import MainNavigation from "./src/navigations/MainNavigation";
import AuthNavigation from "./src/navigations/AuthNavigation";
import storage from "./src/utils/storage";
import jwt_decode from "jwt-decode";
import Loading from "./src/components/Loading";


const App = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = async () => {
      try {
        setLoading(true);
        const token = await storage.getToken();

        if (token) {
          if (token.length < 3) {
            await storage.getToken();
            setLoading(false);
          } else {
            const { user_id, user_name } = jwt_decode(token);
            setUser({
              id: user_id,
              username: user_name,
            });
            setAuth(true);
            setLoading(false);
          }
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    start();
  }, []);


  if (loading) {

    return <Loading />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <Context.Provider value={{ auth, setAuth, user, setUser }}>
        {auth
          ? <MainNavigation />
          : <AuthNavigation />
        }
      </Context.Provider>
    </NavigationContainer>
  );
};

export default App;
