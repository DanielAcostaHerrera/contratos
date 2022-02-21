import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CodigosParaLaVenta } from "../../modelsMercurio/entities/CodigosParaLaVenta.entity";
import { UnidadMedida } from "../../modelsMercurio/entities/UnidadMedida.entity";
import { FichaCompraAtributos } from "./FichaCompraAtributos.entity";
import { FichaCompraResumen } from "./FichaCompraResumen.entity";

@ObjectType()
@Index("IX_FichaCompraDetalle", ["idFicha", "idCodigo"], { unique: true })
@Index("PK_FichaCompraDetalle", ["idFichaCompraDetalle"], { unique: true })
@Entity("FichaCompraDetalle", { schema: "CONTRATO.dbo" })
export class FichaCompraDetalle {
  @PrimaryGeneratedColumn({ type: "int", name: "IdFichaCompraDetalle" })
  @Field(() => Int)
  idFichaCompraDetalle: number;

  @Column("int", { name: "IdFicha" })
  @Field(() => Int)
  idFicha: number;

  @Column("int", { name: "Codigo" })
  @Field(() => Int)
  idCodigo: number;

  @Column("int", { name: "IdUM" })
  @Field(() => Int)
  idUm: number;

  @Column("int", { name: "Pack" })
  @Field(() => Int)
  pack: number;

  @Column("float", { name: "Cantidad", precision: 53 })
  @Field(() => Float)
  cantidad: number;

  @Column("float", { name: "PCosto", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  pCosto: number;

  @Column({ name: "PCProv", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  pcProv: number | null;

  @Column({ name: "PCostoCIF", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  pCostoCif: number | null;

  @Column("nvarchar", { name: "Partida", nullable: true, length: 8 })
  @Field({nullable: true})
  partida: string | null;

  @Column("float", { name: "TasaArancel", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  tasaArancel: number;

  @Column({ name: "ValorArancel", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  valorArancel: number | null;

  @Column({ name: "ImporteArancel", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  importeArancel: number | null;

  @Column({ name: "ValorGastos", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  valorGastos: number | null;

  @Column("float", {
    name: "TasaMargenComercial",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaMargenComercial: number;

  @Column({ name: "ValorTMC", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  valorTmc: number | null;

  @Column({ name: "PCostoImportacion", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  pCostoImportacion: number | null;

  @Column({ name: "ImpPCostoProv", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  impPCostoProv: number | null;

  @Column({ name: "ImpPCostoCIF", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  impPCostoCif: number | null;

  @Column({ name: "ImpPCostoImp", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  impPCostoImp: number | null;

  @Column({
    name: "ValorCircMayorista",
    nullable: true,
    precision: 53, 
    insert: false, 
    update: false
  })
  @Field(() => Float,{nullable: true})
  valorCircMayorista: number | null;

  @Column({ name: "PCostoMayorista", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  pCostoMayorista: number | null;

  @Column({ name: "ImpMayorista", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  impMayorista: number | null;

  @Column({
    name: "ValorCircMinorista",
    nullable: true,
    precision: 53, 
    insert: false, 
    update: false
  })
  @Field(() => Float,{nullable: true})
  valorCircMinorista: number | null;

  @Column({ name: "PCostoMinorista", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  pCostoMinorista: number | null;

  @Column({ name: "ImpMinorista", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  impMinorista: number | null;

  @Field(() => [FichaCompraAtributos], {nullable: true})
  @OneToMany(() => FichaCompraAtributos,(fichaCompraAtributos) => fichaCompraAtributos.fichaCompraDetalle)
  fichaCompraAtributos: FichaCompraAtributos[];

  @Field(() => FichaCompraResumen, {nullable: true})
  @ManyToOne( () => FichaCompraResumen,(fichaCompraResumen) => fichaCompraResumen.fichaCompraDetalles,{ onDelete: "CASCADE" })
  @JoinColumn([{ name: "IdFicha", referencedColumnName: "idFicha" }])
  fichaCompraResumen: FichaCompraResumen;

  @Field(() => CodigosParaLaVenta, {nullable: true})
  @ManyToOne( () => CodigosParaLaVenta,(codigosParaLaVenta) => codigosParaLaVenta.fichaCompraDetalles)
  @JoinColumn([{ name: "Codigo", referencedColumnName: "idCodigo" }])
  codigo: CodigosParaLaVenta;

  @Field(() => UnidadMedida, {nullable: true})
  @ManyToOne( () => UnidadMedida,(unidadMedida) => unidadMedida.fichaCompraDetalles)
  @JoinColumn([{ name: "IdUM", referencedColumnName: "id" }])
  unidadMedida: UnidadMedida;
}
