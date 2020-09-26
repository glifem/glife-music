/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { ImageStyle, View, ViewStyle } from "react-native"
import ImageView from "../image-view/image";
import { Text } from "../text/text";
import { useCurrentTrack, useIsPlaying } from "../../utils/track-player";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import PlayFillIcon from "../../screens/player-screen/play-fill.svg";
import PauseFillIcon from "../../screens/player-screen/pause-fill.svg";
import NextIcon from "../../screens/player-screen/next.svg";
import UpIcon from "./chevron-up.svg";


const COVER_IMAGE: ImageStyle = {
    height: 54,
    width: 54,
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
        <View style={{
            height: 55,
            backgroundColor: '#202020'  
        }}>

            <ProgressBar />

            <View style={{
                display: "flex",
                alignItems: "center",
                flexDirection: 'row'
            }}>
                <ImageView source={{ uri: track?.artwork as string }} style={COVER_IMAGE} />

                <TouchableOpacity 
                    onPress={goToMusic}
                >
                    <UpIcon style={{
                        height: 15,
                        width: 15,
                        marginLeft: 15
                        // marginTop: 15,
                    }} fill="#ffffff" />
                </TouchableOpacity>

                <View style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    marginLeft: 15
                }}>
                    <Text numberOfLines={1}>{track.title}</Text>
                    <Text numberOfLines={1} style={{
                        color: '#ebebf599'
                    }}>{track.artist}</Text>
                </View>
                
                <TouchableOpacity 
                    onPress={isPlaying ? TrackPlayer.pause : TrackPlayer.play}
                >
                    <View style={PLAY_BUTTON}>
                        {isPlaying ? (
                            <PauseFillIcon style={{
                                height: 18,
                                width: 18,
                            }} fill="white" />
                        ) : (
                            <PlayFillIcon style={{
                                height: 18,
                                width: 18,
                                marginLeft: 2
                            }} fill="#ffffff" />
                        )}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <NextIcon
                        style={{
                            width: 20,
                            height: 20,
                            marginRight: 12
                        }}
                        onPress={TrackPlayer.skipToNext}
                        fill="white"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PlayerPreviewComponent;