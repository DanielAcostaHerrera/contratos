import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreatePliegoConcurrenciaResumanInput {
  @Field(() => Int, {nullable: true})
  idPliegoResumen?: number;

  @Field(() => Int)
  idPliego: number;

  @Field(() => Int)
  idIncoterm: number;

  @Field(() => Int)
  idFormaPago: number;

  @Field(() => Int)
  idFormaEntrega: number;

  @Field(() => Int)
  idPuertoEmbarque: number;

  @Field(() => Int)
  idPuertoDestino: number;

  @Field(() => Int)
  idTipoContenedor: number;

  @Field(() => Int)
  idProveedor: number;

  @Field(() => Int)
  idPaisOrigenMercancia: number;

  @Field()
  fechaOfertaRecibida: Date;

  @Field({nullable: true})
  fechaEntregaOferta: Date | null;

  @Field(() => Int)
  idMonedaOferta: number;

  @Field(() => Int)
  idMonedaPago: number;

  @Field(() => Int)
  idMonedaCartaCredito: number;

  @Field(() => Float)
  rateCambioOferta: number;

  @Field()
  fechaRateCOferta: Date;

  @Field(() => Float)
  rateCambioCuc: number;

  @Field()
  fechaRateCambio: Date;

  @Field(() => Float)
  tasaInteres: number;

  @Field()
  inicioFinanciamiento: string;

  @Field(() => Int)
  idNaviera: number;

  @Field(() => Int)
  tiempoPrimeraEntrega: number;

  @Field(() => Float)
  seguro: number;

  @Field(() => Float)
  flete: number;

  @Field(() => Float)
  rateCambioFlete: number;

  @Field(() => Int)
  contenedores: number;

  @Field(() => Float)
  pesoBruto: number;
}
