import { SafeAreaView, View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

// import EventList from "../screens/EventTab/EventList";
import Home from "../screens/Home";
import Tabs from "./Tabs";
import Profile from "../screens/MeTab/Profile";
import { PasswordChange } from "../screens/MeTab/PasswordChange";
import { InfoChange } from "../screens/MeTab/InfoChange";
import { Friend } from "../screens/MeTab/Friend";
import MapScreen from "../screens/MapScreen/MapScreen";
import { DetailEvent } from "../screens/Event/DetailEvent";
import EventCreateMe from "../screens/EventTab/EventCreateMe";
import EventCreate from "../screens/EventTab/EventCreate";
import EventInfo from "../screens/EventTab/EventInfo";
import Rooms from "../screens/ChatScreen/Rooms";
import ChatRoom from "../screens/ChatScreen/ChatRoom";
import { color, background } from "../theme";
import { EventList } from "../screens/Event/EventList";
import { InviteFriend } from "../screens/Event/InviteFriend";
import { Attendance } from "../screens/Event/Attendance";
import { MailTemplate } from "../screens/Mail/MailTemplate";
import { JoinedEvent } from "../screens/Event/JoinedEvent";
import { RequestEvent } from "../screens/Event/RequestEvent";

const Stack = createNativeStackNavigator();
const Navigation = () => {
    const option = (title) => ({
        title: title,
        headerStyle: {
            backgroundColor: background.gray,
        },
        headerTintColor: color.white,
    });
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="EventList" component={EventList}
                options={{
                    title: "Danh sách sự kiện",
                    headerStyle: {
                        backgroundColor: "transparent",
                        elevator: 0,
                    },
                }}/>
            <Stack.Screen
                name="Friend"
                component={Friend}
                options={{
                    title: "Bạn bè",
                    headerStyle: {
                        backgroundColor: "transparent",
                        elevator: 0,
                    },
                }}
            />
            
            <Stack.Screen name="DetailEvent" component={DetailEvent} 
                options={{
                    title: "Chi tiết sự kiện",
                    headerStyle: {
                        backgroundColor: "transparent",
                        elevator: 0,
                    },
                }} />
            <Stack.Screen name="Profile" component={Profile} options={option("Thông tin cá nhân")} />
            <Stack.Screen name="Change Password" component={PasswordChange} options={option("Thay đổi mật khẩu")} />
            <Stack.Screen name="Change Information" component={InfoChange} options={option("Thay đổi thông tin")} />
            <Stack.Screen name="MapScreen" component={MapScreen} options={option("Bản đồ")} />
            <Stack.Screen name="EventCreateMe" component={EventCreateMe} options={option("Danh sách sự kiện")} />
            <Stack.Screen name="EventCreate" component={EventCreate} options={option("Sự kiện mới")} />
            {/* <Stack.Screen name="Friend" component={Friend} options={option("Bạn bè")} /> */}
            <Stack.Screen name="EventInfo" component={EventInfo} options={option("Thông tin sự kiện")} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} options={option("")} />
            <Stack.Screen name="Rooms" component={Rooms} options={option("Phòng chat")} />
            <Stack.Screen name="InviteFriend" component={InviteFriend} options={option("Mời bạn")} />
            <Stack.Screen name="Attendance" component={Attendance} options={option("Danh sách người tham dự")} />
            <Stack.Screen name="Email" component={MailTemplate} options={option("Gửi email")} />
            <Stack.Screen name="JoinedEvent" component={JoinedEvent} options={option("Sự kiện đã tham gia")} />
            <Stack.Screen name="RequestEvent" component={RequestEvent} options={option("Sự kiện được mời tham dự")} />
        </Stack.Navigator>
    );
};

export default Navigation;
