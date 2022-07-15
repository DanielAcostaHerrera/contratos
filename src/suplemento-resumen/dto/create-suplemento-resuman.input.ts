import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { CreateSuplementoClausulaInput } from 'src/suplemento-clausulas/dto/create-suplemento-clausula.input';
import { CreateSuplementoEmbarqueInput } from 'src/suplemento-embarques/dto/create-suplemento-embarque.input';

@InputType()
export class CreateSuplementoResumanInput {
  @Field(() => Int,{nullable:true})
  idSuplementoResumen: number;

  @Field(() => Int)
  idContrato: number;

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
  fecha: Date;

  @Field({nullable: true})
  empSeguro: string | null;

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

  @Field(() => Float)
  tasaMoneda: number;

  @Field()
  fechaTasa: Date;

  @Field()
  fechaPFirma: Date;

  @Field(() => Float)
  pFin: number;

  @Field()
  operacion: boolean;

  @Field(() => Int)
  idNegociacion: number;

  @Field()
  modificado: boolean;

  @Field()
  origen: string;

  @Field()
  terminadoS: boolean;

  @Field(() => Float)
  gastosLogisticos: number;

  @Field()
  lugarFirma: string;

  @Field(() => Int)
  idPais: number;

  @Field(() => Int)
  idIncoterm: number;
  
  @Field(() => Int)
  idFormaEntrega: number;

  @Field(()=> [CreateSuplementoClausulaInput],{ nullable: true})
  suplementoClausulas?: CreateSuplementoClausulaInput[];

  @Field(()=> [CreateSuplementoEmbarqueInput],{ nullable: true})
  suplementoEmbarques?: CreateSuplementoEmbarqueInput[];
}
