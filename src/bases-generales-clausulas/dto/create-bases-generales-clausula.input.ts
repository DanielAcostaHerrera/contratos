import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasesGeneralesClausulaInput {
  @Field(() => Int, { nullable: true})
  idBasesGeneralesClausulas?: number;

  @Field(() => Int)
  idBasesGenerales: number;

  @Field(() => Int)
  idProformaClausula: number;

  @Field(() => Int)
  idTipoClausula: number;

  @Field(() => Int)
  orden: number;

  @Field()
  basesGeneralesClausula: string;

  @Field()
  excepcional: boolean;

  @Field()
  modificado: Date;
}
