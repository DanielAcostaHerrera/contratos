import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateNegociacionDetalleInput {
  @Field(() => Int, {nullable: true})
  idNegociacionDetalle?: number;

  @Field(() => Int)
  idNegociacion: number;

  @Field(() => Int)
  idProveedor: number;

  @Field(() => Float)
  importeTrd: number;

  @Field(() => Float)
  importeGae: number;

  @Field(() => Float)
  importeCuc: number;

  @Field()
  fecha: Date;

  @Field(() => Float)
  tasa: number;

  @Field(() => Int)
  idAcuerdo: number | null;

  @Field()
  detalles: string;
}
