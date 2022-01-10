import { InputType, Int, Float, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasesCmarcoInput {
  @Field(() => Int, { nullable: true})
  idBaseCMarco?: number;

  @Field(() => Int)
  idBasesGenerales: number;

  @Field(() => Int)
  idProveedor: number;

  @Field(() => Int)
  consecutivo: number;

  @Field({ nullable: true})
  directivaTrd: string | null;

  @Field({ nullable: true})
  directivaGae: string | null;

  @Field()
  fecha: Date;

  @Field(() => Int)
  idProforma: number;

  @Field()
  periodoInic: Date;

  @Field()
  periodoFin: Date;

  @Field(() => Float)
  importeTotal: number;

  @Field(() => Float)
  importeFinanciamiento: number;

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

  @Field({ nullable: true})
  periodoInicV: Date | null;

  @Field({ nullable: true})
  periodoFinV: Date | null;

  @Field(() => Int,{ nullable: true})
  idComprador: number | null;

  @Field({ nullable: true})
  noCMarco: string | null;

  @Field({ nullable: true})
  nProveedor: string | null;
}
