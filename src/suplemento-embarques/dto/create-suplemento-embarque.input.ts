import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSuplementoEmbarqueInput {
  @Field(() => Int,{nullable: true})
  idSuplementoEmbarques?: number;

  @Field(() => Int)
  idSuplementoResumen: number;

  @Field(() => Int)
  idEmbarque: number;

  @Field(() => Int)
  idContrato: number;

  @Field(() => Int)
  idPuertoDestino: number;

  @Field(() => Int)
  idPuertoOrigen: number;

  @Field(() => Int)
  idPuertoEmbarque: number;

  @Field()
  fechaEntrega: Date;

  @Field(() => Int)
  numero: number;

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
}
