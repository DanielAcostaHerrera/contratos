import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateFichaCompraAtributoInput {
  @Field(() => Int,{nullable: true})
  idFichaCompraAtributos?: number;

  @Field(() => Int)
  idFichaCompraDetalle: number;

  @Field()
  descripcion: string | null;

  @Field()
  marca: string | null;

  @Field()
  naturaleza: string | null;

  @Field()
  colores: string | null;

  @Field()
  corte: string | null;

  @Field()
  suela: string | null;

  @Field()
  tallas: string | null;

  @Field(() => Int)
  pack: number | null;

  @Field(() => Int)
  blts: number | null;

  @Field()
  umbto: string | null;

  @Field(() => Float)
  cubbtopies: number | null;

  @Field(() => Float)
  cubbtom3: number | null;

  @Field(() => Float)
  pc: number | null;

  @Field(() => Float)
  flete: number | null;

  @Field(() => Float)
  seguro: number | null;

  @Field(() => Float)
  pv: number | null;

  @Field(() => Float)
  um: number | null;

  @Field()
  embalaje: string | null;

  @Field()
  paisorigen: string | null;

  @Field()
  partida: string | null;

  @Field(() => Float)
  pesombkg: number | null;

  @Field(() => Float)
  volemb: number | null;

  @Field()
  ean: string | null;

  @Field()
  descripEan: string | null;

  @Field(() => Float)
  gastaduan: number | null;

  @Field(() => Float)
  gastbanc: number | null;

  @Field(() => Float)
  mcmn: number | null;

  @Field(() => Float)
  mccuc: number | null;
}
