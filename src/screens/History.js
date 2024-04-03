import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {useQuery} from "@apollo/client";
import {GET_REPORT_HISTORIES} from "../graphql/queries";
import Loading from "../components/Loading";
import {colors, fonts} from "../constants/theme";
import {style} from "../constants/style";
import {useState} from "react";
import DateRangePicker from "../components/DateRangePicker";

const History = ({navigation}) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const [startDate, setStartDate] = useState(lastMonth);
    const [endDate, setEndDate] = useState(new Date());

    const {data} = useQuery(GET_REPORT_HISTORIES, {
        variables: {startDate, endDate},
        fetchPolicy: "cache-and-network",
    });

    if (!data) {
        return <Loading/>;
    }

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <DateRangePicker startDate={startDate} endDate={endDate}
                             setStartDate={setStartDate} setEndDate={setEndDate}
            />
            {data.tracking.length === 0 &&
                <Text style={{
                    ...fonts.h2,
                    color: "#6c2d2d",
                    textAlign: "center",
                    marginTop: 30,
                }}>
                    No History Available
                </Text>
            }
            <FlatList
                data={data.tracking}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: 5,
                    paddingBottom: 40,
                }}
                renderItem={({item, index}) =>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("History Details", {reportId: item.id})}
                        style={{
                            ...style.shadow,
                            ...style.flexRowSpace,
                            borderRadius: 5,
                            marginBottom: 10,
                            width: "100%",
                            backgroundColor: colors.white,
                            padding: 10,
                        }}>
                        <View>
                            <Text style={{
                                ...fonts.h2,
                            }}>
                                {item.fk_task_name}
                            </Text>
                            <View style={style.flexRow}>
                                <Text style={{
                                    ...fonts.body1,
                                    color: colors.gray,
                                }}>
                                    {new Date(item.start_date_time).toLocaleTimeString([], {
                                        hour: "numeric",
                                        minute: "numeric",
                                    })}
                                </Text>
                                <Text style={{
                                    ...fonts.h1,
                                    color: colors.gray,
                                    marginHorizontal: 5,
                                    top: -4,
                                }}>
                                    ⇨
                                </Text>
                                <Text style={{
                                    ...fonts.body1,
                                    color: colors.gray,
                                }}>
                                    {new Date(item.end_date_time).toLocaleTimeString([], {
                                        hour: "numeric",
                                        minute: "numeric",
                                    })}
                                </Text>
                            </View>
                        </View>
                        <View style={{alignItems: "flex-end"}}>
                            <Text style={{
                                ...fonts.body2,
                                color: colors.gray,
                            }}>
                                Submitted at
                            </Text>
                            <Text style={{
                                ...fonts.body1,
                            }}>
                                {new Date(item.created_at).toLocaleDateString()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
            />
        </SafeAreaView>
    );
};

export default History;
