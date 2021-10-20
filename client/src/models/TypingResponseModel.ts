import { Instance } from "mobx-state-tree"
import { TypingResponseModelBase } from "./TypingResponseModel.base"

/* The TypeScript type of an instance of TypingResponseModel */
export interface TypingResponseModelType extends Instance<typeof TypingResponseModel.Type> {}

/* A graphql query fragment builders for TypingResponseModel */
export { selectFromTypingResponse, typingResponseModelPrimitives, TypingResponseModelSelector } from "./TypingResponseModel.base"

/**
 * TypingResponseModel
 */
export const TypingResponseModel = TypingResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
