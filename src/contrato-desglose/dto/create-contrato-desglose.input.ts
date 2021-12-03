import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContratoDesgloseInput {
  @Field(() => Int, {nullable: true})
  idContratoDesglose?: number;

  @Field(() => Int)
  idContrato: number;

  @Field(() => Int)
  noClausula: number;

  @Field()
  contenido: string | null;
}
