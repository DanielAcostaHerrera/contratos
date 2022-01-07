import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSolicitudCodificacionInput {
  @Field(() => Int,{nullable: true})
  idSolicitudCompra?: number;

  @Field(() => Int)
  idPliegoResumen: number;

  @Field(() => Int)
  idReferencia: number;

  @Field()
  decripcion: string;

  @Field(() => Int)
  idUm: number;

  @Field()
  marca: string | null;

  @Field()
  naturaleza: string | null;

  @Field(() => Int)
  packing: number;

  @Field(() => Float)
  cantidad: number;

  @Field()
  dimension: string | null;

  @Field()
  cubicaje: string | null;

  @Field()
  idEmbalaje: number | null;

  @Field(() => Float)
  precioCosto: number;
}
