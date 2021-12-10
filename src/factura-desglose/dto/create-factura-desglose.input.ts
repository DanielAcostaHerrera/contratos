import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateFacturaDesgloseInput {
  @Field(() => Int,{nullable:true})
  idFacturaDesglose?: number;

  @Field(() => Int)
  referencia: number | null;
  
  @Field(() => Int)
  idFactura: number;

  @Field(() => Int)
  codigo: number;

  @Field(() => Int)
  paquete: number;

  @Field(() => Float)
  bultos: number;

  @Field(() => Float)
  cantidad: number;

  @Field(() => Float)
  precioPaquete: number;

  @Field(() => Float)
  precio: number;

  @Field(() => Int)
  paisOrigen: number | null;

  @Field(() => Float)
  suplemento: number;

  @Field(() => Float)
  packing: number;

  @Field(() => Int)
  cajas: number;
}
