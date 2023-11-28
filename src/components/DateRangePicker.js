import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DatePicker from "./DatePicker";
import { colors, fonts } from "../constants/theme";
import { style } from "../constants/style";

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);


  return (
    <View style={{
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.lightgray,
      ...style.flexRowSpace,
    }}>
      <TouchableOpacity
        onPress={() => setOpenStartDatePicker(true)}
        style={{
          backgroundColor: colors.white,
          ...style.shadow,
          paddingVertical: 5,
          paddingHorizontal: 10,
          width: "45%",
          marginTop: 5,
          borderRadius: 5,
          ...style.flexRowSpace,
        }}>
        <Text style={{
          ...fonts.h3,
        }}>
          From
        </Text>
        <Text style={{
          ...fonts.body1,
          marginLeft: 10,
        }}>
          {new Date(startDate).toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setOpenEndDatePicker(true)}
        style={{
          backgroundColor: colors.white,
          ...style.shadow,
          paddingVertical: 5,
          paddingHorizontal: 10,
          width: "45%",
          marginTop: 5,
          borderRadius: 5,
          ...style.flexRowSpace,
        }}>
        <Text style={{
          ...fonts.h3,
        }}>
          To
        </Text>
        <Text style={{
          ...fonts.body1,
          marginLeft: 10,
        }}>
          {new Date(endDate).toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      <DatePicker open={openStartDatePicker} setOpen={setOpenStartDatePicker} date={startDate}
                  setDate={setStartDate}
      />
      <DatePicker open={openEndDatePicker} setOpen={setOpenEndDatePicker} date={endDate}
                  setDate={setEndDate}
      />
    </View>
  );
};

export default DateRangePicker;
