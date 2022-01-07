import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateNegociacionDetalleInput {
  @Field(() => Int, {nullable: true})
  idNegociacionDetalle?: number;

  @Field(() => Int)
  idNegociacion: number;

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

  @Field(() => Int,{nullable: true})
  idAcuerdo: number | null;

  @Field()
  detalles: string;
}
