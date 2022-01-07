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
}
