import { types, Instance } from "mobx-state-tree"
import { flow } from "mobx"
import { withStatus } from "../extensions/with-status"
import { withEnvironment } from "../extensions/with-environment"
import { MusicClassModel, MusicClassModelType } from "./music-models"

export const MusicModel = types
  .model("MusicStore")
  .props({
    list: types.optional(types.array(MusicClassModel), []),
  })
  .extend(withStatus)
  .extend(withEnvironment)
  .actions((self) => ({
    setMusics(values: MusicClassModelType[]) {
      if (self.list) {
        if (values) {
          self.list.replace(values as MusicClassModelType[])
        } else {
          self.list.clear()
        }
      } else {
        // eslint-disable-next-line
        self.list = values as any
      }
    },
  }))
  .actions((self) => ({
    getMusics: flow(function* () {
      self.setStatus("pending")
      try {
        const result = yield self.environment.api.getMusics()
        if (result.kind === "ok") {
          self.setMusics(result.musics)
          self.setStatus("done")
        } else {
          self.setStatus("error")
        }
      } catch (e) {
        console.log(e)
        self.setStatus("error")
      }
    }),
    getMusicById: (id: number) => {
      return self.list.find((music) => music.id === id)
    },
  }))

export type MusicStore = Instance<typeof MusicModel>
