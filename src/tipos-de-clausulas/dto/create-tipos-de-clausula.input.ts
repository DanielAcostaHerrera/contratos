import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTiposDeClausulaInput {
  @Field(() => Int, { nullable: true})
  idTipoClausula?: number;

  @Field()
  nombre: string;

  @Field(() => Int)
  orden: number;

  @Field()
  excepcional: boolean;
}
