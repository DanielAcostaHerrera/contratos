import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTiposContenedorInput {
  @Field(() => Int, {nullable: true})
  idTipoContenedor?: number;

  @Field()
  tipoContenedor: string;
}
