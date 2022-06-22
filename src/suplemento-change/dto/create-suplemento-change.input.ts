import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSuplementoChangeInput {
  @Field(() => Int,{nullable: true})
  idClausulaChange?: number;

  @Field(() => Int)
  idSuplementoResumen: number;

  @Field(() => Int,{nullable: true})
  idEmbarque: number | null;

  @Field(() => Int)
  idCambio: number;

  @Field(() => Int,{nullable: true})
  orden: number | null;

  @Field()
  clausula: string;

  @Field({nullable: true})
  contenidoViejo: string | null;

  @Field({nullable: true})
  contenidoNuevo: string | null;
}
