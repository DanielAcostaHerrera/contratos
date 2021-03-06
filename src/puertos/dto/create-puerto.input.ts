import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePuertoInput {
  @Field(() => Int, { nullable: true})
  idPuerto?: number;

  @Field()
  nombre: string;

  @Field(() => Int)
  idPais: number;

  @Field({nullable: true})
  deposito: string | null;
}
