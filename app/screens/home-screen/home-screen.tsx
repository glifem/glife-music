import React from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import playlists, { IPlaylist } from "../../models/music-store/music-types"
import { getMusicAuthorNames } from "../../models/music-store/music-selector"
import { MusicClassModelType } from "../../models/music-store/music-models"
import ImageView from "../../components/image-view/image"
import { useNavigation } from "@react-navigation/native"
import { setPlayerQueue } from "../../utils/track-player"
import { S3_URL } from "../../config/env"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const HOME_PAGE: ViewStyle = {
  padding: spacing[3],
  paddingTop: 0,
}

const H1: TextStyle = {
  fontSize: 22,
  fontWeight: "bold",
  marginTop: 8,
  marginBottom: 5,
}

const CATEGORY: ViewStyle = {
  display: "flex",
}

const ROW: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  marginBottom: spacing[0],
  width: "100%",
}

const MUSIC: ViewStyle = {
  display: "flex",
  flexDirection: "column",
  marginRight: spacing[3],
  flex: 1,
}

const COVER_IMAGE: ImageStyle = {
  aspectRatio: 1,
  borderRadius: 5,
  marginBottom: 2,
  flex: 1,
  height: undefined,
  width: undefined,
  resizeMode: "cover",
  overflow: "hidden",
}

const H3: TextStyle = {
  margin: 0,
  fontSize: 12,
  width: "100%",
  maxHeight: 15,
  fontWeight: "bold",
}

const H3_ARTIST: TextStyle = {
  ...H3,
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

export const HomeScreen = observer(function HomeScreen() {
  const { music } = useStores()
  const navigation = useNavigation()

  const goToMusic = React.useMemo(() => () => navigation.navigate("player"), [navigation])

  const getPlaylist = (playlist: IPlaylist, index: number) => {
    const musics = playlist.selector(music)

    const onMusicClick = async (e: GestureResponderEvent, id: number) => {
      e.stopPropagation()
      e.preventDefault()

      await setPlayerQueue(musics, id)
      goToMusic()
    }

    const goToPath = () => {}

    return (
      <TouchableOpacity key={index} style={CATEGORY} onPress={goToPath}>
        <Text style={H1}>{playlist.title}</Text>
        <View style={ROW}>
          {musics.slice(0, 3).map((m, k) => getMusic(m, onMusicClick, k === 2))}
        </View>
      </TouchableOpacity>
    )
  }

  const getMusic = (
    music: MusicClassModelType,
    onPress: (e: GestureResponderEvent, id: number) => void,
    lastChild: boolean,
  ) => {
    const coverUrl = `${S3_URL}/music/${music.id}.png`

    return (
      <TouchableOpacity
        key={music.id}
        style={{ ...MUSIC, ...(lastChild ? { marginRight: 0 } : {}) }}
        onPress={(e) => onPress(e, music.id)}
      >
        <ImageView source={{ uri: coverUrl }} style={COVER_IMAGE} />
        <Text numberOfLines={1} style={H3}>
          {music.title}
        </Text>
        <Text numberOfLines={1} style={H3_ARTIST}>
          {getMusicAuthorNames(music)}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="homeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        {/* Playlists container */}
        <View style={HOME_PAGE}>{playlists.map((p, index) => getPlaylist(p, index))}</View>
      </Screen>
    </View>
  )
})
