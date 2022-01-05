import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSolicitudCodificacionInput {
  @Field(() => Int,{nullable: true})
  idSolicitudCompra?: number;

  @Field(() => Int)
  idPliegoResumen: number;

  @Field()
  referencia: string;

  @Field()
  decripcion: string;

  @Field()
  um: string;

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
