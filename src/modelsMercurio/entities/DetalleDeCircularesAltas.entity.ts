import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContratoDesglose } from "../../models/entities/ContratoDesglose.entity";

@ObjectType()
@Index("aaaaaDetalle_de_Circulares_Altas_PK", ["idCodigo"], { unique: true })
@Index("CategoríasDetalle de Circulares (Altas)", ["idCategorA"], {})
@Index("CircularesDetalle de Circulares (Altas)", ["idCircular"], {})
@Index("EspecificosDetalle de Circulares (Altas)", ["especifico"], {})
@Index("Familias (DIVI)Detalle de Circulares (Altas)", ["familia"], {})
@Index("IdCircular", ["idCircular"], {})
@Index("IdOperacionC", ["idOperacionC"], {})
@Index("IX_Detalle_de_Circulares_Altas_Codigo", ["codigo"], { unique: true })
@Index("MarcasDetalle de Circulares (Altas)", ["idMarca"], {})
@Index("MedidasDetalle de Circulares (Altas)", ["idMedida"], {})
@Index("NaturalezasDetalle de Circulares (Altas)", ["naturaleza"], {})
@Index("PaisesDetalle de Circulares (Altas)", ["paisOrigen"], {})
@Index("PARTIDAS ArancelariasDetalle de Circulares (Altas)", ["partida"], {})
@Index("ProveedoresDetalle de Circulares (Altas)", ["proveedor"], {})
@Index("UnidadMedidaDetalle de Circulares (Altas)", ["um"], {})
@Entity("Detalle_de_Circulares_Altas", { schema: "Mercurio.dbo" })
export class DetalleDeCircularesAltas {
  @Column("int", { name: "IdCircular" })
  @Field(() => Int)
  idCircular: number;

  @PrimaryGeneratedColumn({ type: "int", name: "IdCodigo" })
  @Field(() => Int)
  idCodigo: number;

  @Column("int", { name: "IdResumenRondaE", nullable: true })
  @Field(() => Int,{nullable: true})
  idResumenRondaE: number | null;

  @Column("int", { name: "IdDetalleRondaAltaE", nullable: true })
  @Field(() => Int,{nullable: true})
  idDetalleRondaAltaE: number | null;

  @Column("nvarchar", {
    name: "Codigo",
    unique: true,
    length: 13,
    default: () => "'0'",
  })
  @Field()
  codigo: string;

  @Column("nvarchar", { name: "Descripcion", length: 200 })
  @Field()
  descripcion: string;

  @Column("int", { name: "IdMarca" })
  @Field(() => Int)
  idMarca: number;

  @Column("int", { name: "UM", default: () => "(3)" })
  @Field(() => Int)
  um: number;

  @Column("nvarchar", { name: "Familia", length: 3 })
  @Field()
  familia: string;

  @Column("smallint", { name: "Proveedor" })
  @Field(() => Int)
  proveedor: number;

