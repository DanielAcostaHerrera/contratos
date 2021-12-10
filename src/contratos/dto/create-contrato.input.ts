import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateContratoInput {
  @Field(() => Int,{nullable: true})
  idContrato?: number;

  @Field(() => Int)
  idBasesGenerales: number;

  @Field(() => Int)
  idBaseCMarco: number;

  @Field(() => Int)
  idPuertoOrigen: number;

  @Field(() => Int)
  idPuertoDestino: number;

  @Field(() => Int)
  idMoneda: number;

  @Field(() => Int)
  idFormaEntrega: number;

  @Field(() => Int)
  idNegociacion: number;

  @Field(() => Int)
  idFichaCosto: number;

  @Field(() => Int)
  realizadoPor: number;

  @Field(() => Int)
  firmadoPor: number;

  @Field(() => Int)
  modificadoPor: number;

  @Field()
  lugarFirma: string | null;

  @Field(() => Int)
  consecutivo: number;

  @Field(() => Int)
  condicionCompra: number;

  @Field(() => Int)
  paS: number;

  @Field()
  cancelado: boolean;

  @Field()
  terminado: boolean;

  @Field()
  modificado: boolean;

  @Field(() => Int)
  proveedor: number;

  @Field()
  empresaSeguro: string | null;

  @Field(() => Int)
  empresaNaviera: number | null;

  @Field()
  lugarEntrega: string | null;

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
  producto: string | null;

  @Field(() => Int)
  noEntregasParciales: number | null;

  @Field()
  fechaElaboracion: Date;

  @Field()
  fechaInicial: Date | null;

  @Field()
  fechaFinal: Date | null;

  @Field()
  fechaFirma: Date | null;

  @Field()
  fechaRecepcion: Date | null;

  @Field()
  fechaArribo: Date | null;

  @Field()
  fechaPFirma: Date | null;

  @Field(() => Float)
  financiamiento: number;

  @Field(() => Float)
  tasaMoneda: number;

  @Field()
  fechaTasa: Date | null;

  @Field(() => Float)
  pFin: number;
}
