import {Image, Modal, Text, TouchableOpacity, View} from "react-native";
import {colors, fonts} from "../../constants/theme";
import {style} from "../../constants/style";
import icons from "../../constants/icons";
import storage from "../../utils/storage";
import {useContext} from "react";
import {Context} from "../../components/Context";

const MenuModal = ({modal, setModal, navigation}) => {
    const {setAuth} = useContext(Context);

    return (
        <>
            {modal &&
                <Modal
                    visible={modal}
                    transparent={true}
                    onRequestClose={() => setModal(false)}
                >
                    <TouchableOpacity
                        onPress={() => setModal(false)}
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,.4)",
                            alignItems: "flex-end",
                            justifyContent: "flex-start",
                        }}>
                        <View style={{
                            right: 50,
                            borderRadius: 5,
                            top: 25,
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                            backgroundColor: colors.white,
                        }}>
                            {/*<TouchableOpacity*/}
                            {/*  onPress={() => {*/}
                            {/*    setModal(false);*/}
                            {/*    navigation.navigate("Account");*/}
                            {/*  }}*/}
                            {/*  style={{*/}
                            {/*    ...style.flexRow,*/}
                            {/*    marginBottom: 20,*/}
                            {/*  }}>*/}
                            {/*  <Image source={icons.history} style={{*/}
                            {/*    width: 24, height: 24,*/}
                            {/*  }} />*/}
                            {/*  <Text style={{*/}
                            {/*    ...fonts.h2,*/}
                            {/*    marginLeft: 10,*/}
                            {/*  }}>*/}
                            {/*    Account*/}
                            {/*  </Text>*/}
                            {/*</TouchableOpacity>*/}
                            <TouchableOpacity
                                onPress={() => {
                                    setModal(false);
                                    navigation.navigate("History");
                                }}
                                style={style.flexRow}>
                                <Image source={icons.history} style={{
                                    width: 24, height: 24,
                                }}/>
                                <Text style={{
                                    ...fonts.h2,
                                    marginLeft: 10,
                                }}>
                                    History
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={async () => {
                                    setModal(false);
                                    await storage.clearToken();
                                    setAuth(false);
                                }}
                                style={{...style.flexRow, marginTop: 20}}>
                                <Image source={icons.logout} style={{
                                    width: 24, height: 24,
                                }}/>
                                <Text style={{
                                    ...fonts.h2,
                                    marginLeft: 10,
                                }}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            }
        </>
    );
};

export default MenuModal;
