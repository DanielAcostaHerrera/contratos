import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCampanaEtapasContratacionInput {
  @Field(() => Int, {nullable: true})
  idCampanaEtapas?: number;

  @Field(() => Int)
  idCampana: number;

  @Field(() => Int)
  idEtapa: number;

  @Field(() => Int)
  idPais: number;

  @Field(() => Int)
  mesDia: number;
}
