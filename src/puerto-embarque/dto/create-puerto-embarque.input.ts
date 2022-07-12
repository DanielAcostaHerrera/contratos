import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePuertoEmbarqueInput {
  @Field(() => Int, { nullable: true})
  idPuertoEmbarque?: number;

  @Field(() => Int,{nullable: true})
  idEmbarque?: number;

  @Field(() => Int)
  idPuertoOrigen: number;

  @Field(() => Int)
  idPuertoDestino: number;
}
