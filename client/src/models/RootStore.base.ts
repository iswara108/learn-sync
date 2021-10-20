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
import {
  TypingResponseModel,
  TypingResponseModelType,
} from "./TypingResponseModel";
import {
  typingResponseModelPrimitives,
  TypingResponseModelSelector,
} from "./TypingResponseModel.base";

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  myObjects: ObservableMap<string, MyObjectModelType>;
};

/**
 * Enums for the names of base graphql actions
 */
export enum RootStoreBaseQueries {
  queryGetMessages = "queryGetMessages",
}
export enum RootStoreBaseMutations {
  mutateAddNewObject = "mutateAddNewObject",
  mutateSetIsTyping = "mutateSetIsTyping",
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
          ["TypingResponse", () => TypingResponseModel],
        ],
        ["MyObject"],
        "js"
      )
    )
    .props({
      myObjects: types.optional(
        types.map(types.late((): any => MyObjectModel)),
        {}
      ),
    })
    .actions((self) => ({
      queryGetMessages(
        variables?: {},
        resultSelector:
          | string
          | ((
              qb: MyObjectModelSelector
            ) => MyObjectModelSelector) = myObjectModelPrimitives.toString(),
        options: QueryOptions = {}
      ) {
        return self.query<{ getMessages: MyObjectModelType[] }>(
          `query getMessages { getMessages {
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
        variables: { message: string },
        optimisticUpdate?: () => void
      ) {
        return self.mutate<{ addNewObject: boolean }>(
          `mutation addNewObject($message: String!) { addNewObject(message: $message) }`,
          variables,
          optimisticUpdate
        );
      },
      mutateSetIsTyping(
        variables: { typing: boolean },
        optimisticUpdate?: () => void
      ) {
        return self.mutate<{ setIsTyping: boolean }>(
          `mutation setIsTyping($typing: Boolean!) { setIsTyping(typing: $typing) }`,
          variables,
          optimisticUpdate
        );
      },
      subscribeNewMessage(
        variables?: {},
        resultSelector:
          | string
          | ((
              qb: MyObjectModelSelector
            ) => MyObjectModelSelector) = myObjectModelPrimitives.toString(),
        onData?: (item: any) => void,
        onError?: (error: Error) => void
      ) {
        return self.subscribe<{ newMessage: MyObjectModelType }>(
          `subscription newMessage { newMessage {
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
      subscribeIsTyping(
        variables?: {},
        resultSelector:
          | string
          | ((
              qb: TypingResponseModelSelector
            ) => TypingResponseModelSelector) = typingResponseModelPrimitives.toString(),
        onData?: (item: any) => void,
        onError?: (error: Error) => void
      ) {
        return self.subscribe<{ isTyping: TypingResponseModelType }>(
          `subscription isTyping { isTyping {
        ${
          typeof resultSelector === "function"
            ? resultSelector(new TypingResponseModelSelector()).toString()
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
