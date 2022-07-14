import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasesGeneralesClausulaInput {
  @Field(() => Int, { nullable: true})
  idBasesGeneralesClausulas?: number;

  @Field(() => Int, { nullable: true})
  idBasesGenerales?: number;

  @Field(() => Int)
  idTipoClausula: number;

  @Field(() => Int)
  orden: number;

  @Field()
  clausula: string;

  @Field()
  excepcional: boolean;

  @Field({ nullable: true})
  modificado?: Date;

  @Field(() => Int,{ nullable: true})
  numero?: number;
}
