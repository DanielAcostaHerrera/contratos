import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContratoClausulaInput {
  @Field(() => Int)
  idContratoClausulas: number;

  @Field(() => Int)
  idContrato: number;

  @Field(() => Int)
  noClausula: number;

  @Field({nullable: true})
  contenido: string | null;
}