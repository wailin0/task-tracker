import {Modal, ScrollView, View} from "react-native";
import {style} from "../constants/style";

const PickerModal = ({data, renderItem, modal, setModal}) => {
    return (
        <Modal
            visible={modal}
            transparent={true}
            onRequestClose={() => setModal(false)}
        >
            <View style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,.5)",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <View style={{
                    width: "90%", marginVertical: 20,
                    justifyContent: "center",
                }}>
                    <View style={{
                        ...style.shadow,
                        backgroundColor: "#fff",
                        marginVertical: 20,
                        borderRadius: 5,
                    }}>

                        <ScrollView>
                            {data.map((item, index) =>
                                renderItem(item, index),
                            )}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default PickerModal
