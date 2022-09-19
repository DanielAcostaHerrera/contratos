import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { ContratoDesglose } from "../../models/entities/ContratoDesglose.entity";
import { Embalajes } from "../../models/entities/Embalajes.entity";
import { FacturaDesglose } from "../../models/entities/FacturaDesglose.entity";
import { SolicitudOfertasEntradas } from "../../models/entities/SolicitudOfertasEntradas.entity";
import { SuplementoDesglose } from "../../models/entities/SuplementoDesglose.entity";
import { Referencias } from "./Referencias.entity";

@ObjectType()
@Index("ActualizacionesCODIGOS_para_la_Venta", ["idActualizacion"], {})
@Index("CategoriasCODIGOS_para_la_Venta", ["idCategorA"], {})
@Index("CircularesCODIGOS_para_la_Venta", ["idCircular"], {})
@Index("Codigo", ["codigo"], { unique: true })
@Index("Detalle_de_Circulares_AltasCODIGOS_para_la_Venta", ["idCodigo"], {
  unique: true,
})
@Index("Especifico", ["especifico"], {})
@Index("EspecificosCODIGOS_para_la_Venta", ["especifico"], {})
@Index("ESTADOSCODIGOS_para_la_Venta", ["idEstado"], {})
@Index("Familias_DIVICODIGOS_para_la_Venta", ["familia"], {})
@Index("IdActualizacion", ["idActualizacion"], {})
@Index("IdCategoría", ["idCategorA"], {})
@Index("IdCircular", ["idCircular"], {})
@Index("IdEstado", ["idEstado"], {})
@Index("IdFamilia", ["familia"], {})
@Index("IdMarca", ["idMarca"], {})
@Index("IdMedida", ["idMedida"], {})
@Index("IdOperacionC", ["idOperacionC"], {})
@Index("IndiceMFP", ["indiceMfp"], {})
@Index("MarcasCODIGOS_para_la_Venta", ["idMarca"], {})
@Index("MedidasCODIGOS_para_la_Venta", ["idMedida"], {})
@Index("NaturalezasCODIGOS_para_la_Venta", ["naturaleza"], {})
@Index("PaisesCODIGOS_para_la_Venta", ["paisOrigen"], {})
@Index("PaisOrigen", ["paisOrigen"], {})
@Index("PARTIDAS_ArancelariasCODIGOS_para_la_Venta", ["partida"], {})
@Index("PK_CODIGOS_para_la_Venta", ["idCodigo"], { unique: true })
@Index("Proveedor", ["proveedor"], {})
@Index("ProveedoresCODIGOS_para_la_Venta", ["proveedor"], {})
@Index("UnidadMedidaCODIGOS_para_la_Venta", ["um"], {})
@Entity("CODIGOS_para_la_Venta", { schema: "Mercurio.dbo" })
export class CodigosParaLaVenta {
  @Column("int", { primary: true, name: "IdCodigo", default: () => "(0)" })
  @Field(() => Int)
  idCodigo: number;

  @Column("nvarchar", { name: "Codigo", unique: true, length: 13 })
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
  precioProveedorCUP: number;

