import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSuplementoPuertoEmbarqueInput {
  @Field(() => Int,{nullable: true})
  idSuplementoPuertoEmbarque?: number;

  @Field(() => Int)
  idSuplementoResumen: number;

  @Field(() => Int)
  idEmbarque: number;

  @Field(() => Int)
  idPuertoOrigen: number;

  @Field(() => Int)
  idPuertoDestino: number;
}
