import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEtapasContratacionInput {
  @Field(() => Int, {nullable: true})
  idEtapa?: number;

  @Field()
  etapa: string;

  @Field({nullable: true})
  calculos: string | null;

  @Field(() => Int)
  tiempoMax: number;

  @Field(() => Int)
  tiempoReal: number;
}
