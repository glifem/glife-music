import { MusicClassModelType } from "../../models/music-store/music-models"
import { GeneralApiProblem } from "./api-problem"

export type GetMusicsResult = { kind: "ok"; musics: MusicClassModelType[] } | GeneralApiProblem
export type GetMusicResult = { kind: "ok"; music: MusicClassModelType } | GeneralApiProblem
