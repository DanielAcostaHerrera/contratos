import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCambiosSuplementoInput {
  @Field(() => Int,{nullable: true})
  idCambio?: number;

  @Field()
  descripciN: string;
}
