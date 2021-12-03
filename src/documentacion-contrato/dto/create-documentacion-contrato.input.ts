import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDocumentacionContratoInput {
  @Field(() => Int, {nullable: true})
  idDocumentacionContrato: number;

  @Field(() => Int)
  idDocumento: number;

  @Field(() => Int)
  idContrato: number;

  @Field(() => Int)
  idAsociacion: number;
}
