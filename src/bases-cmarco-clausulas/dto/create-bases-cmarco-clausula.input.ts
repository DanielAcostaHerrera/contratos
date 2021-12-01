import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasesCmarcoClausulaInput {
  @Field(() => Int, { nullable: true})
  idBasesCMarcoClausulas?: number;

  @Field(() => Int)
  idBaseCMarco: number;

  @Field(() => Int)
  idProformaClausula: number;

  @Field(() => Int)
  idTipoClausula: number;

  @Field(() => Int)
  orden: number;

  @Field()
  clausula: string;

  @Field()
  modificado: Date;
}
