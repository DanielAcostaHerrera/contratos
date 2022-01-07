import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNegociacionDetallesInput {
  @Field(() => Int, {nullable: true})
  idNegociacionDetalles: number;

  @Field(() => Int)
  idNegociacion: number;

  @Field(() => Int)
  consecutivo: number;

  @Field({nullable: true})
  fecha: Date | null;

  @Field(() => Int,{nullable: true})
  acuerdo: number | null;

  @Field({nullable: true})
  detalles: string | null;
}
