import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTipoContratoInput {
  @Field(() => Int, { nullable: true})
  idTipoContrato?: number;

  @Field()
  tipoContrato: string;

  @Field()
  encabezado: string | null;

  @Field()
  ambasPartes: string | null;

  @Field()
  visible: boolean;
}
