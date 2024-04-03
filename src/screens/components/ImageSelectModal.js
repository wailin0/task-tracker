import {Image, Modal, Text, TouchableOpacity, View} from "react-native";
import {colors, fonts} from "../../constants/theme";
import {style} from "../../constants/style";
import icons from "../../constants/icons";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

const ImageSelectModal = ({modal, setModal, setPhoto}) => {

    const selectPhoto = async () => {
        const response = await launchImageLibrary({
            mediaType: "photo",
            selectionLimit: 1,
            includeExtra: true,
            quality: 0.5,
        });
        if (!response.didCancel) {
            setPhoto(response.assets[0].uri);
            setModal(false)
        }
    };

    const selectCamera = async () => {
        const response = await launchCamera({
            mediaType: "photo",
            quality: 0.5,
            includeExtra: true,
        });
        if (!response.didCancel) {
            setPhoto(response.assets[0].uri);
            setModal(false)
        }
    };


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
                            backgroundColor: "rgba(0,0,0,.2)",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <View style={{
                            borderRadius: 5,
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                            backgroundColor: colors.white,
                        }}>
                            <TouchableOpacity
                                onPress={selectCamera}
                                style={style.flexRow}>
                                <Image source={icons.camera} style={{
                                    width: 24, height: 24,
                                }}/>
                                <Text style={{
                                    ...fonts.h2,
                                    marginLeft: 10,
                                }}>
                                    Camera
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={selectPhoto}
                                style={{...style.flexRow, marginTop: 20}}>
                                <Image source={icons.gallery} style={{
                                    width: 24, height: 24,
                                }}/>
                                <Text style={{
                                    ...fonts.h2,
                                    marginLeft: 10,
                                }}>
                                    Gallery
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            }
        </>
    );
};

export default ImageSelectModal;
