import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSuplementoDesgloseInput {
  @Field(() => Int,{nullable: true})
  idSuplementoDesglose?: number;

  @Field(() => Int)
  idSuplementoResumen: number;

  @Field(() => Int)
  idEmbarque: number;

  @Field(() => Int,{nullable: true})
  idReferencia: number | null;

  @Field(() => Int)
  idCodigo: number;

  @Field({nullable: true})
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

  @Field(() => Float)
  cajas: number;
}
