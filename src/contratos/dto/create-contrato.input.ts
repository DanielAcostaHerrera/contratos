import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContratoInput {
  @Field(() => Int, {nullable: true})
  idContrato?: number;

  @Field(() => Int)
  idBasesGenerales: number;

  @Field(() => Int)
  idTipoContrato: number;

  @Field(() => Int)
  idProforma: number;

  @Field(() => Int)
  consecutivo: number;

  @Field(() => Int)
  condicionCompra: number;

  @Field()
  lugar: string;

  @Field()
  fecha: Date;

  @Field(() => Int)
  paS: number;

  @Field()
  cancelado: boolean;

  @Field()
  terminado: boolean;

  @Field()
  noContrato: string | null;

  @Field(() => Int)
  proveedor: number;
}
