import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePagosApartirDeInput {
  @Field(() => Int,{nullable: true})
  idPartir?: number;

  @Field()
  aPartirDe: string;
}
