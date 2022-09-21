import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateContratoDesgloseInput {
  @Field(() => Int,{nullable:true})
  idContratoDesglose?: number;

  @Field(() => Int,{nullable: true})
  idEmbarque: number | null;
  
  @Field(() => Int,{nullable: true})
  idReferencia: number | null;

  @Field(() => Int)
  idCodigo: number;

  @Field({nullable: true})
  descripcionAx: string | null;

  @Field(() => Int)
  idUnidadMedida: number;

  @Field(() => Float)
  cantidadPorCarton: number;

  @Field(() => Int,{nullable: true})
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

  @Field(() => Int)
  cajas: number;
}
