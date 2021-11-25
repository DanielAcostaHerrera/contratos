import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCargoInput {
  @Field(() => Int)
  idCargo: number;

  @Field()
  cargo: string;

  @Field()
  msreplTranVersion: string;
}
