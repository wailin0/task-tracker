import { Text, TouchableOpacity } from "react-native";
import { colors, fonts } from "../constants/theme";

const PickerItem = ({ state, setState, setModal, item }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setState(item);
        setModal(false);
      }}
      style={{
        paddingVertical: 15,
        borderTopWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: state === item ? colors.lightgray : colors.white,
        borderTopColor: "#e9e4e4",
      }}>
      <Text style={{
        ...fonts.h2,
        fontWeight: "400",
      }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default PickerItem;
