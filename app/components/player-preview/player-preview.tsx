/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import ImageView from "../image-view/image";
import { Text } from "../text/text";
import { useCurrentTrack, useIsPlaying } from "../../utils/track-player";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import PlayFillIcon from "../../screens/player-screen/play-fill.svg";
import PauseFillIcon from "../../screens/player-screen/pause-fill.svg";
import NextIcon from "../../screens/player-screen/next.svg";
import FastImage from "react-native-fast-image";

const PLAYER_CONTAINER: ViewStyle = {
	height: 60,
	//backgroundColor: 'red'
	backgroundColor: '#202020'
}

const PLAYER_MAIN_CONTAINER: ViewStyle = {
	alignItems: "center",
	flexDirection: 'row'
}

const PLAYER_MUSIC_INFO: ViewStyle = {
	...PLAYER_MAIN_CONTAINER
}

const COVER_IMAGE: any = {
	height: "100%",
	aspectRatio: 1,
	resizeMode: "cover",
	overflow: "hidden",
}

const PLAY_BUTTON: ViewStyle = {
	height: 37,
	width: 36,
	borderRadius: 32,
	borderColor: "gray",
	borderStyle: "solid",
	borderWidth: 0.75,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	marginRight: 10
}

const NEXT_ICON: ViewStyle = {
	width: 20,
	height: 20
}

const PLAY_FILL_ICON: ViewStyle = {
	height: 18,
	width: 18,
	marginLeft: 2
}

const PAUSE_FILL_ICON: ViewStyle = {
	height: 18,
	width: 18,
}

const PLAYER_TEXT_CONTAINER: ViewStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: 'center',
	flex: 1,
	marginLeft: 15
}

const ARTIST_TEXT: TextStyle = {
	color: '#ebebf599'
}

const RIGHT_BUTTONS_CONTAINER: ViewStyle = {
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	marginLeft: 'auto',
	marginRight: 16
}

const ProgressBar = () => {
	const { position, duration } = useProgress(100)
	const progress = Math.round((position * 100) / duration)

	return (
		<View style={{
			height: 2,
			backgroundColor: "gray",
		}}>
			<View style={{
				height: 2,
				width: progress + '%',
				backgroundColor: "white"
			}}>
			</View>
		</View>
	);
}

const PlayerPreviewComponent = () => {
	const track = useCurrentTrack()
	const isPlaying = useIsPlaying()
	const navigation = useNavigation()

	const goToMusic = React.useMemo(() => () => navigation.navigate("player"), [navigation])

	if (track == null) {
		return null
	}

	return (
		<View style={PLAYER_CONTAINER}>
			<ProgressBar />

			<View style={PLAYER_MAIN_CONTAINER}>
				<View style={PLAYER_MUSIC_INFO}>
					<TouchableOpacity onPress={goToMusic}>
						<ImageView source={{ uri: track?.artwork as string, priority: FastImage.priority.high }} style={COVER_IMAGE} />
					</TouchableOpacity>

					<TouchableOpacity style={PLAYER_TEXT_CONTAINER} onPress={goToMusic}>
						<Text numberOfLines={1}>{track.title}</Text>
						<Text numberOfLines={1} style={ARTIST_TEXT}>{track.artist}</Text>
					</TouchableOpacity>
				</View>

				<View style={RIGHT_BUTTONS_CONTAINER}>
					<View style={PLAY_BUTTON}>
						{isPlaying ? (
							<PauseFillIcon onPress={TrackPlayer.pause} style={PAUSE_FILL_ICON} fill="white" />
						) : (
								<PlayFillIcon onPress={TrackPlayer.play} style={PLAY_FILL_ICON} fill="#ffffff" />
							)}
					</View>

					<NextIcon
						style={NEXT_ICON}
						onPress={TrackPlayer.skipToNext}
						fill="white"
					/>
				</View>
			</View>
		</View>
	);
}

export default PlayerPreviewComponent;