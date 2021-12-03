import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateNegociacionResumenInput {
  @Field(() => Int, {nullable: true})
  idNegociacion?: number;

  @Field(() => Int)
  consecutivo: number;

  @Field()
  noNegociacion: string | null;

  @Field()
  fecha: Date;

  @Field(() => Int)
  comite: number;

  @Field(() => Int)
  idTipoCompras: number;

  @Field(() => Int)
  idGrupo: number;

  @Field(() => Int)
  idMoneda: number;

  @Field()
  mercancias: string;

  @Field()
  aprobada: boolean;

  @Field()
  cancelada: boolean;

  @Field()
  nota: string | null;

  @Field()
  noNeg: string | null;

  @Field(() => Int)
  proveedor: number | null;

  @Field(() => Float)
  importeTrd: number | null;

  @Field(() => Float)
  importeGae: number | null;

  @Field(() => Float)
  importeCuc: number | null;

  @Field()
  comentarios: string | null;

  @Field()
  operacion: boolean | null;

  @Field(() => Float)
  tasa: number | null;

  @Field()
  terminado: boolean | null;

  @Field()
  idNegociacionUnico: string | null;
}
