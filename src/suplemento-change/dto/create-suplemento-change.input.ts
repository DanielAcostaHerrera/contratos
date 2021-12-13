import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSuplementoChangeInput {
  @Field(() => Int,{nullable: true})
  idClausulaChange?: number;

  @Field(() => Int)
  idSuplementoResumen: number;

  @Field(() => Int)
  idEmbarque: number;

  @Field(() => Int)
  idContratoClausula: number;

  @Field()
  contenidoViejo: string | null;

  @Field()
  contenidoNuevo: string | null;
}
