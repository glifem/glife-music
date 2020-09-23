import React, { useEffect, useLayoutEffect, useState } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle } from "react-native"
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
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { useCurrentTrack, useIsPlaying } from "../../utils/track-player"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const PLAYER_PAGE: ViewStyle = {
  paddingLeft: spacing[5],
  paddingRight: spacing[5],
  display: "flex",
}

const PLAYER_CONTENT: ViewStyle = {
  flex: 1,
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

const MUSIC_SHARE_ICON: ViewStyle = {
  ...BUTTON_SVG,
}

const HEART_ICON: ViewStyle = {
  ...BUTTON_SVG,
}

const MUSIC_TIMING: ViewStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 10,
  marginBottom: 0,
  flexDirection: "row",
}

const TIMING_TEXT: TextStyle = {
  fontSize: 12,
  color: "gray",
}

const MUSIC_TIMER_BAR: ViewStyle = {
  paddingTop: 5,
  paddingBottom: 5,
}

const MUSIC_LINE: ViewStyle = {
  backgroundColor: "white",
  height: 2,
  borderRadius: 2,
  display: "flex",
}

const MUSIC_LINE_PROGRESS: ViewStyle = {
  backgroundColor: "#8e8e92",
  height: 2,
  borderRadius: 2,
  paddingLeft: 1,
  width: "0%",
}

const MUSIC_LINE_CIRCLE: ViewStyle = {
  height: 5,
  width: 5,
  marginTop: -3,
  marginBottom: -3,
  borderRadius: 32,
  backgroundColor: "#8e8e92",
}

const MUSIC_BUTTONS_FOOTER: ViewStyle = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  alignContent: "center",
  alignItems: "center",
  marginTop: 20,
  marginBottom: 20,
  bottom: 0,
  left: 0,
  height: 75,
}

const BUTTON_SVG_2: ViewStyle = {
  ...BUTTON_SVG,
  width: 28,
  height: 28,
}

const PLAY_ICON: ViewStyle = {
  width: 28,
  height: 28,
}

const PLAY_BUTTON: ViewStyle = {
  height: 57,
  width: 56,
  borderRadius: 32,
  borderColor: "gray",
  borderStyle: "solid",
  borderWidth: 0.75,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export const PlayerScreen: React.FC<any> = observer(function HomeScreen({ navigation, route }) {
  const { music } = useStores()

  const [backgroundColor, setBackgroundColor] = useState<string>("black")
  const headerHeight = useHeaderHeight()

  const track = useCurrentTrack()
  const currentMusic = music.getMusicById(Number(track?.id))
  const isPlaying = useIsPlaying()
  const { position, duration } = useProgress(100)
  const progress = Math.round((position * 100) / duration)

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
          dominantColor.r > 230 && dominantColor.g > 230 && dominantColor.b > 230 ? ".5" : "1"
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
          <View style={PLAYER_CONTENT}>
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
              <ShareIcon style={MUSIC_SHARE_ICON} fill={"white"} />
              <View style={MUSIC_DETAILS_TEXT}>
                <Text style={H2}>{track?.title}</Text>
                <Text style={H3}>{track?.artist}</Text>
              </View>
              <HeartIcon style={HEART_ICON} fill={currentMusic?.liked ? "#32d74b" : "white"} />
            </View>
            <View style={MUSIC_TIMING}>
              <Text style={TIMING_TEXT}>{formatTimestamp(position)}</Text>
              <Text style={TIMING_TEXT}>{formatTimestamp(duration)}</Text>
            </View>
            <View style={MUSIC_TIMER_BAR}>
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
          </View>
          <View style={MUSIC_BUTTONS_FOOTER}>
            <RandomIcon style={BUTTON_SVG_2} fill="white" />
            <PreviousIcon style={BUTTON_SVG_2} onPress={TrackPlayer.skipToPrevious} fill="white" />
            <TouchableWithoutFeedback
              onPress={isPlaying ? TrackPlayer.pause : TrackPlayer.play}
              style={PLAY_BUTTON}
            >
              {isPlaying ? (
                <PauseFillIcon style={PLAY_ICON} fill="white" />
              ) : (
                <PlayFillIcon style={{ ...PLAY_ICON, marginLeft: 2 }} fill="white" />
              )}
            </TouchableWithoutFeedback>
            <NextIcon style={BUTTON_SVG_2} onPress={TrackPlayer.skipToNext} fill="white" />
            <RepeatIcon style={BUTTON_SVG_2} fill="white" />
          </View>
        </View>
      </Screen>
    </View>
  )
})
