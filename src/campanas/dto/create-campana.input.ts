import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCampanaInput {
  @Field(() => Int, {nullable: true})
  idCampana?: number;

  @Field()
  campana: string;
}
