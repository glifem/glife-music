import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { PlayerScreen, PlaylistScreen } from "../screens"
import { PrimaryNavigator } from "./primary-navigator"
import { Platform } from "react-native"
import { translate } from "../i18n"

const Stack = createStackNavigator<HomeParamList>()

export type HomeParamList = {
    home: undefined
    player: undefined
    playlist: undefined
}

export function HomeNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                headerShown: false,
                headerTitle: Platform.OS == "android" && translate("common.back"),
                headerTransparent: true,
            }}
        >
            <Stack.Screen name="home" component={PrimaryNavigator} />
            <Stack.Screen name="player" component={PlayerScreen} options={{ headerShown: true }} />
            <Stack.Screen name="playlist" component={PlaylistScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}
