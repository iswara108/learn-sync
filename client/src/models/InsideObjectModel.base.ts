/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * InsideObjectBase
 * auto generated base class for the model InsideObjectModel.
 */
export const InsideObjectModelBase = ModelBase
  .named('InsideObject')
  .props({
    __typename: types.optional(types.literal("InsideObject"), "InsideObject"),
    dateOfBirth: types.union(types.undefined, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class InsideObjectModelSelector extends QueryBuilder {
  get dateOfBirth() { return this.__attr(`dateOfBirth`) }
}
export function selectFromInsideObject() {
  return new InsideObjectModelSelector()
}

export const insideObjectModelPrimitives = selectFromInsideObject().dateOfBirth
