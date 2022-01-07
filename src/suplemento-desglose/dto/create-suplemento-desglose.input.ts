import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSuplementoDesgloseInput {
  @Field(() => Int,{nullable: true})
  idSuplementoDesglose?: number;

  @Field(() => Int)
  idSuplementoResumen: number;

  @Field(() => Int)
  idEmbarque: number;

  @Field(() => Int)
  idReferencia: number | null;

  @Field(() => Int)
  idCodigo: number;

  @Field()
  descripcionSp: string | null;

  @Field(() => Int)
  idUnidadMedida: number;

  @Field(() => Float)
  cantidadPorCarton: number;

  @Field(() => Int)
  paquete: number;

  @Field(() => Int)
  cantidadCartones: number;

  @Field(() => Float)
  volumen: number;

  @Field(() => Float)
  precio: number;

  @Field(() => Float)
  precioPaquete: number;

  @Field(() => Float)
  packing: number;
}
