import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateEmbarqueInput {
  @Field(() => Int,{nullable: true})
  idEmbarque?: number;

  @Field()
  fechaEntrega: Date;

  @Field(() => Int)
  idContrato: number;
  
  @Field(() => Int)
  idEjecutivo: number;

  @Field(() => Int)
  numero: number;

  @Field(() => Int)
  destino: number | null;

  @Field(() => Float)
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

  @Field()
  maquina: string | null;

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
}
