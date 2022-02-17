import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateEmbarqueInput {
  @Field(() => Int,{nullable: true})
  idEmbarque?: number;

  @Field()
  fechaEntrega: Date;

  @Field(() => Int,{nullable: true})
  idContrato: number | null;
  
  @Field(() => Int,{nullable: true})
  idEjecutivo: number | null;

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

  @Field({nullable: true})
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
