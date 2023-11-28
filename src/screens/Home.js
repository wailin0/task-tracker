import { Alert, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../constants/theme";
import { useContext, useState } from "react";
import { style } from "../constants/style";
import icons from "../constants/icons";
import LocationModal from "./components/LocationModal";
import TaskModal from "./components/TaskModal";
import DispatchModal from "./components/DispatchModal";
import MenuModal from "./components/MenuModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation } from "@apollo/client";
import { CREATE_REPORT } from "../graphql/mutations";
import { Context } from "../components/Context";

const Home = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [task, setTask] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [hardware, setHardware] = useState("");
  const [quantity, setQuantity] = useState("");
  const [dispatch, setDispatch] = useState("True");
  const [note, setNote] = useState("");

  const [locationModal, setLocationModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [dispatchModal, setDispatchModal] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [startTimePicker, setStartTimePicker] = useState(false);
  const [endTimePicker, setEndTimePicker] = useState(false);

  const { user } = useContext(Context);
  const [createReport] = useMutation(CREATE_REPORT);

  const handleCreateReport = async () => {
    try {
      await createReport({
        variables: {
          startTime,
          endTime,
          hardware,
          quantity,
          dispatch,
          note,
          task,
          location,
          username: user.username,
        },
      });
      setLocation();
      setQuantity();
      setHardware();
      setDispatch();
      setNote();
      setTask();
      Alert.alert("", "your report has been submitted");
    } catch (e) {
      Alert.alert("error submitting report", e.toString());
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 50,
        }}
      >
        <View style={style.flexRowSpace}>
          <Text />
          <TouchableOpacity
            onPress={() => setMenuModal(true)}
            style={{
              width: 30, height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={icons.menu} style={{
              width: 18, height: 18,
            }} />
          </TouchableOpacity>
        </View>

        <Text style={{
          ...fonts.h3,
          marginTop: 10,
        }}>
          Location
        </Text>
        <TouchableOpacity
          onPress={() => setLocationModal(true)}
          style={{
            width: "100%",
            marginTop: 10,
            height: 40,
            marginBottom: 10,
            ...style.flexRowSpace,
            backgroundColor: "#fff",
            ...style.shadow,
            color: colors.black,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{
            ...fonts.body1,
            color: location ? colors.black : colors.gray,
          }}>
            {location ? location : "Select Location"}
          </Text>
          <Image source={icons.down} style={{
            width: 15, height: 15,
          }} />
        </TouchableOpacity>

        <Text style={{
          ...fonts.h3,
          marginTop: 10,
        }}>
          Task
        </Text>
        <TouchableOpacity
          onPress={() => setTaskModal(true)}
          style={{
            width: "100%",
            marginTop: 10,
            height: 40,
            marginBottom: 10,
            ...style.flexRowSpace,
            backgroundColor: "#fff",
            ...style.shadow,
            color: colors.black,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{
            ...fonts.body1,
            color: task ? colors.black : colors.gray,
          }}>
            {task ? task : "Select Task"}
          </Text>
          <Image source={icons.down} style={{
            width: 15, height: 15,
          }} />
        </TouchableOpacity>


        <View style={style.flexRowSpace}>
          <View style={{ flex: 1 }}>
            <Text style={{
              ...fonts.h3,
              marginTop: 10,
            }}>
              Start Time
            </Text>
            <TouchableOpacity
              onPress={() => setStartTimePicker(true)}
              style={{
                width: "70%",
                ...style.shadow,
                backgroundColor: "#fff",
                marginTop: 10,
                height: 40,
                ...style.flexRow,
                justifyContent: "center",
                alignItems: "center",
                color: colors.black,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{
                ...fonts.h2,
                fontWeight: "400",
              }}>
                {startTime.toLocaleTimeString([], { hour: "numeric", minute: "numeric" })}
              </Text>
              <Image source={icons.clock} style={{
                width: 18, height: 18, marginLeft: 10,
              }} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{
              ...fonts.h3,
              marginTop: 10,
            }}>
              End Time
            </Text>
            <TouchableOpacity
              onPress={() => setEndTimePicker(true)}
              style={{
                width: "70%",
                ...style.shadow,
                backgroundColor: "#fff",
                marginTop: 10,
                ...style.flexRow,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                color: colors.black,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{
                ...fonts.h2,
                fontWeight: "400",
              }}>
                {endTime.toLocaleTimeString([], { hour: "numeric", minute: "numeric" })}
              </Text>
              <Image source={icons.clock} style={{
                width: 18, height: 18, marginLeft: 10,
              }} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{
          ...fonts.h3,
          marginTop: 20,
        }}>
          Hardware
        </Text>
        <TextInput
          value={hardware}
          onChangeText={text => setHardware(text)}
          autoCapitalize="none"
          style={{
            width: "100%",
            marginTop: 10,
            height: 40,
            marginBottom: 10,
            color: colors.black,
            paddingLeft: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: colors.primary,
          }}
        />

        <Text style={{
          ...fonts.h3,
          marginTop: 10,
        }}>
          Quantity
        </Text>
        <TextInput
          value={quantity}
          keyboardType="number-pad"
          onChangeText={text => setQuantity(text)}
          autoCapitalize="none"
          style={{
            width: "100%",
            marginTop: 10,
            height: 40,
            color: colors.black,
            paddingLeft: 10,
            marginBottom: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: colors.primary,
          }}
        />

        <Text style={{
          ...fonts.h3,
          marginTop: 10,
        }}>
          New Dispatch
        </Text>
        <TouchableOpacity
          onPress={() => setDispatchModal(true)}
          style={{
            width: "100%",
            marginTop: 10,
            height: 40,
            marginBottom: 10,
            ...style.flexRowSpace,
            backgroundColor: "#fff",
            ...style.shadow,
            color: colors.black,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{
            ...fonts.body1,
            color: colors.black,
          }}>
            {dispatch}
          </Text>
          <Image source={icons.down} style={{
            width: 15, height: 15,
          }} />
        </TouchableOpacity>

        <Text style={{
          ...fonts.h3,
          marginTop: 10,
        }}>
          Note
        </Text>
        <TextInput
          value={note}
          onChangeText={text => setNote(text)}
          multiline={true}
          autoCapitalize="none"
          style={{
            width: "100%",
            marginTop: 10,
            marginBottom: 10,
            height: 100,
            textAlignVertical: "top",
            color: colors.black,
            paddingLeft: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: colors.primary,
          }}
        />

        <TouchableOpacity
          disabled={!(location && task && hardware && quantity && dispatch)}
          onPress={handleCreateReport}
          style={{
            height: 40,
            width: "100%",
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            ...style.shadow,
            backgroundColor: !(location && task && hardware && quantity && dispatch) ? colors.secondary : colors.primary,
          }}>
          <Text style={{
            ...fonts.body1,
            color: colors.white,
          }}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <LocationModal locationModal={locationModal} setLocationModal={setLocationModal} location={location}
                     setLocation={setLocation} />
      <TaskModal taskModal={taskModal} setTaskModal={setTaskModal} task={task} setTask={setTask} />
      <DispatchModal modal={dispatchModal} setModal={setDispatchModal} newDispatch={dispatch}
                     setNewDispatch={setDispatch} />
      <MenuModal modal={menuModal} setModal={setMenuModal} navigation={navigation} />
      {startTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          onChange={(event, date) => {
            const currentDate = date;
            setStartTimePicker(false);
            setStartTime(currentDate);
          }}
        />
      )}
      {endTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          onChange={(event, date) => {
            const currentDate = date;
            setEndTimePicker(false);
            setEndTime(currentDate);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
