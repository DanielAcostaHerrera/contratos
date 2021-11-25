import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMonedaInput {
  @Field() 
  idMoneda: number;

  @Field()
  moneda: string;

  @Field({nullable: true})
  abrev: string | null;
}
