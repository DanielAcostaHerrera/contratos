import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateFacturaResumanInput {
  @Field(() => Int,{nullable: true})
  idFactura?: number;

  @Field(() => Int)
  idContrato: number;

  @Field(() => Int)
  idEmbarque: number;

  @Field(() => Int)
  idEjecutivo: number;

  @Field(() => Int)
  idNegociacion: number;

  @Field(() => Int)
  idPuertoDestino: number;

  @Field(() => Int)
  realizadoPor: number;

  @Field()
  fecha: Date | null;

  @Field()
  fechaFactura: Date;

  @Field()
  numeroBl: string | null;

  @Field()
  numero: string | null;

  @Field(() => Int)
  nivel: number | null;

  @Field(() => Int)
  plazoPuerto: number | null;

  @Field(() => Int)
  plazoAlmacen: number | null;

  @Field(() => Int)
  plazoTienda: number | null;

  @Field()
  fechaPartida: Date | null;

  @Field(() => Float)
  descuento: number | null;

  @Field()
  nota: string | null;

  @Field()
  terminado: boolean;

  @Field(() => Float)
  tasaMoneda: number;

  @Field()
  cancelado: boolean;

  @Field()
  fechaTerminada: Date | null;

  @Field(()=> Float)
  laTasaMn: number;
}
