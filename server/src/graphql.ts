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
} from "type-graphql";

type NotificationPayload = { newName: string };

@ObjectType()
export class InsideObject {
  @Field(() => Date)
  dateOfBirth: Date;
}

@ObjectType()
export class MyObject {
  @Field(() => String)
  name: string;

  @Field(() => InsideObject)
  insideObject: InsideObject;
}

@Resolver()
export class MyResolver {
  @Query(() => MyObject)
  getNames() {
    return Object.assign<MyObject, MyObject>(new MyObject(), {
      name: "hi",
      insideObject: Object.assign<InsideObject, InsideObject>(
        new InsideObject(),
        { dateOfBirth: new Date("1981-10-06") }
      ),
    });
  }

  @Subscription({ topics: "NOTIFICATIONS" })
  newName(@Root() notificationPayload: NotificationPayload): MyObject {
    return Object.assign<MyObject, MyObject>(new MyObject(), {
      name: notificationPayload.newName,
      insideObject: Object.assign<InsideObject, InsideObject>(
        new InsideObject(),
        { dateOfBirth: new Date("1981-10-06") }
      ),
    });
  }

  @Mutation(() => Boolean)
  addNewObject(@Arg("name") aName: string, @PubSub() pubSub: PubSubEngine) {
    console.log(aName);
    pubSub.publish("NOTIFICATIONS", { newName: aName });
    return true;
  }
}
