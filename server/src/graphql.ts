import {
  PubSub,
  PubSubEngine,
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  Subscription,
  ID,
  Ctx,
} from "type-graphql";
import { ExpressContext } from "apollo-server-express";
type NotificationPayload = { newMessage: string; id: number };
type TypingPayload = { author: string; typing: boolean };

@ObjectType()
export class InsideObject {
  @Field(() => Date)
  dateOfBirth: Date;
}

@ObjectType()
export class MyObject {
  @Field(() => String)
  message: string;

  @Field(() => InsideObject, { nullable: true })
  insideObject?: InsideObject;

  @Field(() => ID)
  id: number;

  @Field()
  author: string;
}

@ObjectType()
export class TypingResponse implements TypingPayload {
  @Field(() => Boolean)
  typing: boolean;

  @Field(() => String)
  author: string;
}

@Resolver()
export class MyResolver {
  store: MyObject[];

  @Query(() => [MyObject])
  getMessages() {
    if (!this.store) this.store = [];
    return this.store;
  }

  @Subscription({ topics: "NOTIFICATIONS" })
  newMessage(
    @Root() notificationPayload: NotificationPayload,
    @Ctx() ctx: ExpressContext
  ): MyObject {
    return Object.assign<MyObject, MyObject>(new MyObject(), {
      message: notificationPayload.newMessage,
      id: notificationPayload.id,
      author: ctx.req.headers["user-agent"] || "UNIDENTIFIED",
    });
  }

  @Mutation(() => Boolean)
  addNewObject(
    @Arg("message") aMessage: string,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() ctx: ExpressContext
  ) {
    if (!this.store) this.store = [];
    this.store.push(
      Object.assign<MyObject, MyObject>(new MyObject(), {
        message: aMessage,
        id: this.store.length + 1,
        author: ctx.req.headers["user-agent"] || "UNIDENTIFIED",
      })
    );
    pubSub.publish("NOTIFICATIONS", {
      newMessage: aMessage,
      id: this.store.length + 1,
    } as NotificationPayload);

    console.log(this.store);
    return true;
  }

  @Mutation(() => Boolean)
  setIsTyping(
    @Arg("typing") typing: boolean,
    @Ctx() { req }: ExpressContext,
    @PubSub() pubSub: PubSubEngine
  ) {
    pubSub.publish("IS_TYPING", {
      author: req.headers["user-agent"] || "UNIDENTIFIED",
      typing,
    } as TypingPayload);

    return true;
  }

  @Subscription({ topics: "IS_TYPING" })
  isTyping(@Root() typingPayload: TypingPayload): TypingResponse {
    return Object.assign<TypingResponse, TypingResponse>(new TypingResponse(), {
      author: typingPayload.author || "UNIDENTIFIED",
      typing: typingPayload.typing || false,
    });
  }
}
