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

  @Field({nullable: true})
  marca: string | null;

  @Field({nullable: true})
  naturaleza: string | null;

  @Field(() => Int)
  packing: number;

  @Field(() => Float)
  cantidad: number;

  @Field({nullable: true})
  dimension: string | null;

  @Field({nullable: true})
  cubicaje: string | null;

  @Field({nullable: true})
  idEmbalaje: number | null;

  @Field(() => Float)
  precioCosto: number;
}
