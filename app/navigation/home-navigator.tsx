import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { PlayerScreen } from "../screens"
import { PrimaryNavigator } from "./primary-navigator"

const Stack = createStackNavigator<HomeParamList>()

export type HomeParamList = {
	home: undefined
	player: undefined
}

export function HomeNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				gestureEnabled: true,
				headerShown: false,
				headerTitle: 'Retour',
				headerTransparent: true
			}}
		>
			<Stack.Screen name="home" component={PrimaryNavigator} />
			<Stack.Screen name="player" component={PlayerScreen} options={{ headerShown: true }} />
		</Stack.Navigator>
	)
}
