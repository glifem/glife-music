import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { Screen, Wallpaper } from "../../components"
import {
  FlatList,
  ImageStyle,
  Platform,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Text } from "react-native"
import { getMusicAuthorNames, searchMusic } from "../../models/music-store/music-selector"
import { color } from "../../theme"
import ImageView from "../../components/image-view/image"
import SearchBar from "react-native-platform-searchbar"
import { translate } from "../../i18n"

const { S3_URL } = require("../../config/env")

const SCREEN_CONTAINER: ViewStyle = {
  flex: 1,
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
  paddingHorizontal: 15,
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

const SEARCH: ViewStyle = {
  marginHorizontal: 15,
  marginTop: Platform.OS == "android" && 15,
  marginBottom: 15,
}

const INPUT: TextStyle = {
  backgroundColor: "#2d2d2f",
}

const SearchScreen = observer(function SearchScreen() {
  const { music } = useStores()

  const [search, setSearch] = useState("")

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={ROW} onPress={() => console.log("press")}>
        <ImageView style={COVER_IMAGE} source={{ uri: `${S3_URL}/music/${item.id}.png` }} />
        <View style={INFOS}>
          <Text style={TITLE}>{item.title}</Text>
          <Text style={AUTHORS}>{getMusicAuthorNames(item)}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={SCREEN_CONTAINER}>
      <Wallpaper />
      <Screen backgroundColor={color.transparent}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          style={SEARCH}
          inputStyle={INPUT}
          placeholder={translate("common.search")}
          cancelText={translate("common.cancel")}
          theme="dark"
        />
        <FlatList
          scrollEnabled={true}
          data={searchMusic(music, search)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Screen>
    </View>
  )
})

export default SearchScreen
