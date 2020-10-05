import React from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { Header, Screen, Wallpaper } from "../../components"
import {
	GestureResponderEvent,
	Text,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import FastImage from "react-native-fast-image"
import ImageView from "../../components/image-view/image"
import { getMusicAuthorNames, searchMusic } from "../../models/music-store/music-selector"
import { setPlayerQueue } from "../../utils/track-player"
const { S3_URL } = require("../../config/env")

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

const COVER_IMAGE: any = {
	resizeMode: "cover",
}

const ROW: ViewStyle = {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
}

const INFOS: ViewStyle = {
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10,
}

const TITLE: TextStyle = {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
}

const AUTHORS: TextStyle = {
    ...TITLE,
    color: "#ebebf599",
}

interface IMusicProps {
	id: number;
	title: string;
	author: string;
	cover: string;
}

const MusicsData: IMusicProps[] = [
	{ id: 1, author: 'Author', title: "Zebi", cover: 'ef' },
	{ id: 2, author: 'Author', title: "Zebi", cover: 'ef' },
	{ id: 3, author: 'Author', title: "Zebi", cover: 'ef' },
	{ id: 4, author: 'Author', title: "Zebi", cover: 'ef' },
	{ id: 5, author: 'Author', title: "Zebi", cover: 'ef' },
	{ id: 6, author: 'Author', title: "Zebi", cover: 'ef' },
]

const MusicProps: React.FC<IMusicProps> = (props: IMusicProps) => {
	return (
		<TouchableOpacity onPress={(e) => null}>
			<View style={{
				...ROW,
				backgroundColor: '#262626'
			}}>
				<ImageView style={{...COVER_IMAGE, height: 60, width: 60}} source={{ uri: `${S3_URL}/music/${props.id}.png` }} />
				<View style={INFOS}>
					<Text style={TITLE}>{props.title}</Text>
					<Text style={AUTHORS}>{props.author}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const renderPlaylistMusic = () => {
	return MusicsData.map((v, k) => {
		return <MusicProps key={k} {...v} />
	})
}

export const PlaylistScreen = observer(function SearchScreen() {
	const { music } = useStores()
	const navigation = useNavigation()

	return (
		<View style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
				<Header headerTx="homeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />

				<View style={{
					padding: 20
				}}>	
					<View style={{
						display: "flex",
						flexDirection: "row"
					}}>
						<View style={{
							marginTop: 20,
							height: 125,
							width: 125,
						}}>
							<ImageView style={{...COVER_IMAGE, height: 125, width: 125 }} source={{ uri: `${S3_URL}/music/1.png`, priority: FastImage.priority.high, }} />
						</View>

						<View>
							<Text style={{
								marginTop: 20,
								marginLeft: 20,
								marginBottom: 10,
								fontSize: 15,
								color: '#ebebf599',
							}}>Playlist</Text>

							<Text style={{
								marginLeft: 20,
								marginBottom: 10,
								fontSize: 30,
								color: '#ffffff',
							}}>Music</Text>

							<Text style={{
								marginLeft: 20,
								fontSize: 20,
								color: "#ebebf599",
							}}>96 titres</Text>

							
							<Text style={{	
								marginLeft: 20,
								fontSize: 20,
								color: "#ebebf599",
							}}>9 h 22 min</Text>
						</View>
					</View>

					<View style={{
						marginTop: 30
					}}>
						{renderPlaylistMusic()}
					</View>
				</View>
			</Screen>
		</View>
	)
})
