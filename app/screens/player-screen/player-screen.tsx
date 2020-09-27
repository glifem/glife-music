import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
    View,
    Image,
    ViewStyle,
    TextStyle,
    ImageStyle,
    GestureResponderEvent,
    Dimensions,
} from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import RNColorThief from "react-native-color-thief"

import ShareIcon from "./partage.svg"
import HeartIcon from "./heart.svg"
import NextIcon from "./next.svg"
import PauseFillIcon from "./pause-fill.svg"
import PlayFillIcon from "./play-fill.svg"
import PreviousIcon from "./previous.svg"
import RandomIcon from "./random.svg"
import RepeatIcon from "./repeat.svg"
import { useHeaderHeight } from "@react-navigation/stack"
import TrackPlayer, { useProgress } from "react-native-track-player"
import { formatTimestamp } from "../../utils/time"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useCurrentTrack, useIsPlaying } from "../../utils/track-player"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
    backgroundColor: color.transparent,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const PLAYER_PAGE_PADDING = spacing[5]

const PLAYER_PAGE: ViewStyle = {
    backgroundColor: color.transparent,
    paddingHorizontal: PLAYER_PAGE_PADDING,
    display: "flex",
}

const MUSIC_INFOS: ViewStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
}

const MUSIC_STREAM: ViewStyle = {
    display: "flex",
    flexDirection: "row",
}

const MUSIC_LIKES: ViewStyle = {
    display: "flex",
    flexDirection: "row",
}

const H2: TextStyle = {
    fontSize: 20,
    margin: 0,
    fontWeight: "bold",
    textAlign: "center",
}

const H3: TextStyle = {
    fontSize: 17,
    margin: 0,
    fontWeight: "bold",
    textAlign: "center",
}

const H4: TextStyle = {
    fontSize: 15,
    margin: 0,
    textAlign: "center",
}

const MUSIC_INFOS_FOOTER: ViewStyle = {
    ...MUSIC_INFOS,
    marginTop: 0,
    marginBottom: 20,
}
const MUSIC_COVER: ViewStyle = {}

const COVER_IMAGE: ImageStyle = {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 5,
    marginBottom: 2,
}

const MUSIC_DETAILS: ViewStyle = {
    ...MUSIC_INFOS,
}

const MUSIC_DETAILS_TEXT: ViewStyle = {
    marginTop: -6,
}

const BUTTON_SVG: ViewStyle = {
    width: 26,
    height: 26,
}

const MUSIC_TIMING: ViewStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    flexDirection: "row",
}

const TIMING_TEXT: TextStyle = {
    fontSize: 12,
    color: "white",
}

const MUSIC_LINE: ViewStyle = {
    backgroundColor: "#3b3132",
    marginVertical: 5,
    height: 2,
    borderRadius: 2,
    display: "flex",
}

const MUSIC_LINE_PROGRESS: ViewStyle = {
    backgroundColor: "white",
    height: 2,
    borderRadius: 2,
    paddingLeft: 1,
    width: "0%",
}

const MUSIC_LINE_CIRCLE: ViewStyle = {
    height: 8,
    width: 8,
    marginTop: -5,
    marginBottom: -4,
    borderRadius: 32,
    backgroundColor: "white",
}

const MUSIC_BUTTONS_FOOTER: ViewStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
}

const PLAYER_BUTTON: ViewStyle = {
    width: 24,
    height: 24,
    marginHorizontal: 20,
}

const PLAY_ICON: ViewStyle = {
    width: 38,
    height: 38,
}

const PLAY_BUTTON: ViewStyle = {
    height: 75,
    width: 75,
    borderRadius: 50,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 0.75,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -15,
    marginRight: -15,
}

export const ProgressBar: React.FC<any> = () => {
    const { position, duration } = useProgress(250)
    const [dragPos, setDragPros] = useState(null)
    const [draging, setDraging] = useState(false)

    const lineWidth = useMemo(() => Dimensions.get("window").width - PLAYER_PAGE_PADDING * 2, [])

    const progress = dragPos
        ? Math.round((dragPos * 100) / lineWidth)
        : Math.round((position * 100) / duration)

    const onTouchStart = (e: GestureResponderEvent) => {
        setDraging(true)
        onTouch(e)
    }

    const onTouch = (e: GestureResponderEvent) => {
        e.stopPropagation()
        e.preventDefault()

        if (e.nativeEvent.pageX < PLAYER_PAGE_PADDING) {
            setDragPros(0)
        } else if (e.nativeEvent.pageX > lineWidth + PLAYER_PAGE_PADDING) {
            setDragPros(lineWidth)
        } else {
            setDragPros(e.nativeEvent.pageX - PLAYER_PAGE_PADDING)
        }
    }

    const onTouchEnd = async () => {
        let didCancel = false
        await TrackPlayer.seekTo((dragPos * duration) / lineWidth)
        !didCancel && setDraging(false)
        return () => (didCancel = true)
    }

    //wait for position to be updated, preventing progress to go back to his inital position after drag end
    useEffect(() => {
        !draging && setDragPros(null)
    }, [position])

    return (
        <View
            onTouchStart={onTouchStart}
            onTouchMove={onTouch}
            onTouchEnd={onTouchEnd}
            hitSlop={{ top: 15, right: 5, bottom: 15, left: 5 }}
        >
            <View style={MUSIC_TIMING}>
                <Text style={TIMING_TEXT}>{formatTimestamp(position)}</Text>
                <Text style={TIMING_TEXT}>{formatTimestamp(duration)}</Text>
            </View>
            <View style={MUSIC_LINE}>
                <View
                    style={{
                        ...MUSIC_LINE_PROGRESS,
                        width: progress + "%",
                    }}
                ></View>
                <View style={{ ...MUSIC_LINE_CIRCLE, marginLeft: progress + "%" }}></View>
            </View>
        </View>
    )
}

