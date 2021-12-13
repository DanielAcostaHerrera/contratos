import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSuplementoPagoInput {
  @Field(() => Int,{nullable:true})
  idSuplementoPagos?: number;

  @Field(() => Int)
  idSuplementoResumen: number;

  @Field(() => Int)
  idEmbarque: number;

  @Field(() => Int)
  idFormaPago: number;

  @Field(() => Int)
  plazoPago: number;

  @Field(() => Int)
  aPartirDe: number;

  @Field(() => Float)
  porciento: number;
}
