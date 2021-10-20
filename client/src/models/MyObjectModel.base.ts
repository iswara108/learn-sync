//@ts-nocheck
/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree";
import { QueryBuilder } from "mst-gql";
import { ModelBase } from "./ModelBase";
import { InsideObjectModel, InsideObjectModelType } from "./InsideObjectModel";
import { InsideObjectModelSelector } from "./InsideObjectModel.base";
import { RootStoreType } from "./index";

/**
 * MyObjectBase
 * auto generated base class for the model MyObjectModel.
 */
export const MyObjectModelBase = ModelBase.named("MyObject")
  .props({
    __typename: types.optional(types.literal("MyObject"), "MyObject"),
    message: types.union(types.undefined, types.string),
    insideObject: types.union(
      types.undefined,
      types.null,
      types.late((): any => InsideObjectModel)
    ),
    id: types.identifier,
    author: types.union(types.undefined, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore<RootStoreType>();
    },
  }));

export class MyObjectModelSelector extends QueryBuilder {
  get message() {
    return this.__attr(`message`);
  }
  get id() {
    return this.__attr(`id`);
  }
  get author() {
    return this.__attr(`author`);
  }
  insideObject(
    builder?:
      | string
      | InsideObjectModelSelector
      | ((selector: InsideObjectModelSelector) => InsideObjectModelSelector)
  ) {
    return this.__child(`insideObject`, InsideObjectModelSelector, builder);
  }
}
export function selectFromMyObject() {
  return new MyObjectModelSelector();
}

export const myObjectModelPrimitives = selectFromMyObject().message.author;
