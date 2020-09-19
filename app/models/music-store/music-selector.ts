import { shuffleArray } from "../../utils/array";
import { MusicClassModelType } from "./music-models";
import { MusicStore } from "./music-store";

export const getCurrentMusic = (state: MusicStore) => state.list.find(m => m.id == state.currentMusicId);

export const getLikedMusics = (state: MusicStore) => state.list.filter(m => m.liked == true);

export const getMostRecentMusics = (state: MusicStore, count: number = 50) =>
	state.list.sort((m1, m2) => m2.createdAt - m1.createdAt).slice(0, count);

export const getMostListenedMusics = (state: MusicStore, count: number = 50) =>
	state.list.sort((m1, m2) => m2.views - m1.views).slice(0, count);

export const getMostLikedMusics = (state: MusicStore, count: number = 50) =>
	state.list.sort((m1, m2) => m2.likes - m1.likes).slice(0, count);

export const getRandomMusics = (state: MusicStore, count: number = 50) => shuffleArray(state.list).slice(count);

export const getMusicAuthorNames = (music: MusicClassModelType) =>
	music.author.name + (music.feats.length > 0 ? ` ft. ${music.feats.map(a => a.name).join(', ')}` : '');

export const searchMusic = (state: MusicStore, search: string) => {
	return state.list.filter(m => (m.title + getMusicAuthorNames(m)).toLowerCase().includes(search.toLowerCase()));
};
