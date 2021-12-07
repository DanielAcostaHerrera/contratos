import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTiemposTravesiaInput {
  @Field(() => Int)
  idTiemposTravesia: number;

  @Field(() => Int)
  idPais: number;

  @Field(() => Int)
  idEtapa: number;

  @Field(() => Int)
  tiempo: number;
}
