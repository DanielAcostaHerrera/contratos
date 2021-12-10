import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEjecutivoInput {
  @Field(() => Int, { nullable: true})
  id?: number;

  @Field()
  nombre: string;

  @Field({nullable: true})
  correo: string | null;

  @Field()
  msreplTranVersion: string;

  @Field()
  activo: boolean;

  @Field({nullable: true})
  eMail: string | null;
}
