import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCargoInput {
  @Field(() => Int, { nullable: true})
  idCargo?: number;

  @Field()
  cargo: string;
}
