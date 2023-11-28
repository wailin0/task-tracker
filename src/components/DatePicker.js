import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors, fonts } from "../constants/theme";

const DatePicker = ({ open, setOpen, date, setDate, minimumDate, maximumDate }) => {

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === "ios");
    setDate(currentDate);
  };

  const picker = () => {
    return (
      <DateTimePicker
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        testID="dateTimePicker"
        value={date}
        display={Platform.OS === "android" ? "default" : "inline"}
        onChange={onChangeDate}
        textColor="#000"
        themeVariant="light"
      />
    );
  };

  return (
    <>
      {open &&
        <>
          {Platform.OS === "android"
            ? picker()
            :
            <Modal
              transparent
              onRequestClose={() => setOpen(false)}>
              <View style={styles.iosDatePicker}>
                <View style={{
                  backgroundColor: colors.white,
                  padding: 10,
                  marginHorizontal: 20,
                  borderRadius: 5,
                }}>
                  {picker()}
                  <TouchableOpacity
                    onPress={() => setOpen(false)}
                    style={{
                      backgroundColor: colors.primary,
                      marginBottom: 20,
                    }}
                  >
                    <Text style={{ ...fonts.body1 }}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          }
        </>
      }
    </>
  );
};

const styles = StyleSheet.create({
  iosDatePicker: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.3)",
    justifyContent: "center",

  },
});

export default DatePicker;
