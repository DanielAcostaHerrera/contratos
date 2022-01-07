import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSolicitudOfertasEntradaInput {
  @Field(() => Int,{nullable: true})
  idOfertasEntradas?: number;

  @Field(() => Int)
  idOfertasProveedor: number;

  @Field()
  fechaRecepcionOferta: Date;

  @Field()
  detalle: string;

  @Field(()=>Int)
  idReferencia: number;

  @Field(()=>Int)
  idCodigo: number;

  @Field()
  decripcion: string;

  @Field(()=>Int)
  idUm: number;

  @Field(() => Int)
  packing: number;

  @Field(() => Float)
  cantidad: number;

  @Field({nullable: true})
  dimension: string | null;

  @Field({nullable: true})
  cubicaje: string | null;

  @Field(() => Float)
  precioCosto: number;
}
