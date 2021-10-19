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
    name: types.union(types.undefined, types.string),
    insideObject: types.union(
      types.undefined,
      types.late((): any => InsideObjectModel)
    ),
  })
  .views((self) => ({
    get store() {
      return self.__getStore<RootStoreType>();
    },
  }));

export class MyObjectModelSelector extends QueryBuilder {
  get name() {
    return this.__attr(`name`);
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

export const myObjectModelPrimitives = selectFromMyObject().name;
