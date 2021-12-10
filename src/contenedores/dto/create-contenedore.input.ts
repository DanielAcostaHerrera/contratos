import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContenedoreInput {
  @Field(() => Int,{nullable: true})
  idContenedor?: number;

  @Field()
  noContenedor: string;
}
