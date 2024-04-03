import {SafeAreaView, ScrollView, Text, View} from "react-native";
import {useQuery} from "@apollo/client";
import {GET_REPORT_HISTORY} from "../graphql/queries";
import Loading from "../components/Loading";
import {colors, fonts} from "../constants/theme";
import {style} from "../constants/style";

const HistoryDetails = ({navigation, route}) => {

    const reportId = route.params?.reportId;
    const {data} = useQuery(GET_REPORT_HISTORY, {variables: {reportId}, fetchPolicy: "cache-and-network"});


    if (!data) {
        return <Loading/>;
    }


    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 10,
                    paddingBottom: 30,
                    paddingHorizontal: 20,
                }}>
                <View style={style.flexRowSpace}>
                    <Text style={{
                        ...fonts.body1,
                        marginTop: 10,
                    }}>
                        Submitted at : {new Date(data.tracking_by_pk.created_at).toLocaleDateString()}
                    </Text>
                </View>

                <View style={{...style.flexRowSpace, marginTop: 30}}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            ...fonts.body2,
                            color: colors.gray,
                        }}>
                            User Name
                        </Text>
                        <Text style={{
                            ...fonts.body1,
                        }}>
                            {data.tracking_by_pk.fk_user_name}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            ...fonts.body2,
                            color: colors.gray,
                        }}>
                            Location
                        </Text>
                        <Text style={{
                            ...fonts.body1,
                        }}>
                            {data.tracking_by_pk.fk_location_name}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            ...fonts.body2,
                            color: colors.gray,
                        }}>
                            Task
                        </Text>
                        <Text style={{
                            ...fonts.body1,
                        }}>
                            {data.tracking_by_pk.fk_task_name}
                        </Text>
                    </View>
                </View>

                <View style={{...style.flexRowSpace, marginTop: 30}}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            ...fonts.body2,
                            color: colors.gray,
                        }}>
                            Hardware
                        </Text>
                        <Text style={{
                            ...fonts.body1,
                        }}>
                            {data.tracking_by_pk.hardware}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            ...fonts.body2,
                            color: colors.gray,
                        }}>
                            Quantity
                        </Text>
                        <Text style={{
                            ...fonts.body1,
                        }}>
                            {data.tracking_by_pk.quantity}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            ...fonts.body2,
                            color: colors.gray,
                        }}>
                            Dispatch
                        </Text>
                        <Text style={{
                            ...fonts.body1,
                        }}>
                            {data.tracking_by_pk.dispatch === true ? "True" : "False"}
                        </Text>
                    </View>
                </View>

                <View style={{...style.flexRowSpace, marginTop: 30}}>

                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            ...fonts.body2,
                            color: colors.gray,
                        }}>
                            Start at
                        </Text>
                        <Text style={{
                            ...fonts.body1,
                        }}>
                            {new Date(data.tracking_by_pk.start_date_time).toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "numeric",
                            })}
                        </Text>
                    </View>

                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            ...fonts.body2,
                            color: colors.gray,
                        }}>
                            End At
                        </Text>
                        <Text style={{
                            ...fonts.body1,
                        }}>
                            {new Date(data.tracking_by_pk.end_date_time).toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "numeric",
                            })}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>

                    </View>
                </View>

                <Text style={{
                    ...fonts.body2,
                    color: colors.gray,
                    marginTop: 30,
                }}>
                    Note
                </Text>
                <Text style={{
                    ...fonts.body1,
                    marginTop: 5,
                }}>
                    {data.tracking_by_pk.note}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HistoryDetails;
