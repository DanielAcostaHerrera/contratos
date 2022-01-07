import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSuplementoClausulaInput {
  @Field(() => Int,{nullable: true})
  idSuplementoClausulas?: number;

  @Field(() => Int)
  idSuplementoResumen: number;

  @Field(() => Int)
  idContratoClausulas: number;

  @Field(() => Int,{nullable: true})
  orden: number | null;

  @Field()
  modificada: boolean;
}
