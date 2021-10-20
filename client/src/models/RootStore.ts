import { Instance } from "mobx-state-tree";
import { RootStoreBase } from "./RootStore.base";
import { MyObjectModelType } from ".";
export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase.actions((self) => ({
  add(item: MyObjectModelType) {
    self.myObjects.set(item.id, item);
  },
}));
