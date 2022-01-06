import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FichaCompraDetalle } from "./FichaCompraDetalle.entity";

@ObjectType()
@Index("PK_FichaCompraAtributos_1", ["idFichaCompraAtributos"], {
  unique: true,
})
@Entity("FichaCompraAtributos", { schema: "CONTRATO.dbo" })
export class FichaCompraAtributos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdFichaCompraAtributos" })
  @Field(() => Int)
  idFichaCompraAtributos: number;

  @Column("int", { name: "IdFichaCompraDetalle", default: () => "(100)" })
  @Field(() => Int)
  idFichaCompraDetalle: number;

  @Column("nvarchar", { name: "DESCRIPCION", nullable: true, length: 200 })
  @Field({nullable: true})
  descripcion: string | null;

  @Column("nvarchar", { name: "MARCA", nullable: true, length: 50 })
  @Field({nullable: true})
  marca: string | null;

  @Column("nvarchar", { name: "NATURALEZA", nullable: true, length: 50 })
  @Field({nullable: true})
  naturaleza: string | null;

  @Column("nvarchar", { name: "COLORES", nullable: true, length: 50 })
  @Field({nullable: true})
  colores: string | null;

  @Column("nvarchar", { name: "CORTE", nullable: true, length: 30 })
  @Field({nullable: true})
  corte: string | null;

  @Column("nvarchar", { name: "SUELA", nullable: true, length: 30 })
  @Field({nullable: true})
  suela: string | null;

  @Column("nvarchar", { name: "TALLAS", nullable: true, length: 15 })
  @Field({nullable: true})
  tallas: string | null;

  @Column("int", { name: "PACK", nullable: true })
  @Field(() => Int,{nullable: true})
  pack: number | null;

  @Column("int", { name: "BLTS", nullable: true })
  @Field(() => Int,{nullable: true})
  blts: number | null;

  @Column("nvarchar", { name: "UMBTO", nullable: true, length: 30 })
  @Field({nullable: true})
  umbto: string | null;

  @Column("float", { name: "CUBBTOPIES", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  cubbtopies: number | null;

  @Column("float", { name: "CUBBTOM3", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  cubbtom3: number | null;

  @Column("float", { name: "PC", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  pc: number | null;

  @Column("float", { name: "FLETE", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  flete: number | null;

  @Column("float", { name: "SEGURO", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  seguro: number | null;

  @Column("float", { name: "PV", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  pv: number | null;

  @Column("float", { name: "UM", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  um: number | null;

  @Column("nvarchar", { name: "EMBALAJE", nullable: true, length: 35 })
  @Field({nullable: true})
  embalaje: string | null;

  @Column("nvarchar", { name: "PAISORIGEN", nullable: true, length: 15 })
  @Field({nullable: true})
  paisorigen: string | null;

  @Column("nvarchar", { name: "PARTIDA", nullable: true, length: 9 })
  @Field({nullable: true})
  partida: string | null;

  @Column("float", { name: "PESOMBKG", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  pesombkg: number | null;

  @Column("float", { name: "VOLEMB", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  volemb: number | null;

  @Column("nvarchar", { name: "EAN", nullable: true, length: 13 })
  @Field({nullable: true})
  ean: string | null;

  @Column("nvarchar", { name: "DESCRIP_EAN", nullable: true, length: 100 })
  @Field({nullable: true})
  descripEan: string | null;

  @Column("float", { name: "GASTADUAN", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  gastaduan: number | null;

  @Column("float", { name: "GASTBANC", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  gastbanc: number | null;

  @Column("float", { name: "MCMN", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  mcmn: number | null;

  @Column("float", { name: "MCCUC", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  mccuc: number | null;

  @Field(() => FichaCompraDetalle, {nullable: true})
  @ManyToOne(() => FichaCompraDetalle,(fichaCompraDetalle) => fichaCompraDetalle.fichaCompraAtributos)
  @JoinColumn([{name: "IdFichaCompraDetalle",referencedColumnName: "idFichaCompraDetalle",}])
  fichaCompraDetalle: FichaCompraDetalle;
}
