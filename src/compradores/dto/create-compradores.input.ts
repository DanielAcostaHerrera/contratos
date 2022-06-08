import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompradoresInput {
  @Field(() => Int, {nullable: true})
  idComprador?: number;

  @Field()
  idEntidad: number;

  @Field({nullable: true})
  nombre: string | null;

  @Field({nullable: true})
  representante: string | null;

  @Field({nullable: true})
  domicilio: string | null;

  @Field({nullable: true})
  cargo: string | null;

  @Field({nullable: true})
  doble: boolean | null;

  @Field({nullable: true})
  activo: boolean | null;
}
