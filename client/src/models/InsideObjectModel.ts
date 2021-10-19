import { Instance } from "mobx-state-tree"
import { InsideObjectModelBase } from "./InsideObjectModel.base"

/* The TypeScript type of an instance of InsideObjectModel */
export interface InsideObjectModelType extends Instance<typeof InsideObjectModel.Type> {}

/* A graphql query fragment builders for InsideObjectModel */
export { selectFromInsideObject, insideObjectModelPrimitives, InsideObjectModelSelector } from "./InsideObjectModel.base"

/**
 * InsideObjectModel
 */
export const InsideObjectModel = InsideObjectModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
