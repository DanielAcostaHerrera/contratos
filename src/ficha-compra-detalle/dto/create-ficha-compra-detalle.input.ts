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

  @Field({nullable: true})
  partida: string | null;

  @Field(() => Float)
  tasaArancel: number;

  @Field(() => Float)
  tasaMargenComercial: number;
}
