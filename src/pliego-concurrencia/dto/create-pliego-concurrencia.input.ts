import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePliegoConcurrenciaInput {
  @Field(() => Int,{nullable: true})
  idPliego?: number;

  @Field(() => Int)
  idOferta: number | null;
}
