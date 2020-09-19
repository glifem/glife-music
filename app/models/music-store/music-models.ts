import { Instance, SnapshotOut, types } from 'mobx-state-tree'

export const MusicAuthorClassModel = types
	.model('MusicAuthorClass', {
		id: types.number,
		name: types.string
	})
	.actions((self) => ({}))

export type MusicAuthorClassModelType = Instance<typeof MusicAuthorClassModel>
export type MusicAuthorClassModelSnapshot = SnapshotOut<typeof MusicAuthorClassModel>

export const MusicClassModel = types
	.model('MusicClass', {
		id: types.number,
		title: types.string,
		author: MusicAuthorClassModel,
		feats: types.optional(types.array(MusicAuthorClassModel), []),
		likes: types.number,
		dislikes: types.optional(types.number, 0),
		views: types.number,
		liked: types.optional(types.boolean, false),
		viewed: types.optional(types.boolean, false),
		createdAt: types.number // timestamp
	})
	.actions((self) => ({
		addLike() {
			self.likes++;
			self.liked = true;
		},
		removeLike() {
			self.likes--;
			self.liked = false;
		},
	}))

export type MusicClassModelType = Instance<typeof MusicClassModel>
export type MusicClassModelSnapshot = SnapshotOut<typeof MusicClassModel>