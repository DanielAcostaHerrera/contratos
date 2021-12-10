import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateContratoDesgloseInput {
  @Field(() => Int,{nullable:true})
  idContratoDesglose?: number;

  @Field(() => Int)
  idEmbarque: number | null;
  
  @Field(() => Int)
  referencia: number | null;

  @Field(() => Int)
  codigo: number;

  @Field()
  descripcionAx: string | null;

  @Field(() => Int)
  unidadMedidaCarton: number;

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

  @Field(() => Int)
  cajas: number;
}
