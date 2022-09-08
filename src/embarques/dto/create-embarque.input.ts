import { CreatePuertoEmbarqueInput } from './../../puerto-embarque/dto/create-puerto-embarque.input';
import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { CreateContratoDesgloseInput } from 'src/contrato-desglose/dto/create-contrato-desglose.input';
import { CreatePagoInput } from 'src/pagos/dto/create-pago.input';

@InputType()
export class CreateEmbarqueInput {
  @Field(() => Int,{nullable: true})
  idEmbarque?: number;

  @Field()
  fechaEntrega: Date;

  @Field(() => Int,{nullable: true})
  idContrato: number | null;

  @Field(() => Int,{nullable: true})
  numero: number| null;

  @Field(() => Float,{nullable: true})
  descuento: number | null;

  @Field()
  terminado: boolean;

  @Field()
  cancelado: boolean;

  @Field()
  porFirmar: boolean;

  @Field(() => Int)
  qtyCnt: number;

  @Field(() => Float)
  flete: number;

  @Field(() => Float)
  seguro: number;

  @Field(() => Float)
  financiamiento: number;

  @Field(() => Int)
  idEmpresaNaviera: number;

  @Field(() => Float)
  inspeccion: number;

  @Field(() => Float)
  otros: number;

  @Field(() => Int)
  c40: number;

  @Field(() => Int)
  c20: number;

  @Field()
  actSci: boolean;

  @Field(()=> [CreateContratoDesgloseInput],{ nullable: true})
  contratoDesglose?: CreateContratoDesgloseInput[];

  @Field(()=> [CreatePuertoEmbarqueInput],{ nullable: true})
  puertoEmbarque?: CreatePuertoEmbarqueInput[];

  @Field(()=> [CreatePagoInput],{ nullable: true})
  pagos?: CreatePagoInput[];
}
