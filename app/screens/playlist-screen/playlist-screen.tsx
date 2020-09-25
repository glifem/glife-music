import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { Header, Screen, Wallpaper } from "../../components"
import {
	FlatList,
	GestureResponderEvent,
	ImageStyle,
	Platform,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native"
import { Text } from "react-native"
import { color, spacing } from "../../theme"
import ImageView from "../../components/image-view/image"
import { useNavigation } from "@react-navigation/native"

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

const PLAYLIST_PAGE: ViewStyle = {
	display: 'flex',
	padding: spacing[3],
	flex: 1
}

const PLAYLISTS_CONTAINER: ViewStyle = {
	marginTop: spacing[3],
	//flex: 1
}

const PLAYLISTS_ITEM_CONTAINER: ViewStyle = {
	marginTop: spacing[3],
	display: 'flex'
}

const H3: TextStyle = {
	margin: 0,
	color: 'white',
	fontSize: 20,
	width: "100%",
	...BOLD,
}

const COVER_IMAGE: ImageStyle = {
	aspectRatio: 1,
	borderRadius: 5,
	height: 60,
	width: 60,
	resizeMode: "cover",
}

const ROW: ViewStyle = {
	display: "flex",
	flexDirection: "row",
	marginBottom: 10,
	// backgroundColor: 'red'
}

const INFOS: ViewStyle = {
	display: "flex",
	justifyContent: "center",
	paddingLeft: 10,
}

const TITLE: TextStyle = {
	color: "#FFFFFF",
	...BOLD,
	fontSize: 16
}

const AUTHORS: TextStyle = {
	...TITLE,
	fontWeight: '100',
	color: "#ebebf599",
}

const HEADER: TextStyle = {
	paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
	...BOLD,
	fontSize: 12,
	lineHeight: 15,
	textAlign: "center",
	letterSpacing: 1.5,
}


const officialPlaylist = [
	{ id: 1, title: 'Flashland Records', songs: [1, 1, 1, 1, 1] },
	{ id: 2, title: 'GLife Records', songs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
	{ id: 3, title: 'Marabunta Records', songs: [1, 2] },
	{ id: 4, title: 'Vagos pute', songs: [1, 3] },
]

const userPlaylists = [
	{ id: 6, title: 'Musiques', songs: [1, 1] },
	{ id: 14, title: 'GRRRRRRR', songs: [1] },
	{ id: 100, title: 'VAGOS SONGS', songs: [1, 1] },
	{ id: 200, title: 'DRR DRR', songs: [1, 1] },
]

export const PlaylistScreen = observer(function SearchScreen() {
	const { music } = useStores()
	const navigation = useNavigation()

	const goToMusic = React.useMemo(() => () => navigation.navigate("player"), [
		navigation,
	])

	const onMusicClick = (e: GestureResponderEvent, id: number) => {
		e.stopPropagation();
		e.preventDefault();

		//music.setCurrentMusic(id);
		//goToMusic()
	};

	const renderPlaylist = (item, key) => {
		return (
			<TouchableOpacity key={key} style={ROW} onPress={e => onMusicClick(e, item.id)}>
				<ImageView style={COVER_IMAGE} source={{ uri: `${S3_URL}/music/${item.id}.png` }} />
				<View style={INFOS}>
					<Text style={TITLE}>{item.title}</Text>
					<Text style={AUTHORS}>{item.songs.length} musique{item.songs.length <= 1 ? '' : 's'}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	const displayUserPlaylists = userPlaylists.length > 0;

	return (
		<View style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
				<Header headerTx="homeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
				{displayUserPlaylists ? (
					<View style={PLAYLISTS_CONTAINER}>
						<Text numberOfLines={1} style={H3}>Mes playlists</Text>
						<View style={PLAYLISTS_ITEM_CONTAINER}>
							{userPlaylists.map((pl, key) => renderPlaylist(pl, key))}
						</View>
					</View>
				) : null}
				<View style={{ ...PLAYLISTS_CONTAINER, ...(displayUserPlaylists ? { marginTop: 0 } : {}) }}>
					<Text numberOfLines={1} style={H3}>Playlists officielles</Text>
					<View style={PLAYLISTS_ITEM_CONTAINER}>
						{officialPlaylist.map((pl, key) => renderPlaylist(pl, key))}
					</View>
				</View>
			</Screen>
		</View>
	)
})
