import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateProformaClausulaInput } from 'src/proforma-clausulas/dto/create-proforma-clausula.input';

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

  @Field(()=> [CreateProformaClausulaInput],{ nullable: true})
  proformaClausulas?: CreateProformaClausulaInput[];
}
