import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreatePliegoConcurrenciaDetalleInput {
  @Field(() => Int,{nullable: true})
  idPliegoDetalle?: number;

  @Field(() => Int)
  idPliegoResumen: number;

  @Field(() => Int)
  idEspecifico: number;

  @Field(() => Int)
  idEmbalaje: number;

  @Field(() => Float)
  cantidad: number;

  @Field(() => Int)
  idUnidadMedida: number;

  @Field(() => Float)
  pesoBruto: number;

  @Field(() => Float)
  precioI: number;

  @Field(() => Float)
  precioIi: number;

  @Field(() => Float)
  precioIii: number;
}