export const PlayerScreen: React.FC<any> = observer(function HomeScreen({ navigation, route }) {
    const { music } = useStores()

    const [backgroundColor, setBackgroundColor] = useState<string>("black")
    const headerHeight = useHeaderHeight()

    const track = useCurrentTrack()
    const currentMusic = useMemo(() => music.getMusicById(Number(track?.id)), [track?.id])
    const isPlaying = useIsPlaying()


    useLayoutEffect(() => {
        navigation.setOptions({ tabBarVisible: false })
    }, [navigation, route])

    useEffect(() => {
        setBackgroundColor("black")
        if (!track?.artwork) return

        RNColorThief.getPalette(track.artwork, 3, 2, false)
            .then((palette: any) => {
                const dominantColor = palette[0]
                const alpha =
                    dominantColor.r > 230 && dominantColor.g > 230 && dominantColor.b > 230
                        ? ".5"
                        : "1"
                setBackgroundColor(
                    `rgba(${dominantColor.r},${dominantColor.g},${dominantColor.b},${alpha})`,
                )
            })
            .catch((error: any) => {
                console.log("error", error)
            })
    }, [track])

    return (
        <View style={FULL}>
            <Screen style={CONTAINER} preset="scroll" backgroundColor={backgroundColor}>
                {/* Player container */}
                <View style={{ ...PLAYER_PAGE, marginTop: headerHeight - 16 }}>
                    <View style={MUSIC_INFOS}>
                        <View style={MUSIC_STREAM}>
                            <Text style={{ ...BOLD, ...H3 }}>{currentMusic?.views}</Text>
                            <Text style={H3}> ÉCOUTES</Text>
                        </View>
                        <View style={MUSIC_LIKES}>
                            <Text style={{ ...BOLD, ...H3 }}>{currentMusic?.likes}</Text>
                            <Text style={H3}> J'AIME</Text>
                        </View>
                    </View>
                    <View style={MUSIC_INFOS_FOOTER}>
                        <View style={H4}>
                            <Text style={{ ...BOLD, ...H4 }}>
                                {currentMusic?.createdAt
                                    ? new Date(currentMusic.createdAt * 1000).toLocaleDateString()
                                    : "Récemment"}
                            </Text>
                        </View>
                    </View>
                    <View style={MUSIC_COVER}>
                        <Image source={{ uri: track?.artwork as string }} style={COVER_IMAGE} />
                    </View>
                    <View style={MUSIC_DETAILS}>
                        <ShareIcon style={BUTTON_SVG} fill={"white"} />
                        <View style={MUSIC_DETAILS_TEXT}>
                            <Text style={H2}>{track?.title}</Text>
                            <Text style={H3}>{track?.artist}</Text>
                        </View>
                        <HeartIcon
                            style={BUTTON_SVG}
                            fill={currentMusic?.liked ? "#32d74b" : "white"}
                        />
                    </View>
                    <ProgressBar />
                </View>
                <View style={MUSIC_BUTTONS_FOOTER}>
                    <RandomIcon style={PLAYER_BUTTON} fill="white" />
                    <TouchableOpacity>
                        <PreviousIcon
                            style={PLAYER_BUTTON}
                            onPress={TrackPlayer.skipToPrevious}
                            fill="white"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={isPlaying ? TrackPlayer.pause : TrackPlayer.play}
                        style={PLAY_BUTTON}
                    >
                        {isPlaying ? (
                            <PauseFillIcon style={PLAY_ICON} fill="white" />
                        ) : (
                            <PlayFillIcon style={{ ...PLAY_ICON, marginLeft: 6 }} fill="white" />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={TrackPlayer.skipToNext}>
                        <NextIcon style={PLAYER_BUTTON} fill="white" />
                    </TouchableOpacity>
                    <RepeatIcon style={PLAYER_BUTTON} fill="white" />
                </View>
            </Screen>
        </View>
    )
})
