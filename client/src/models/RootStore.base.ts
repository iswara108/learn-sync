//@ts-nocheck
/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx";
import { types } from "mobx-state-tree";
import {
  MSTGQLStore,
  configureStoreMixin,
  QueryOptions,
  withTypedRefs,
} from "mst-gql";

import { MyObjectModel, MyObjectModelType } from "./MyObjectModel";
import {
  myObjectModelPrimitives,
  MyObjectModelSelector,
} from "./MyObjectModel.base";
import { InsideObjectModel, InsideObjectModelType } from "./InsideObjectModel";
import {
  insideObjectModelPrimitives,
  InsideObjectModelSelector,
} from "./InsideObjectModel.base";

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {};

/**
 * Enums for the names of base graphql actions
 */
export enum RootStoreBaseQueries {
  queryGetNames = "queryGetNames",
}
export enum RootStoreBaseMutations {
  mutateAddNewObject = "mutateAddNewObject",
}

/**
 * Store, managing, among others, all the objects received through graphQL
 */
export const RootStoreBase = withTypedRefs<Refs>()(
  MSTGQLStore.named("RootStore")
    .extend(
      configureStoreMixin(
        [
          ["MyObject", () => MyObjectModel],
          ["InsideObject", () => InsideObjectModel],
        ],
        [],
        "js"
      )
    )
    .props({})
    .actions((self) => ({
      queryGetNames(
        variables?: {},
        resultSelector:
          | string
          | ((
              qb: MyObjectModelSelector
            ) => MyObjectModelSelector) = myObjectModelPrimitives.toString(),
        options: QueryOptions = {}
      ) {
        return self.query<{ getNames: MyObjectModelType }>(
          `query getNames { getNames {
        ${
          typeof resultSelector === "function"
            ? resultSelector(new MyObjectModelSelector()).toString()
            : resultSelector
        }
      } }`,
          variables,
          options
        );
      },
      mutateAddNewObject(
        variables: { name: string },
        optimisticUpdate?: () => void
      ) {
        return self.mutate<{ addNewObject: boolean }>(
          `mutation addNewObject($name: String!) { addNewObject(name: $name) }`,
          variables,
          optimisticUpdate
        );
      },
      subscribeNewName(
        variables?: {},
        resultSelector:
          | string
          | ((
              qb: MyObjectModelSelector
            ) => MyObjectModelSelector) = myObjectModelPrimitives.toString(),
        onData?: (item: any) => void,
        onError?: (error: Error) => void
      ) {
        return self.subscribe<{ newName: MyObjectModelType }>(
          `subscription newName { newName {
        ${
          typeof resultSelector === "function"
            ? resultSelector(new MyObjectModelSelector()).toString()
            : resultSelector
        }
      } }`,
          variables,
          onData,
          onError
        );
      },
    }))
);
