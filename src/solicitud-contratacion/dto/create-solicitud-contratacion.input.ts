import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSolicitudContratacionInput {
  @Field(() => Int,{nullable: true})
  idSolicitudContrato?: number;

  @Field(() => Int)
  idNegociacion: number;

  @Field(() => Int)
  consecutivo: number;

  @Field(() => Int)
  idComprador: number;

  @Field()
  fecha: Date;

  @Field()
  nota: string | null;
}
