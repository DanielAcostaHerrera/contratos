import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUsuarioRolInput {
  @Field(() => Int,{nullable: true})
  idUsuarioRol?: number;

  @Field(() => Int)
  idUsuario: number;

  @Field(() => Int)
  idRol: number;
}
