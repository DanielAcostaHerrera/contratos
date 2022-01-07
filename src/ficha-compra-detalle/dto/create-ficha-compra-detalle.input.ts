import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateFichaCompraDetalleInput {
  @Field(() => Int,{nullable: true})
  idFichaCompraDetalle?: number;

  @Field(() => Int)
  idFicha: number;

  @Field()
  idCodigo: number;

  @Field(() => Int)
  idUm: number;

  @Field(() => Int)
  pack: number;

  @Field(() => Float)
  cantidad: number;

  @Field(() => Float)
  pCosto: number;

  @Field(() => Float)
  pcProv: number | null;

  @Field(() => Float)
  pCostoCif: number | null;

  @Field()
  partida: string | null;

  @Field(() => Float)
  tasaArancel: number;

  @Field(() => Float)
  valorArancel: number | null;

  @Field(() => Float)
  importeArancel: number | null;

  @Field(() => Float)
  valorGastos: number | null;

  @Field(() => Float)
  tasaMargenComercial: number;

  @Field(() => Float)
  valorTmc: number | null;

  @Field(() => Float)
  pCostoImportacion: number | null;

  @Field(() => Float)
  impPCostoProv: number | null;

  @Field(() => Float)
  impPCostoCif: number | null;

  @Field(() => Float)
  impPCostoImp: number | null;

  @Field(() => Float)
  valorCircMayorista: number | null;

  @Field(() => Float)
  pCostoMayorista: number | null;

  @Field(() => Float)
  impMayorista: number | null;

  @Field(() => Float)
  valorCircMinorista: number | null;

  @Field(() => Float)
  pCostoMinorista: number | null;

  @Field(() => Float)
  impMinorista: number | null;
}
