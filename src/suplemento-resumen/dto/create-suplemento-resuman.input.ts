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

  @Field(() => Int,{nullable: true})
  consecutivo: number | null;

  @Field()
  fechaSup: Date;

  @Field(() => Int)
  numero: number;

  @Field()
  fecha: Date;

  @Field(() => Int,{nullable: true})
  idEmpSeguro: number | null;

  @Field(() => Int,{nullable: true})
  idEmpNaviera: number | null;

  @Field({nullable: true})
  lugarEntrega: string | null;

  @Field()
  cancelado: boolean;

  @Field({nullable: true})
  notas: string | null;

  @Field()
  permitirEmbarquesParciales: boolean;

  @Field(() => Int,{nullable: true})
  cantidadEp: number | null;

  @Field()
  permitirEntregas: boolean;

  @Field()
  permitirTrasbordos: boolean;

  @Field()
  producto: string;

  @Field(() => Int,{nullable: true})
  noEntregasParciales: number | null;

  @Field()
  fInicial: Date;

  @Field()
  fFinal: Date;

  @Field({nullable: true})
  fFirma: Date | null;

  @Field({nullable: true})
  fRecepcion: Date | null;

  @Field({nullable: true})
  fArribo: Date | null;

  @Field(() => Float)
  financiamiento: number;

  @Field()
  terminadoS: boolean;

  @Field({nullable: true})
  notaSuple: string | null;

  @Field()
  canceladoSup: boolean;
}
