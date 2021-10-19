import { Instance } from "mobx-state-tree"
import { MyObjectModelBase } from "./MyObjectModel.base"

/* The TypeScript type of an instance of MyObjectModel */
export interface MyObjectModelType extends Instance<typeof MyObjectModel.Type> {}

/* A graphql query fragment builders for MyObjectModel */
export { selectFromMyObject, myObjectModelPrimitives, MyObjectModelSelector } from "./MyObjectModel.base"

/**
 * MyObjectModel
 */
export const MyObjectModel = MyObjectModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
