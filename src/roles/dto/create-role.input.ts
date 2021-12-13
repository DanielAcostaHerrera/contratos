import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => Int,{nullable: true})
  idRol?: number;

  @Field()
  rol: string;
}
