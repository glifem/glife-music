/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, version } from "react"
import { ImageStyle, View, ViewStyle } from "react-native"
import ImageView from "../image-view/image";
import { Text } from "../text/text";
import PlayFillIcon from "../../screens/player-screen/play-fill.svg";

const COVER_IMAGE: ImageStyle = {
    height: 54,
    width: 54,
    resizeMode: "cover",
    overflow: "hidden",
}

const PlayerPreviewComponent = () => {
    const [state, setState] = useState({
        coverUrl: 'https://files.gtaliferp.fr/music/103.png',
        title: 'Interlude',
        artist: 'SCH',
        position: 100,
        duration: 260
    })

    const coverUrl = state.coverUrl

    return (
        <View style={{
          height: 55,
          backgroundColor: '#202020'  
        }}>
            <View style={{
                height: 2,
                backgroundColor: "gray",
            }}>
                <View style={{
                    height: 2,
                    width: Math.round((state.position * 100) / state.duration) + '%',
                    backgroundColor: "white"
                }}>
                </View>
            </View>

            <View style={{
                display: "flex",
                alignItems: "center",
                flexDirection: 'row'
            }}>
                <ImageView source={{ uri: coverUrl }} style={COVER_IMAGE} />

                <View style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    marginLeft: 15
                }}>
                    <Text numberOfLines={1}>{state.title}</Text>
                    <Text numberOfLines={1} style={{
                        color: '#ebebf599'
                    }}>{state.artist}</Text>
                </View>
                
                <PlayFillIcon style={{
                    height: 25,
                    width: 25,
                    marginRight: 15
                    // marginTop: 15,
                }} fill="#ffffff" />
            </View>
        </View>
    );
}

export default PlayerPreviewComponent;