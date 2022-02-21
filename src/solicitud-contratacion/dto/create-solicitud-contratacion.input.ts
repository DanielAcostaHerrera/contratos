import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSolicitudContratacionInput {
  @Field(() => Int,{nullable: true})
  idSolicitudContrato?: number;

  @Field(() => Int)
  idNegociacion: number;

  @Field(() => Int,{nullable: true})
  consecutivo: number | null;

  @Field(() => Int)
  idComprador: number;

  @Field()
  fecha: Date;

  @Field({nullable: true})
  nota: string | null;
}
