import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGruposDeCompraInput {
  @Field(() => Int, { nullable: true})
  idGrupo?: number;

  @Field()
  grupos: string;
}
