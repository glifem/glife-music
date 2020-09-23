import { MusicClassModelType } from "../models/music-store/music-models"
import TrackPlayer, {
  Event,
  State,
  Track,
  usePlaybackState,
  useTrackPlayerEvents,
} from "react-native-track-player"
import { Platform } from "react-native"
import { getMusicAuthorNames } from "../models/music-store/music-selector"
import { useEffect, useState } from "react"
const { S3_URL } = require("../config/env")

export const setPlayerQueue = async (
  musics: MusicClassModelType[],
  startWithId: number | string,
) => {
  await TrackPlayer.reset()
  await TrackPlayer.setupPlayer()

  const tracks: Track[] = musics.map((music) => ({
    id: music.id.toString(),
    title: music.title,
    artist: getMusicAuthorNames(music),
    artwork: `${S3_URL}/music/${music.id}.png`,
    //ios doesn't support ogg and mp3 files aren't available yet
    url:
      Platform.OS == "android"
        ? `${S3_URL}/music/${music.id}.ogg`
        : "https://cdn.discordapp.com/attachments/392980227263037450/758085951963529267/80.mp3",
  }))

  await TrackPlayer.add(tracks)
  await TrackPlayer.skip(startWithId.toString())
  await TrackPlayer.play()
}

export const useCurrentTrack = () => {
  const [trackId, setTrackId] = useState<string>(null)
  const [track, setTrack] = useState<Track>(null)

  useTrackPlayerEvents([Event.PlaybackTrackChanged], ({ nextTrack }) => {
    setTrackId(nextTrack)
  })

  useEffect(() => {
    let didCancel = false
    TrackPlayer.getCurrentTrack().then((trackId) => {
      !didCancel && trackId && setTrackId(trackId)
    })
    return () => (didCancel = true)
  }, [])

  useEffect(() => {
    let didCancel = false
    TrackPlayer.getTrack(trackId)
      .then((track) => !didCancel && setTrack(track))
      .catch(() => !didCancel && setTrack(null))
    return () => (didCancel = true)
  }, [trackId])

  return track
}

export const useIsPlaying = () => {
  const [playing, setPlaying] = useState(false)
  const state = usePlaybackState()

  useEffect(() => {
    setPlaying(state == State.Playing || state == State.Buffering)
  }, [state])

  return playing
}