  @Column("real", {
    name: "Flete",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  @Field(() => Float)
  flete: number | null;

  @Column("real", {
    name: "Seguro",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  @Field(() => Float)
  seguro: number | null;

  @Column("real", { name: "OGastos", nullable: true, precision: 24 })
  @Field(() => Float,{nullable: true})
  oGastos: number | null;

  @Column("float", { name: "PrecioPROVEEDOR_", precision: 53 })
  @Field(() => Float,{nullable: true})
  precioProveedor: number;

  @Column("float", { name: "PCostoMN", precision: 53 })
  @Field(() => Float)
  pCostoMn: number;

  @Column("float", { name: "PCostoUSD", precision: 53 })
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
  @Field(() => Float)
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

  @Column("real", { name: "PCosto", precision: 24 })
  @Field(() => Float,{nullable: true})
  pCosto: number;

  @Column("money", { name: "PVenta", nullable: true, default: () => "(0)" })
  @Field(() => Float,{nullable: true})
  pVenta: number | null;

  @Column("real", {
    name: "Indice Aplicado",
    precision: 24,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  indiceAplicado: number;

  @Column("real", { name: "IndiceMFP", nullable: true, precision: 24 })
  @Field(() => Float,{nullable: true})
  indiceMfp: number | null;

  @Column("float", { name: "PrecioLOP", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  precioLop: number | null;

  @Column("bit", { name: "OCASION", default: () => "(0)" })
  @Field({nullable: true})
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

  @Column("smallint", { name: "IdEstado", default: () => "(1)" })
  @Field(() => Int)
  idEstado: number;

  @Column("int", { name: "IdCircular", default: () => "(0)" })
  @Field(() => Int)
  idCircular: number;

  @Column("nvarchar", { name: "IdActualizacion", length: 1 })
  @Field()
  idActualizacion: string;

  @Column("nvarchar", { name: "User_", length: 30 })
  @Field()
  user: string;

  @Column("int", { name: "CRC", default: () => "(0)" })
  @Field(() => Int)
  crc: number;

  @Column("timestamp", { name: "upsize_ts", nullable: true })
  @Field({nullable:true})
  upsizeTs: Date | null;

  @Column("int", { name: "IdOperacionC", nullable: true })
  @Field(()=> Int,{nullable:true})
  idOperacionC: number | null;

  @Column("bit", { name: "Remate", nullable: true, default: () => "(0)" })
  @Field({nullable:true})
  remate: boolean | null;

  @Column("float", { name: "reserved1", nullable: true, precision: 53 })
  @Field(()=> Float,{nullable:true})
  reserved1: number | null;

  @Column("float", {
    name: "PrecioCUCNacional",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=> Float,{nullable:true})
  precioCucNacional: number | null;

  @Column("nvarchar", {
    name: "reserved3",
    nullable: true,
    length: 50,
    default: () => "'0'",
  })
  @Field({nullable:true})
  reserved3: string | null;

  @Column("nvarchar", { name: "reserved4", nullable: true, length: 50 })
  @Field({nullable:true})
  reserved4: string | null;

  @Column("char", { name: "IdMoneda", nullable: true, length: 3 })
  @Field({nullable:true})
  idMoneda: string | null;

  @Column("money", {
    name: "PVentaTerceros",
    nullable: true,
    default: () => "(0)",
  })
  @Field({nullable:true})
  pVentaTerceros: number | null;

  @Column("real", { name: "reserved5", nullable: true, precision: 24 })
  @Field(()=>Float,{nullable:true})
  reserved5: number | null;

  @Column("real", {
    name: "reserved6",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  reserved6: number | null;

  @Column("real", {
    name: "reserved7",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  reserved7: number | null;

  @Column("bit", { name: "Operacion", default: () => "(1)" })
  @Field()
  @Field()
  operacion: boolean;

  @Column("bit", { name: "Consignacion", nullable: true, default: () => "(0)" })
  @Field({nullable:true})
  consignacion: boolean | null;

  @Column("int", { name: "Factor", nullable: true, default: () => "(0)" })
  @Field(()=>Int,{nullable:true})
  factor: number | null;

  @Column("int", { name: "Embalaje", nullable: true })
  @Field(()=>Int,{nullable:true})
  idEembalaje: number | null;

  @Column("float", {
    name: "PesoEmbKG",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  pesoEmbKg: number | null;

  @Column("float", {
    name: "VolEmb",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  volEmb: number | null;

  @Column("float", {
    name: "PCSinArancel",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  pcSinArancel: number | null;

  @Column("bit", { name: "NotaDeCredito", nullable: true })
  @Field({nullable:true})
  notaDeCredito: boolean | null;

  @Column("float", {
    name: "PVentaGast",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  pVentaGast: number | null;

  @Column("float", {
    name: "PVentaMay",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  pVentaMay: number | null;

  @Column("float", {
    name: "PVentaMod",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  pVentaMod: number | null;

  @Column("int", { name: "NumNotCred", nullable: true })
  @Field(()=>Int,{nullable:true})
  numNotCred: number | null;

  @Column("bit", { name: "Reposicion", nullable: true, default: () => "(0)" })
  @Field({nullable:true})
  reposicion: boolean | null;

  @Column("datetime", { name: "Actualizacion", default: () => "getdate()" })
  @Field()
  actualizacion: Date;

  @Column("decimal", {
    name: "PorcMComerc",
    nullable: true,
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  porcMComerc: number | null;

  @Column("decimal", {
    name: "GastAduan",
    nullable: true,
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  gastAduan: number | null;

  @Column("decimal", {
    name: "GastBanc",
    nullable: true,
    precision: 8,
    scale: 4,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  gastBanc: number | null;

  @Column("decimal", {
    name: "TotalCostGast",
    nullable: true,
    precision: 15,
    scale: 4,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  totalCostGast: number | null;

  @Column("decimal", {
    name: "CostAlmacen",
    nullable: true,
    precision: 15,
    scale: 4,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  costAlmacen: number | null;

  @Column("decimal", {
    name: "CompCUCMC",
    nullable: true,
    precision: 10,
    scale: 4,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  compCucmc: number | null;

  @Column("bit", {
    name: "NuevaFormCost",
    nullable: true,
    default: () => "(0)",
  })
  @Field({nullable:true})
  nuevaFormCost: boolean | null;

  @Column("decimal", {
    name: "CompMNMC",
    nullable: true,
    precision: 10,
    scale: 4,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  compMnmc: number | null;

  @Column("bit", { name: "Elaboracion", default: () => "(0)" })
  @Field()
  elaboracion: boolean;

  @Column("real", {
    name: "PorcElaboracion",
    precision: 24,
    default: () => "(0)",
  })
  @Field(()=>Float)
  porcElaboracion: number;

  @Column("bit", { name: "Modificado", default: () => "(0)" })
  @Field()
  modificado: boolean;

  @Column("int", { name: "Auditoria", default: () => "(0)" })
  @Field(()=>Int)
  auditoria: number;

  @Column("int", { name: "Linea", default: () => "(0)" })
  @Field(()=>Int)
  linea: number;

  @Column("bit", { name: "Mincin", default: () => "(0)" })
  @Field()
  mincin: boolean;

  @Column("float", {
    name: "PorcMComercImp",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  porcMComercImp: number;

  @Column("float", { name: "ValorMCImp", precision: 53, default: () => "(0)" })
  @Field(()=>Float)
  valorMcImp: number;

  @Column("float", {
    name: "PorcMComercMin",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  porcMComercMin: number;

  @Column("float", { name: "ValorMCMin", precision: 53, default: () => "(0)" })
  @Field(()=>Float)
  valorMcMin: number;

  @Column("float", {
    name: "PorcMComercMay",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  porcMComercMay: number;

  @Column("float", { name: "ValorMCMay", precision: 53, default: () => "(0)" })
  @Field(()=>Float)
  valorMcMay: number;

  @Column("float", {
    name: "PorcOGastosImp",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  porcOGastosImp: number;

  @Column("float", {
    name: "ValorOGastosImp",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  valorOGastosImp: number;

  @Column("float", {
    name: "PorcOGastosMay",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  porcOGastosMay: number;

  @Column("float", {
    name: "ValorOGastosMay",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  valorOGastosMay: number;

  @Column("float", {
    name: "PorcOGastosMin",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  porcOGastosMin: number;

  @Column("float", {
    name: "ValorOGastosMin",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  valorOGastosMin: number;

  @Column("float", {
    name: "PorcImpuestContImp",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  porcImpuestContImp: number;

  @Column("float", {
    name: "ValorImpuestContImp",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  valorImpuestContImp: number;

  @Column("float", {
    name: "PorcImpuestContMay",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  porcImpuestContMay: number;

  @Column("float", {
    name: "ValorImpuestContMay",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  valorImpuestContMay: number;

  @Column("float", {
    name: "PorcImpuestContMin",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  porcImpuestContMin: number;

  @Column("float", {
    name: "ValorImpuestContMin",
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float)
  valorImpuestContMin: number;

  @Column("money", { name: "PrecioMin", default: () => "(0)" })
  @Field()
  precioMin: number;

  @Column("money", { name: "PVentaMN", default: () => "(0)" })
  @Field()
  pVentaMn: number;

  @Column("float", {
    name: "PCCif",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  pcCif: number | null;

  @Column("float", {
    name: "Arancel",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  arancel: number | null;

  @Column("int", { name: "IDFicha", nullable: true })
  @Field(()=>Int,{nullable:true})
  idFicha: number | null;

  @Column("float", { name: "PCCircMay", nullable: true, precision: 53 })
  @Field(()=>Float,{nullable:true})
  pcCircMay: number | null;

  @Column("int", { name: "CPCU", nullable: true })
  @Field(()=>Int,{nullable:true})
  cpcu: number | null;

  @Column("real", {
    name: "TermFinanc",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  @Field(()=>Float,{nullable:true})
  termFinanc: number | null;

  @Column("nvarchar", { name: "NoFicha", nullable: true, length: 4000 })
  @Field({nullable:true})
  noFicha: string | null;

  @Field(() => [ContratoDesglose], { nullable: true })
  @OneToMany(() => ContratoDesglose,(contratoDesglose) => contratoDesglose.codigo)
  contratoDesgloses : ContratoDesglose[];

  @Field(() => [FacturaDesglose], { nullable: true })
  @OneToMany(() => FacturaDesglose,(facturaDesglose) => facturaDesglose.codigo)
  facturaDesgloses : FacturaDesglose[];

  @Field(() => [SuplementoDesglose], { nullable: true })
  @OneToMany(() => SuplementoDesglose,(suplementoDesgloses) => suplementoDesgloses.codigo)
  suplementoDesgloses: SuplementoDesglose[];

  @Field(() => [SolicitudOfertasEntradas], { nullable: true })
  @OneToMany(() => SolicitudOfertasEntradas,(solicitudOfertasEntradas) => solicitudOfertasEntradas.codigo)
  solicitudOfertasEntradas: SolicitudOfertasEntradas[];

  @Field(() => Embalajes, {nullable: true})
  @OneToOne(() => Embalajes, (embalaje) => embalaje.codigo)
  @JoinColumn([{ name: "Embalaje", referencedColumnName: "idEmbalaje" }])
  embalaje: Embalajes;

  @Field(() => [Referencias], {nullable: true})
  @OneToMany(() => Referencias,(referencia) => referencia.codigo)
  referencia: Referencias;
}
