import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompradoresInput {
  @Field(() => Int, {nullable: true})
  idComprador?: number;

  @Field()
  nombre: string | null;

  @Field()
  representante: string | null;

  @Field()
  domicilio: string | null;

  @Field()
  cargo: string | null;

  @Field()
  doble: boolean | null;

  @Field()
  activo: boolean | null;
}
