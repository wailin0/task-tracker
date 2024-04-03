import {
    ActivityIndicator,
    Alert,
    Image,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {colors, fonts} from "../constants/theme";
import {useContext, useEffect, useState} from "react";
import {style} from "../constants/style";
import icons from "../constants/icons";
import LocationModal from "./components/LocationModal";
import TaskModal from "./components/TaskModal";
import DispatchModal from "./components/DispatchModal";
import MenuModal from "./components/MenuModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useMutation} from "@apollo/client";
import {CREATE_REPORT} from "../graphql/mutations";
import {Context} from "../components/Context";
import Geolocation from "@react-native-community/geolocation";
import {promptForEnableLocationIfNeeded} from "react-native-android-location-enabler";
import ImageSelectModal from "./components/ImageSelectModal";
import {uploadFile} from "../utils/helper";

const Home = ({navigation}) => {
    const [location, setLocation] = useState("");
    const [task, setTask] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [hardware, setHardware] = useState("");
    const [quantity, setQuantity] = useState("");
    const [dispatch, setDispatch] = useState("True");
    const [note, setNote] = useState("");
    const [userLocation, setUserLocation] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [apiCalling, setApiCalling] = useState(false);

    const [imageSelectModal, setImageSelectModal] = useState(false);
    const [locationModal, setLocationModal] = useState(false);
    const [taskModal, setTaskModal] = useState(false);
    const [dispatchModal, setDispatchModal] = useState(false);
    const [menuModal, setMenuModal] = useState(false);
    const [startTimePicker, setStartTimePicker] = useState(false);
    const [endTimePicker, setEndTimePicker] = useState(false);
    const [validation, setValidation] = useState({
        location: "",
        task: "",
        hardware: "",
        quantity: "",
        photo: ""
    });

    const {user} = useContext(Context);
    const [createReport] = useMutation(CREATE_REPORT);

    const handleGetCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            info => {
                setUserLocation(info.coords);
            },
            async error => {
                if (error.code === 1) {
                    Alert.alert(
                        "",
                        "Please allow location permission",
                        [
                            {
                                text: "OK", onPress: async () => {
                                    Geolocation.requestAuthorization()
                                    await Linking.openSettings()
                                }
                            },
                        ],
                    );
                } else if (error.code === 2) {
                    await handleEnabledPressed()
                }
            })
    };

    async function handleEnabledPressed() {
        if (Platform.OS === 'android') {
            try {
                const enableResult = await promptForEnableLocationIfNeeded();
                handleGetCurrentPosition()
                // The user has accepted to enable the location services
                // data can be :
                //  - "already-enabled" if the location services has been already enabled
                //  - "enabled" if user has clicked on OK button in the popup
            } catch (error) {
                if (error) {
                    if (error.message === "ERR00") {
                        await handleEnabledPressed()
                    }
                    // The user has not accepted to enable the location services or something went wrong during the process
                    // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
                    // codes :
                    //  - ERR00 : The user has clicked on Cancel button in the popup
                    //  - ERR01 : If the Settings change are unavailable
                    //  - ERR02 : If the popup has failed to open
                    //  - ERR03 : Internal error
                }
            }
        } else {
            alert("Please enable Location in the setting")
        }
    }

    useEffect(() => {
        handleGetCurrentPosition();
    }, []);


    const handleValidation = () => {
        let errors = {};
        let valid = true;

        if (!location) {
            errors.location = "Location is required.";
            valid = false;
        }
        if (!task) {
            errors.task = "Task is required.";
            valid = false;
        }
        if (!hardware) {
            errors.hardware = "Hardware is required.";
            valid = false;
        }
        if (!quantity) {
            errors.quantity = "Quantity is required.";
            valid = false;
        }
        if (!photo) {
            errors.photo = "Photo is required.";
            valid = false;
        }
        setValidation(errors);

        return valid;
    };


    const handleCreateReport = async () => {
        try {
            if (handleValidation()) {
                setApiCalling(true)
                const photoUrl = await uploadFile(photo)
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
                        start_coords: userLocation.latitude.toString() + "," + userLocation.longitude.toString(),
                        end_coords: userLocation.latitude.toString() + "," + userLocation.longitude.toString(),
                        photo_url: photoUrl
                    },
                });
                setLocation("");
                setQuantity("");
                setHardware("");
                setNote("");
                setTask("");
                setPhoto(null)
                setValidation({
                    location: "",
                    task: "",
                    hardware: "",
                    quantity: "",
                    photo: ""
                })
                Alert.alert("", "your report has been submitted");
                setApiCalling(false)
            }
        } catch (e) {
            setApiCalling(false)
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
                    <Text/>
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
                        }}/>
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
                    }}/>
                </TouchableOpacity>
                {validation.location &&
                    <Text style={{
                        ...fonts.body2,
                        marginTop: 5,
                        color: 'red',
                    }}>
                        {validation.location}
                    </Text>
                }


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
                    }}/>
                </TouchableOpacity>
                {validation.task &&
                    <Text style={{
                        ...fonts.body2,
                        marginTop: 5,
                        color: 'red',
                    }}>
                        {validation.task}
                    </Text>
                }

                <View style={style.flexRowSpace}>
                    <View style={{flex: 1}}>
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
                                {startTime.toLocaleTimeString([], {hour: "numeric", minute: "numeric"})}
                            </Text>
                            <Image source={icons.clock} style={{
                                width: 18, height: 18, marginLeft: 10,
                            }} resizeMode="contain"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
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
                                {endTime.toLocaleTimeString([], {hour: "numeric", minute: "numeric"})}
                            </Text>
                            <Image source={icons.clock} style={{
                                width: 18, height: 18, marginLeft: 10,
                            }} resizeMode="contain"/>
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
                        color: colors.black,
                        paddingLeft: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: colors.primary,
                    }}
                />
                {validation.hardware &&
                    <Text style={{
                        ...fonts.body2,
                        marginTop: 5,
                        color: 'red',
                    }}>
                        {validation.hardware}
                    </Text>
                }

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
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: colors.primary,
                    }}
                />
                {validation.quantity &&
                    <Text style={{
                        ...fonts.body2,
                        marginTop: 5,
                        color: 'red',
                    }}>
                        {validation.quantity}
                    </Text>
                }

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
                    }}/>
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

                <Text style={{
                    ...fonts.h3,
                    marginTop: 10,
                }}>
                    Photo
                </Text>
                <TouchableOpacity
                    onPress={() => setImageSelectModal(true)}
                    style={{
                        borderWidth: 1,
                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderStyle: 'dashed',
                        borderColor: colors.primary,
                        height: 150,

                        borderRadius: 5
                    }}>
                    {photo ?
                        <Image source={{uri: photo}}
                               style={{
                                   width: '100%', height: '100%'
                               }}
                               resizeMode='contain'
                        />
                        :
                        <Image source={icons.add_image} style={{width: 30, height: 30}}/>
                    }
                </TouchableOpacity>
                {validation.photo &&
                    <Text style={{
                        ...fonts.body2,
                        marginTop: 5,
                        color: 'red',
                    }}>
                        {validation.photo}
                    </Text>
                }

                <TouchableOpacity
                    disabled={apiCalling}
                    onPress={handleCreateReport}
                    style={{
                        height: 40,
                        width: "100%",
                        marginTop: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        ...style.shadow,
                        backgroundColor: colors.primary,
                    }}>
                    {apiCalling
                        ?
                        <ActivityIndicator color={colors.white} size='small'/>
                        :
                        <Text style={{
                            ...fonts.body1,
                            color: colors.white,
                        }}>
                            Submit
                        </Text>
                    }
                </TouchableOpacity>


            </ScrollView>

            <LocationModal locationModal={locationModal} setLocationModal={setLocationModal} location={location}
                           setLocation={setLocation}/>
            <TaskModal taskModal={taskModal} setTaskModal={setTaskModal} task={task} setTask={setTask}/>
            <DispatchModal modal={dispatchModal} setModal={setDispatchModal} newDispatch={dispatch}
                           setNewDispatch={setDispatch}/>
            <MenuModal modal={menuModal} setModal={setMenuModal} navigation={navigation}/>
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

            <ImageSelectModal modal={imageSelectModal} setModal={setImageSelectModal} setPhoto={setPhoto}/>

        </SafeAreaView>
    );
};

export default Home;
