import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateFacturaResumanInput {
  @Field(() => Int,{nullable: true})
  idFactura?: number;

  @Field(() => Int)
  idContrato: number;

  @Field(() => Int,{nullable: true})
  idEmbarque: number | null;

  @Field(() => Int,{nullable: true})
  idEjecutivo: number | null;

  @Field(() => Int)
  idNegociacion: number;

  @Field(() => Int,{nullable: true})
  idPuertoDestino: number | null;

  @Field(() => Int)
  realizadoPor: number;

  @Field({nullable: true})
  fecha: Date | null;

  @Field()
  fechaFactura: Date;

  @Field({nullable: true})
  numeroBl: string | null;

  @Field({nullable: true})
  numero: string | null;

  @Field(() => Int,{nullable: true})
  nivel: number | null;

  @Field(() => Int,{nullable: true})
  plazoPuerto: number | null;

  @Field(() => Int,{nullable: true})
  plazoAlmacen: number | null;

  @Field(() => Int,{nullable: true})
  plazoTienda: number | null;

  @Field({nullable: true})
  fechaPartida: Date | null;

  @Field(() => Float,{nullable: true})
  descuento: number | null;

  @Field({nullable: true})
  nota: string | null;

  @Field()
  terminado: boolean;

  @Field(() => Float)
  tasaMoneda: number;

  @Field()
  cancelado: boolean;

  @Field({nullable: true})
  fechaTerminada: Date | null;

  @Field(()=> Float)
  laTasaMn: number;
}
