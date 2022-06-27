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

  @Field({nullable: true})
  creado?: Date;

  @Field({nullable: true})
  actualizado?: Date;

  @Field({nullable: true})
  noContratoMarco?: string;
}
