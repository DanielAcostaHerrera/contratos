import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class FilterBasesGeneralesInput {
  @Field({ nullable: true})
  fechaDesde?: Date;

  @Field({ nullable: true})
  fechaHasta?: Date;

  @Field(() => Int,{ nullable: true})
  idTipoContrato?: number;

  @Field(() => Int,{ nullable: true})
  idIncoterm?: number;

  @Field({ nullable: true})
  lugardeFirma?: string;

  @Field(() => Int,{ nullable: true})
  idPais?: number;

  @Field(() => Int,{ nullable: true})
  idProveedor?: number;

  @Field(() => Int,{ nullable: true})
  idComprador?: number;

  @Field(() => Int,{ nullable: true})
  vigencia?: number;

  @Field({ nullable: true})
  aprobado?: boolean;

  @Field({ nullable: true})
  cancelado?: boolean;

  @Field({ nullable: true})
  activo?: boolean;

  @Field({ nullable: true})
  actualizadoDesde?: Date;

  @Field({ nullable: true})
  actualizadoHasta?: Date;

  @Field({ nullable: true})
  noContrato?: string;
}