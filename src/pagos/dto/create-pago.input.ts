import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreatePagoInput {
  @Field(() => Int,{nullable: true})
  idPago?: number;

  @Field(() => Int)
  idEmbarque: number;

  @Field(() => Int)
  idFormaPago: number;

  @Field(() => Int)
  idPagosAPartirDe: number;

  @Field(() => Int)
  plazoPago: number;

  @Field(() => Float)
  porciento: number;
}
