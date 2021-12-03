import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNegociacionDetallesInput {
  @Field(() => Int, {nullable: true})
  idNegociacionDetalles: number;

  @Field(() => Int)
  idNegociacion: number;

  @Field(() => Int)
  consecutivo: number;

  @Field()
  fecha: Date | null;

  @Field(() => Int)
  acuerdo: number | null;

  @Field()
  detalles: string | null;
}
