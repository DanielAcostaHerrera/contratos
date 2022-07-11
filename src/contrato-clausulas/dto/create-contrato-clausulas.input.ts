import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContratoClausulaInput {
  @Field(() => Int,{nullable: true})
  idContratoClausulas?: number;

  @Field(() => Int,{nullable: true})
  idContrato?: number;

  @Field(() => Int)
  noClausula: number;

  @Field({nullable: true})
  contenido: string | null;
}
