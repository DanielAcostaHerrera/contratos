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

  @Field({nullable: true})
  contenidoViejo: string | null;

  @Field({nullable: true})
  contenidoNuevo: string | null;
}
