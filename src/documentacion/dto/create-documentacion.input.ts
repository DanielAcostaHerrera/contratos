import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDocumentacionInput {
  @Field(() => Int)
  idDocumento: number;

  @Field(() => Int)
  idTipoDoc: number;

  @Field()
  nombreFichero: string;

  @Field()
  descripcion: string;

  @Field()
  tipoFichero: string;

  @Field()
  iDoc: string;
}
