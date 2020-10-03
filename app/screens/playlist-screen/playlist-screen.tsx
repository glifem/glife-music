import React from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { Header, Screen, Wallpaper } from "../../components"
import {
	TextStyle,
	View,
	ViewStyle,
} from "react-native"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"

const BOLD: TextStyle = { fontWeight: "bold" }

const CONTAINER: ViewStyle = {
	padding: spacing[3],
	backgroundColor: color.transparent,
}

const FULL: ViewStyle = {
	display: 'flex',
	flex: 1,
}

const HEADER: TextStyle = {
	paddingTop: spacing[1],
}
const HEADER_TITLE: TextStyle = {
	...BOLD,
	fontSize: 12,
	lineHeight: 15,
	textAlign: "center",
	letterSpacing: 1.5,
}

export const PlaylistScreen = observer(function SearchScreen() {
	const { music } = useStores()
	const navigation = useNavigation()

	return (
		<View style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
				<Header headerTx="homeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
			</Screen>
		</View>
	)
})
