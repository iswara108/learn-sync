/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * TypingResponseBase
 * auto generated base class for the model TypingResponseModel.
 */
export const TypingResponseModelBase = ModelBase
  .named('TypingResponse')
  .props({
    __typename: types.optional(types.literal("TypingResponse"), "TypingResponse"),
    typing: types.union(types.undefined, types.boolean),
    author: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class TypingResponseModelSelector extends QueryBuilder {
  get typing() { return this.__attr(`typing`) }
  get author() { return this.__attr(`author`) }
}
export function selectFromTypingResponse() {
  return new TypingResponseModelSelector()
}

export const typingResponseModelPrimitives = selectFromTypingResponse().typing.author
