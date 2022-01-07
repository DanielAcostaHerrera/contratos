import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateFichaCompraAtributoInput {
  @Field(() => Int,{nullable: true})
  idFichaCompraAtributos?: number;

  @Field(() => Int)
  idFichaCompraDetalle: number;

  @Field({nullable: true})
  descripcion: string | null;

  @Field({nullable: true})
  marca: string | null;

  @Field({nullable: true})
  naturaleza: string | null;

  @Field({nullable: true})
  colores: string | null;

  @Field({nullable: true})
  corte: string | null;

  @Field({nullable: true})
  suela: string | null;

  @Field({nullable: true})
  tallas: string | null;

  @Field(() => Int,{nullable: true})
  pack: number | null;

  @Field(() => Int,{nullable: true})
  blts: number | null;

  @Field({nullable: true})
  umbto: string | null;

  @Field(() => Float,{nullable: true})
  cubbtopies: number | null;

  @Field(() => Float,{nullable: true})
  cubbtom3: number | null;

  @Field(() => Float,{nullable: true})
  pc: number | null;

  @Field(() => Float,{nullable: true})
  flete: number | null;

  @Field(() => Float,{nullable: true})
  seguro: number | null;

  @Field(() => Float,{nullable: true})
  pv: number | null;

  @Field(() => Float,{nullable: true})
  um: number | null;

  @Field({nullable: true})
  embalaje: string | null;

  @Field({nullable: true})
  paisorigen: string | null;

  @Field({nullable: true})
  partida: string | null;

  @Field(() => Float,{nullable: true})
  pesombkg: number | null;

  @Field(() => Float,{nullable: true})
  volemb: number | null;

  @Field({nullable: true})
  ean: string | null;

  @Field({nullable: true})
  descripEan: string | null;

  @Field(() => Float,{nullable: true})
  gastaduan: number | null;

  @Field(() => Float,{nullable: true})
  gastbanc: number | null;

  @Field(() => Float,{nullable: true})
  mcmn: number | null;

  @Field(() => Float,{nullable: true})
  mccuc: number | null;
}
