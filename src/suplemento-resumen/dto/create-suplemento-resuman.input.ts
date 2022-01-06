import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSuplementoResumanInput {
  @Field(() => Int,{nullable:true})
  idSuplementoResumen: number;

  @Field(() => Int)
  idContrato: number;

  @Field(() => Int)
  idPuertoOrigen: number;

  @Field(() => Int)
  idPuertoDestino: number;

  @Field(() => Int)
  suplementadoPor: number;

  @Field(() => Int)
  idEjecutivo: number;

  @Field(() => Int)
  firma: number;

  @Field(() => Int)
  idMoneda: number;

  @Field(() => Int)
  consecutivo: number;

  @Field()
  fechaSup: Date;

  @Field(() => Int)
  numero: number;

  @Field()
  fecha: Date;

  @Field()
  idEmpSeguro: number | null;

  @Field(() => Int)
  idEmpNaviera: number | null;

  @Field()
  lugarEntrega: string | null;

  @Field()
  cancelado: boolean;

  @Field()
  notas: string | null;

  @Field()
  permitirEmbarquesParciales: boolean;

  @Field(() => Int)
  cantidadEp: number | null;

  @Field()
  permitirEntregas: boolean;

  @Field()
  permitirTrasbordos: boolean;

  @Field()
  producto: string;

  @Field(() => Int)
  noEntregasParciales: number | null;

  @Field()
  fInicial: Date;

  @Field()
  fFinal: Date;

  @Field()
  fFirma: Date | null;

  @Field()
  fRecepcion: Date | null;

  @Field()
  fArribo: Date | null;

  @Field(() => Float)
  financiamiento: number;

  @Field()
  terminadoS: boolean;

  @Field()
  notaSuple: string | null;

  @Field()
  canceladoSup: boolean;
}
