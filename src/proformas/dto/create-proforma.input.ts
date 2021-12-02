import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProformaInput {
  @Field(() => Int, { nullable: true})
  idProforma?: number;

  @Field(() => Int)
  idTipoContrato: number;

  @Field(() => Int)
  idIncoterm: number;

  @Field()
  nombreProfoma: string;

  @Field()
  activa: boolean;

  @Field()
  cMarcoF: boolean;
}
