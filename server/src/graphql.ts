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
} from "type-graphql";

type NotificationPayload = { newMessage: string; id: number };

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
}

@Resolver()
export class MyResolver {
  store: MyObject[];

  @Query(() => [MyObject])
  getNames() {
    return this.store;
  }

  @Subscription({ topics: "NOTIFICATIONS" })
  newMessage(@Root() notificationPayload: NotificationPayload): MyObject {
    return Object.assign<MyObject, MyObject>(new MyObject(), {
      message: notificationPayload.newMessage,
      id: notificationPayload.id,
    });
  }

  @Mutation(() => Boolean)
  addNewObject(
    @Arg("message") aMessage: string,
    @PubSub() pubSub: PubSubEngine
  ) {
    if (!this.store) this.store = [];
    this.store.push(
      Object.assign<MyObject, MyObject>(new MyObject(), {
        message: aMessage,
        id: this.store.length + 1,
      })
    );
    pubSub.publish("NOTIFICATIONS", {
      newMessage: aMessage,
      id: this.store.length + 1,
    } as NotificationPayload);

    console.log(this.store);
    return true;
  }
}
