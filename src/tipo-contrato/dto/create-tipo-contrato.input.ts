import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTipoContratoInput {
  @Field(() => Int, { nullable: true})
  idTipoContrato?: number;

  @Field()
  tipoContrato: string;

  @Field({nullable: true})
  encabezado: string | null;

  @Field({nullable: true})
  ambasPartes: string | null;

  @Field()
  visible: boolean;
}