  @Column("float", {
    name: "PrecioPROVEEDOR",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  precioProveedor: number;

  @Column("real", {
    name: "Flete",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  flete: number | null;

  @Column("real", {
    name: "Seguro",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  seguro: number | null;

  @Column("real", { name: "OGastos", nullable: true, precision: 24 })
  @Field(() => Float,{nullable: true})
  oGastos: number | null;

  @Column("float", { name: "PCostoMN", precision: 53 })
  @Field(() => Float)
  pCostoMn: number;

  @Column("float", { name: "PCostoUSD", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  pCostoUsd: number;

  @Column("real", {
    name: "GastosDeCirculacion",
    precision: 24,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastosDeCirculacion: number;

  @Column("int", { name: "PaisOrigen" })
  @Field(() => Int)
  paisOrigen: number;

  @Column("nvarchar", { name: "PARTIDA", nullable: true, length: 8 })
  @Field({nullable: true})
  partida: string | null;

  @Column("real", {
    name: "Tasa",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  tasa: number | null;

  @Column("real", { name: "PCosto", precision: 24, default: () => "(0)" })
  @Field(() => Float)
  pCosto: number;

  @Column("money", { name: "PVenta", default: () => "(0)" })
  @Field()
  pVenta: number;

  @Column("real", {
    name: "Indice Aplicado",
    precision: 24,
    default: () => "(0)",
  })
  @Field(() => Float)
  indiceAplicado: number;

  @Column("real", { name: "IndiceMFP", nullable: true, precision: 24 })
  @Field(() => Float,{nullable: true})
  indiceMfp: number | null;

  @Column("float", { name: "PrecioLOP", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  precioLop: number | null;

  @Column("bit", { name: "OCASION", default: () => "(0)" })
  @Field()
  ocasion: boolean;

  @Column("bit", { name: "REBAJA", default: () => "(0)" })
  @Field()
  rebaja: boolean;

  @Column("int", { name: "IdCategoría", default: () => "(1)" })
  @Field(() => Int)
  idCategorA: number;

  @Column("int", { name: "Naturaleza", nullable: true })
  @Field(() => Int,{nullable: true})
  naturaleza: number | null;

  @Column("bit", { name: "Pesaje", default: () => "(0)" })
  @Field()
  pesaje: boolean;

  @Column("bit", { name: "Perecedero", default: () => "(0)" })
  @Field()
  perecedero: boolean;

  @Column("int", { name: "IdMedida", nullable: true })
  @Field(() => Int,{nullable: true})
  idMedida: number | null;

  @Column("real", { name: "Dimension", nullable: true, precision: 24 })
  @Field(() => Float,{nullable: true})
  dimension: number | null;

  @Column("int", { name: "Especifico" })
  @Field(() => Int)
  especifico: number;

  @Column("nvarchar", { name: "AbreviaturaCaja", length: 20 })
  @Field()
  abreviaturaCaja: string;

  @Column("int", { name: "IdOperacionC", nullable: true })
  @Field(() => Int,{nullable: true})
  idOperacionC: number | null;

  @Column("bit", { name: "RCompra", default: () => "(0)" })
  @Field()
  rCompra: boolean;

  @Column("nvarchar", {
    name: "User_",
    length: 30,
    default: () => "user_name()",
  })
  @Field()
  user: string;

  @Column("timestamp", { name: "upsize_ts", nullable: true })
  @Field({nullable: true})
  upsizeTs: Date | null;

  @Column("float", { name: "reserved1", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  reserved1: number | null;

  @Column("float", {
    name: "PrecioCUCNacional",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  precioCucNacional: number | null;

  @Column("nvarchar", { name: "reserved3", nullable: true, length: 50 })
  @Field({nullable: true})
  reserved3: string | null;

  @Column("nvarchar", { name: "reserved4", nullable: true, length: 50 })
  @Field({nullable: true})
  reserved4: string | null;

  @Column("char", { name: "IdMoneda", nullable: true, length: 3 })
  @Field({nullable: true})
  idMoneda: string | null;

  @Column("money", { name: "PVentaTerceros", nullable: true })
  @Field({nullable: true})
  pVentaTerceros: number | null;

  @Column("real", { name: "reserved5", nullable: true, precision: 24 })
  @Field(() => Float,{nullable: true})
  reserved5: number | null;

  @Column("real", {
    name: "reserved6",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  reserved6: number | null;

  @Column("real", { name: "reserved7", nullable: true, precision: 24 })
  @Field(() => Float,{nullable: true})
  reserved7: number | null;

  @Column("bit", { name: "Operacion", default: () => "(1)" })
  @Field()
  operacion: boolean;

  @Column("bit", { name: "consignacion", default: () => "(0)" })
  @Field()
  consignacion: boolean;

  @Column("int", { name: "Factor", default: () => "(1)" })
  @Field(() => Int)
  factor: number;

  @Column("int", { name: "Embalaje", nullable: true })
  @Field(() => Int,{nullable: true})
  embalaje: number | null;

  @Column("float", {
    name: "PesoEmbKG",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  pesoEmbKg: number | null;

  @Column("float", {
    name: "VolEmb",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  volEmb: number | null;

  @Column("float", {
    name: "PCSinArancel",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  pcSinArancel: number | null;

  @Column("float", {
    name: "PVentaGast",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  pVentaGast: number | null;

  @Column("float", {
    name: "PVentaMay",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  pVentaMay: number | null;

  @Column("float", {
    name: "PVentaMod",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  pVentaMod: number | null;

  @Column("bit", { name: "Reposicion", nullable: true, default: () => "(0)" })
  @Field({nullable: true})
  reposicion: boolean | null;

  @Column("decimal", {
    name: "PorcMComerc",
    nullable: true,
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  porcMComerc: number | null;

  @Column("decimal", {
    name: "GastAduan",
    nullable: true,
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  gastAduan: number | null;

  @Column("decimal", {
    name: "GastBanc",
    nullable: true,
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  gastBanc: number | null;

  @Column("datetime", { name: "Actualizacion", default: () => "getdate()" })
  @Field()
  actualizacion: Date;

  @Column("decimal", {
    name: "TotalCostGast",
    nullable: true,
    precision: 15,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  totalCostGast: number | null;

  @Column("decimal", {
    name: "CostAlmacen",
    nullable: true,
    precision: 15,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  costAlmacen: number | null;

  @Column("bit", {
    name: "NuevaFormCost",
    nullable: true,
    default: () => "(0)",
  })
  @Field({nullable: true})
  nuevaFormCost: boolean | null;

  @Column("decimal", {
    name: "CompMNMC",
    nullable: true,
    precision: 10,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  compMnmc: number | null;

  @Column("decimal", {
    name: "CompCUCMC",
    nullable: true,
    precision: 10,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  compCucmc: number | null;

  @Column("bit", { name: "Elaboracion", default: () => "(0)" })
  @Field()
  elaboracion: boolean;

  @Column("real", {
    name: "PorcElaboracion",
    precision: 24,
    default: () => "(0)",
  })
  @Field(() => Float)
  porcElaboracion: number;

  @Column("int", { name: "Linea", default: () => "(0)" })
  @Field(() => Int)
  linea: number;

  @Column("decimal", {
    name: "PorcMComercImp",
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float)
  porcMComercImp: number;

  @Column("float", { name: "ValorMCImp", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  valorMcImp: number;

  @Column("decimal", {
    name: "PorcMComercMin",
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float)
  porcMComercMin: number;

  @Column("float", { name: "ValorMCMin", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  valorMcMin: number;

  @Column("decimal", {
    name: "PorcMComercMay",
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float)
  porcMComercMay: number;

  @Column("float", { name: "ValorMCMay", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  valorMcMay: number;

  @Column("decimal", {
    name: "PorcOGastosImp",
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float)
  porcOGastosImp: number;

  @Column("float", {
    name: "ValorOGastosImp",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  valorOGastosImp: number;

  @Column("decimal", {
    name: "PorcOGastosMay",
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float)
  porcOGastosMay: number;

  @Column("float", {
    name: "ValorOGastosMay",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  valorOGastosMay: number;

  @Column("decimal", {
    name: "PorcOGastosMin",
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float)
  porcOGastosMin: number;

  @Column("float", {
    name: "ValorOGastosMin",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  valorOGastosMin: number;

  @Column("decimal", {
    name: "PorcImpuestContImp",
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float)
  porcImpuestContImp: number;

  @Column("float", {
    name: "ValorImpuestContImp",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  valorImpuestContImp: number;

  @Column("decimal", {
    name: "PorcImpuestContMay",
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float)
  porcImpuestContMay: number;

  @Column("float", {
    name: "ValorImpuestContMay",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  valorImpuestContMay: number;

  @Column("decimal", {
    name: "PorcImpuestContMin",
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float)
  porcImpuestContMin: number;

  @Column("float", {
    name: "ValorImpuestContMin",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  valorImpuestContMin: number;

  @Column("money", { name: "PrecioMin", default: () => "(0)" })
  @Field(() => Float)
  precioMin: number;

  @Column("bit", { name: "Mincin", nullable: true, default: () => "(0)" })
  @Field({nullable: true})
  mincin: boolean | null;

  @Column("float", { name: "PCCif", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  pcCif: number;

  @Column("float", { name: "Arancel", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  arancel: number;

  @Column("int", { name: "IDFicha", nullable: true })
  @Field(() => Int,{nullable: true})
  idFicha: number | null;

  @Field(() => [ContratoDesglose], { nullable: true })
  @OneToMany(() => ContratoDesglose,(contratoDesglose) => contratoDesglose.detalleDeCircularesAltas)
  contratoDesgloses: ContratoDesglose[];
}
