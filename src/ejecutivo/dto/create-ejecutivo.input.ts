import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEjecutivoInput {
  @Field(() => Int, { nullable: true})
  idEjecutivo?: number;

  @Field(() => Int)
  idGrupo: number;

  @Field()
  nombre: string;

  @Field(() => Int)
  idCargo: number;

  @Field({nullable: true})
  correo: string | null;

  @Field()
  msreplTranVersion: string;

  @Field()
  activo: boolean;

  @Field({nullable: true})
  eMail: string | null;
}
