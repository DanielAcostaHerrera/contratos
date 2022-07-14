import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProformaClausulaInput {
  @Field(() => Int, { nullable: true})
  idProformaClausula?: number;

  @Field(() => Int)
  idTipoContrato: number;

  @Field(() => Int)
  idIncoterm: number;

  @Field(() => Int)
  idTipoClausula: number;

  @Field(() => Int)
  orden: number;

  @Field()
  clausula: string;
}
