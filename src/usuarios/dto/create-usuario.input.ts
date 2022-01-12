import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUsuarioInput {
  @Field(() => Int,{nullable:true})
  idUsuario?: number;

  @Field(() => Int)
  idEjecutivo: number;

  @Field()
  nombreUsuario: string;

  @Field({nullable: true})
  contrasena: string;

  @Field(() => [Int])
  roles: number[];
}
