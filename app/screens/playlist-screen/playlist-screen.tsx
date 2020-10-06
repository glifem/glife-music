import React from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { Header, Screen, Wallpaper } from "../../components"
import {
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
import MoreIcon from "../../screens/playlist-screen/more.svg";

const { S3_URL } = require("../../config/env")

const CONTAINER: ViewStyle = {
	padding: spacing[4],
	backgroundColor: color.transparent,
}

const FULL: ViewStyle = {
	display: 'flex',
	flex: 1,
	paddingTop: spacing[7],
}

const PLAYLIST_INFO_CONTAINER: ViewStyle = {
	display: "flex",
	marginBottom: spacing[2],
	flexDirection: "row"
}

const COVER_IMAGE: any = {
	aspectRatio: 1,
	borderRadius: 5,
	width: 128,
	justifyContent: 'center',
	alignItems: 'center',
	resizeMode: "cover"
}

const PLAYLIST_INFO_DETAILS: ViewStyle = {
	width: '100%',
	flexDirection: 'column',
	alignContent: 'flex-end',
	justifyContent: 'center',
	marginHorizontal: spacing[4],
}

const PLAYLIST_TITLE: TextStyle = {
	fontSize: 28,
	fontWeight: 'bold',
	color: 'white'
}

const PLAYLIST_COUNT: TextStyle = {
	fontSize: 16,
	color: "#ebebf599",
}

const PLAYLIST_TIME: TextStyle = {
	...PLAYLIST_COUNT
}

const PLAYLIST_SONG_CONTAINER: ViewStyle = {
	marginVertical: spacing[2],
}

const ROW: ViewStyle = {
	display: "flex",
	flexDirection: "row",
	marginBottom: spacing[2],
	paddingVertical: spacing[1]
}

const INFOS: ViewStyle = {
	display: "flex",
	flex: 1,
	marginRight: spacing[6], // To avoid 'miss touch'
	justifyContent: "center"
}

const TITLE: TextStyle = {
	color: "#FFFFFF",
	fontSize: 16,
	fontWeight: '700'
}

const AUTHORS: TextStyle = {
	...TITLE,
	fontSize: 14,
	fontWeight: '500',
	color: "#ebebf599",
}

const RIGHT_SONG_BUTTON: ViewStyle = {
	justifyContent: 'center',
	marginLeft: 'auto',
	right: 0
}

const RIGHT_SONG_ICON: ViewStyle = {
	height: 16,
	width: 16
}

const PLAYLIST_INTERACT_CONTAINER: ViewStyle = {
	flexDirection: 'row',
	justifyContent: 'center',
	paddingVertical: spacing[2]
}

const PLAYLIST_PLAY_BUTTON: ViewStyle = {
	backgroundColor: '#008b4d',
	borderRadius: 32,
	height: 48,
	width: '50%',
	justifyContent: 'center',
	alignItems: 'center'
}

const PLAY_BUTTON_TEXT: TextStyle = {
	color: 'white',
	fontWeight: 'bold',
	textTransform: 'uppercase'
}

interface ISongCardProps {
	id: number;
	title: string;
	author: string;
}

const playlistSongs: ISongCardProps[] = [
	{ id: 1, author: 'Cristobal feat. Vasco', title: "Malabunta" },
	{ id: 2, author: 'Quemado', title: "Petard" },
	{ id: 3, author: '44', title: "LSPD" },
	{ id: 1, author: 'Cristobal feat. Vasco', title: "Malabunta" },
	{ id: 2, author: 'Quemado', title: "Petard" },
	{ id: 3, author: '44', title: "LSPD" },
	{ id: 1, author: 'Cristobal feat. Vasco', title: "Malabunta" },
	{ id: 2, author: 'Quemado', title: "Petard" },
	{ id: 3, author: '44', title: "LSPD" },
	{ id: 1, author: 'Cristobal feat. Vasco', title: "Malabunta" },
	{ id: 2, author: 'Quemado', title: "Petard" },
	{ id: 3, author: '44', title: "LSPD" },
]

const SongCard: React.FC<ISongCardProps> = props => {
	return (
		<View>
			<View style={ROW}>
				<TouchableOpacity style={INFOS} onPress={(e) => null}>
					<Text style={TITLE}>{props.title}</Text>
					<Text style={AUTHORS}>{props.author}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={RIGHT_SONG_BUTTON} onPress={(e) => null}>
					<MoreIcon style={RIGHT_SONG_ICON} color="white" fill="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

export const PlaylistScreen = observer(function SearchScreen() {
	const { music } = useStores()
	const navigation = useNavigation()

	return (
		<View style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
				<View style={PLAYLIST_INFO_CONTAINER}>
					<ImageView style={COVER_IMAGE} source={{ uri: `${S3_URL}/music/1.png`, priority: FastImage.priority.high, }} />
					<View style={PLAYLIST_INFO_DETAILS}>
						<View style={{ marginBottom: 8 }}>
							<Text style={PLAYLIST_TITLE}>Best songs</Text>
						</View>
						<View style={{ justifyContent: 'flex-end' }}>
							<Text style={PLAYLIST_COUNT}>96 titles</Text>
							<Text style={PLAYLIST_TIME}>9h 22m</Text>
						</View>
					</View>
				</View>

				<View style={PLAYLIST_INTERACT_CONTAINER}>
					<View style={PLAYLIST_PLAY_BUTTON}>
						<Text style={PLAY_BUTTON_TEXT}>Play songs</Text>
					</View>
				</View>

				<View style={PLAYLIST_SONG_CONTAINER}>
					{playlistSongs.map((v, k) => <SongCard key={k} {...v} />)}
				</View>
			</Screen>
		</View>
	)
})
