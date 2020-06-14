import { InputType, Field } from 'type-graphql';

@InputType()
export default class UpdateProjectInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imgName?: string;

  @Field({ nullable: true })
  url?: string;
}
