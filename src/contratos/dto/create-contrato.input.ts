import { CreateEmbarqueInput } from './../../embarques/dto/create-embarque.input';
import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { CreateContratoClausulaInput } from 'src/contrato-clausulas/dto/create-contrato-clausulas.input';
import { CreatePuertoEmbarqueInput } from 'src/puerto-embarque/dto/create-puerto-embarque.input';

@InputType()
export class CreateContratoInput {
  @Field(() => Int,{nullable: true})
  idContrato?: number;

  @Field(() => Int)
  idBasesGenerales: number;

  @Field(() => Int)
  idCMarco: number;

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

  @Field(() => Int, {nullable: true})
  consecutivo: number | null;

  @Field(() => Int)
  idIncoterm: number;

  @Field(() => Int)
  idPais: number;

  @Field()
  cancelado: boolean;

  @Field()
  terminado: boolean;

  @Field()
  modificado: boolean;

  @Field({nullable: true})
  idEmpresaSeguro: number | null;

  @Field(() => Int,{nullable: true})
  idEmpresaNaviera: number | null;

  @Field({nullable: true})
  lugarEntrega: string | null;

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

  @Field({nullable: true})
  producto: string | null;

  @Field(() => Int,{nullable: true})
  noEntregasParciales: number | null;

  @Field({nullable: true})
  fechaElaboracion: Date | null;

  @Field({nullable: true})
  fechaInicial: Date | null;

  @Field({nullable: true})
  fechaFinal: Date | null;

  @Field({nullable: true})
  fechaFirma: Date | null;

  @Field({nullable: true})
  fechaRecepcion: Date | null;

  @Field({nullable: true})
  fechaArribo: Date | null;

  @Field({nullable: true})
  fechaPFirma: Date | null;

  @Field(() => Float)
  financiamiento: number;

  @Field(() => Float)
  tasaMoneda: number;

  @Field({nullable: true})
  fechaTasa: Date | null;

  @Field(() => Float)
  pFin: number;

  @Field(() => Float)
  gastosLogisticos: number;

  @Field(()=> [CreateContratoClausulaInput],{ nullable: true})
  contratoClausulas?: CreateContratoClausulaInput[];

  @Field(()=> [CreateEmbarqueInput],{ nullable: true})
  embarques?: CreateEmbarqueInput[];

  @Field(()=> [CreatePuertoEmbarqueInput],{ nullable: true})
  puertoEmbarques?: CreatePuertoEmbarqueInput[];
}
