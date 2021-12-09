import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFormasPagoInput {
  @Field(() => Int,{nullable: true})
  idFormaPago?: number;

  @Field()
  formaPago: string;

  @Field(() => Int)
  dias: number;
}
