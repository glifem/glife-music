import { MusicClassModelType } from "./music-models";
import { getMostLikedMusics, getMostListenedMusics, getMostRecentMusics } from "./music-selector";
import { MusicStore } from "./music-store";

export interface IPlaylist {
    title: string;
    selector: (state: MusicStore, count?: number) => MusicClassModelType[];
}

const playlists: IPlaylist[] = [
    { title: 'Les plus récentes', selector: getMostRecentMusics },
    { title: 'Les plus écoutées', selector: getMostListenedMusics },
    { title: 'Les plus aimées', selector: getMostLikedMusics },
];

export default playlists;
