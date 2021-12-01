import { InputType, Int, Float, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasesCmarcoInput {
  @Field(() => Int, { nullable: true})
  idBaseCMarco?: number;

  @Field(() => Int)
  idBaseGenerales: number | null;

  @Field(() => Int)
  idProveedor: number;

  @Field(() => Int)
  consecutivo: number;

  @Field()
  directivaTrd: string | null;

  @Field()
  directivaGae: string | null;

  @Field()
  fecha: Date;

  @Field(() => Int)
  idProforma: number;

  @Field()
  especificos: string;

  @Field()
  periodoInic: Date;

  @Field()
  periodoFin: Date;

  @Field(() => Float)
  importeTotal: number;

  @Field(() => Float)
  importeFinanciamiento: number;

  @Field(() => Float)
  importeConFinanciamiento: number;

  @Field(() => Int)
  idPuerto: number;

  @Field()
  aprobado: boolean;

  @Field()
  cancelado: boolean;

  @Field()
  activo: boolean;

  @Field()
  actualizado: Date;

  @Field()
  importeTotalLetras: string | null;

  @Field()
  importeFinanciamientoLetras: string | null;

  @Field()
  importeTotalFinanciamientoLetras: string | null;

  @Field()
  periodoInicV: Date | null;

  @Field()
  periodoFinV: Date | null;

  @Field(() => Int)
  idComprador: number | null;

  @Field()
  noCMarco: string | null;

  @Field()
  nProveedor: string | null;
}
