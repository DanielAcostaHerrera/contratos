import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasesGeneralesInput {
  @Field(() => Int, { nullable: true})
  idBasesGenerales?: number;

  @Field(() => Int)
  consecutivo: number;

  @Field()
  fecha: Date;

  @Field(() => Int)
  idTipoContrato: number;

  @Field(() => Int)
  idIncoterm: number;

  @Field(() => Int)
  idProforma: number;

  @Field(() => Int)
  idClasificacion: number;

  @Field()
  lugardeFirma: string;

  @Field(() => Int)
  idPais: number;

  @Field(() => Int)
  idProveedor: number;

  @Field({nullable: true})
  nProveedor: string | null;

  @Field()
  nombreRepresentante: string;

  @Field()
  cargoRepresentante: string;

  @Field()
  direccionProveedor: string;

  @Field(() => Int)
  idComprador: number;

  @Field(() => Int)
  vigencia: number;

  @Field()
  aprobado: boolean;

  @Field()
  cancelado: boolean;

  @Field()
  activo: boolean;

  @Field()
  actualizado: Date;
}
