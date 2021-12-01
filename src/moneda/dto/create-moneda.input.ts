import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMonedaInput {
  @Field(() => Int, { nullable: true})
  idMoneda?: number;

  @Field()
  moneda: string;

  @Field({nullable: true})
  abreviatura: string | null;
}
