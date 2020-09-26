/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { BottomTabBar, BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen, PlaylistScreen, SearchScreen } from "../screens"

import SearchIcon from "./icons/searchbar.svg"
import HeartIcon from "./icons/heart.svg"
import HomeIcon from "./icons/house-fill.svg"
import { SvgProps } from "react-native-svg"
import { Platform } from "react-native"
import PlayerPreviewComponent from "../components/player-preview/player-preview"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
	search: undefined
	playlist: undefined
	home: undefined
	player: undefined
}

const tabs: {
	name: string
	icon: React.FC<SvgProps>
	route: keyof PrimaryParamList
	component: React.FC
}[] = [
		{ name: "Accueil", icon: HomeIcon, route: "home", component: HomeScreen },
		{ name: "Playlist", icon: HeartIcon, route: "playlist", component: PlaylistScreen },
		{ name: "Rechercher", icon: SearchIcon, route: "search", component: SearchScreen },
	]

const Tab = createBottomTabNavigator<PrimaryParamList>()

const TabBarComponent = (props: BottomTabBarProps<BottomTabBarOptions>) => {
	return (
		<React.Fragment>
			<PlayerPreviewComponent />
			<BottomTabBar {...props} />
		</React.Fragment>
	)
};

export function PrimaryNavigator() {
	return (
		<Tab.Navigator
			screenOptions={{}}
			tabBar={props => <TabBarComponent {...props} />}
			tabBarOptions={{
				keyboardHidesTabBar: true,
				safeAreaInsets: Platform.OS == "android" && { bottom: 4 },
				style: {
					backgroundColor: "#202020",
				},
			}}
		>
			{tabs.map((tab, key) => (
				<Tab.Screen
					key={key}
					options={{
						tabBarLabel: tab.name,
						tabBarIcon: ({ color, size }) => <tab.icon fill={color} width={size} height={size} />,
					}}
					name={tab.route}
					component={tab.component}
				/>
			))}
		</Tab.Navigator>
	)
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
