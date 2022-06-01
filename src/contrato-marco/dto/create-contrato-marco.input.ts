import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateContratoMarcoInput {
  @Field(() => Int,{nullable: true})
  idCMarco?: number;

  @Field(() => Int)
  idProveedor: number;

  @Field()
  fecha: Date;

  @Field(() => Int)
  consecutivo: number;

  @Field(() => Float)
  monto: number;

  @Field(() => Float)
  contratado: number;

  @Field(() => Float,{nullable: true})
  pendiente?: number;

  @Field()
  creado: Date;

  @Field()
  actualizado: Date;
}
