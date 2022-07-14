import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateIncotermInput {
  @Field(() => Int, {nullable: true})
  idIncoterm?: number;

  @Field()
  nombre: string;

  @Field()
  abreviatura: string;

  @Field()
  activo: boolean;
}
