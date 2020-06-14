import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateProjectInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  imgName: string;

  @Field()
  url: string;
}
