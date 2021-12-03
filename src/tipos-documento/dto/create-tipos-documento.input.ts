import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTiposDocumentoInput {
  @Field(() => Int, {nullable: true})
  idTipoDoc?: number;

  @Field()
  nombreDoc: string;
}
