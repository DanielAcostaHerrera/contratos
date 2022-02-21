import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasesGeneralesInput {
  @Field(() => Int, { nullable: true})
  idBasesGenerales?: number;

  @Field(() => Int, { nullable: true})
  consecutivo?: number;

  @Field({ nullable: true})
  fecha?: Date;

  @Field(() => Int)
  idTipoContrato: number;

  @Field(() => Int)
  idIncoterm: number;

  @Field(() => Int)
  idProforma: number;

  @Field()
  lugardeFirma: string;

  @Field(() => Int)
  idPais: number;

  @Field(() => Int)
  idProveedor: number;

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

  @Field({ nullable: true})
  actualizado?: Date;
}
