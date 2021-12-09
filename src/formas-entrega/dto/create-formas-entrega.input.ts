import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFormasEntregaInput {
  @Field(() => Int,{nullable: true})
  idFormaEntrega?: number;

  @Field()
  formaEntrega: string;

  @Field(() => Int)
  dias: number;
}
