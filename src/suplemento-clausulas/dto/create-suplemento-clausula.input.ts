import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSuplementoClausulaInput {
  @Field(() => Int,{nullable: true})
  idSuplementoClausulas?: number;

  @Field(() => Int)
  idSuplementoResumen: number;

  @Field(() => Int)
  idContrato: number;

  @Field(() => Int)
  noClausula: number;

  @Field()
  txClausula: string;

  @Field(() => Int,{nullable: true})
  orden: number | null;

  @Field()
  modificada: boolean;
}
