import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FichaCompraDetalle } from "./FichaCompraDetalle.entity";
import { Monedas } from "./Monedas.entity";
import { Incoterm } from "./Incoterm.entity";
import { Contratos } from "./Contratos.entity";
import { NegociacionResumen } from "./NegociacionResumen.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_FichaCompraResumen", ["idFicha"], { unique: true })
@Entity("FichaCompraResumen", { schema: "CONTRATO.dbo" })
export class FichaCompraResumen {
  @PrimaryGeneratedColumn({ type: "int", name: "IdFicha" })
  @Field(() => Int)
  idFicha: number;

  @Column("int", { name: "IdProveedor" })
  @Field(() => Int)
  idProveedor: number;

  @Column("int", { name: "IdMoneda" })
  @Field(() => Int)
  idMoneda: number;

  @Column("int", { name: "IdIncoterm" })
  @Field(() => Int)
  idIncoterm: number;

  @Column("int", { name: "IdContrato" })
  @Field(() => Int)
  idContrato: number;

  @Column("int", { name: "IdNegociacion" })
  @Field(() => Int)
  idNegociacion: number;

  @Column("int", { name: "IdPais" })
  @Field(() => Int)
  idPais: number;

  @Column("int", { name: "Contenedores", default: () => "(1)" })
  @Field(() => Int)
  contenedores: number;

  @Column("float", { name: "PesoBruto", nullable: true, precision: 53 })
  @Field(() => Float)
  pesoBruto: number | null;

  @Column("float", { name: "PesoNeto", nullable: true, precision: 53 })
  @Field(() => Float)
  pesoNeto: number | null;

  @Column("nvarchar", { name: "Embalaje", nullable: true, length: 50 })
  @Field()
  embalaje: string | null;

  @Column("float", { name: "CantidadEmbalaje", nullable: true, precision: 53 })
  @Field(() => Float)
  cantidadEmbalaje: number | null;

  @Column("float", { name: "Cantidad", nullable: true, precision: 53 })
  @Field(() => Float)
  cantidad: number | null;

  @Column("nvarchar", { name: "Codigo", nullable: true, length: 13 })
  @Field()
  codigo: string | null;

  @Column("nvarchar", { name: "Descripcion", nullable: true, length: 200 })
  @Field()
  descripcion: string | null;

  @Column("float", {
    name: "ValorContratacion",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  valorContratacion: number;

  @Column("float", {
    name: "GastoAlmacenOrigen",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoAlmacenOrigen: number;

  @Column("float", {
    name: "GastoTranspOrigen",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoTranspOrigen: number;

  @Column("float", {
    name: "GastoAduanaOrigen",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoAduanaOrigen: number;

  @Column("float", {
    name: "GastoManipulacionOrigen",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoManipulacionOrigen: number;

  @Column("float", {
    name: "OtrosGastosOrigen",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  otrosGastosOrigen: number;

  @Column("float", { name: "TotalGastoOrigen", precision: 53 })
  @Field(() => Float)
  totalGastoOrigen: number;

  @Column("float", {
    name: "RecargoContratacion",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  recargoContratacion: number;

  @Column("float", {
    name: "DescuentoContratacion",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  descuentoContratacion: number;

  @Column("float", { name: "TotalRecDescContrato", precision: 53 })
  @Field(() => Float)
  totalRecDescContrato: number;

  @Column("float", { name: "TotalAdquisicion", precision: 53 })
  @Field(() => Float)
  totalAdquisicion: number;

  @Column("float", { name: "IndicePPCosto", precision: 53 })
  @Field(() => Float)
  indicePpCosto: number;

  @Column("float", { name: "DifCambioMoneda", precision: 53 })
  @Field(() => Float)
  difCambioMoneda: number;

  @Column("float", {
    name: "TasaCambioContratacion",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaCambioContratacion: number;

  @Column("float", { name: "ValorMercancia", precision: 53 })
  @Field(() => Float)
  valorMercancia: number;

  @Column("float", { name: "TarifaFlete", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  tarifaFlete: number;

  @Column("float", {
    name: "RecargoFlete",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  recargoFlete: number;

  @Column("float", {
    name: "DescuentoFlete",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  descuentoFlete: number;

  @Column("float", { name: "TotalFlete", precision: 53 })
  @Field(() => Float)
  totalFlete: number;

  @Column("float", { name: "CostoFleteUSD", precision: 53 })
  @Field(() => Float)
  costoFleteUsd: number;

  @Column("float", {
    name: "SeguroContrato",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  seguroContrato: number;

  @Column("float", { name: "Seguro", nullable: true, precision: 53 })
  @Field(() => Float)
  seguro: number | null;

  @Column("float", { name: "TasaSeguro", nullable: true, precision: 53 })
  @Field(() => Float)
  tasaSeguro: number | null;

  @Column("float", { name: "CostoCIFFleteUSD", nullable: true, precision: 53 })
  @Field(() => Float)
  costoCifFleteUsd: number | null;

  @Column("float", {
    name: "TasaCambioMN",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaCambioMn: number;

  @Column("float", {
    name: "CostoFleteSeguroMN",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  costoFleteSeguroMn: number | null;

  @Column("float", { name: "FactorConversion", nullable: true, precision: 53 })
  @Field(() => Float)
  factorConversion: number | null;

  @Column("float", {
    name: "TasaArancelaria",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaArancelaria: number;

  @Column("float", { name: "ValorArancel", nullable: true, precision: 53 })
  @Field(() => Float)
  valorArancel: number | null;

  @Column("float", {
    name: "GastoManipulacion",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoManipulacion: number;

  @Column("float", { name: "GastoDoc", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  gastoDoc: number;

  @Column("float", {
    name: "GastoEmisionBL",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoEmisionBl: number;

  @Column("float", {
    name: "GastoMovContenedores",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoMovContenedores: number;

  @Column("float", {
    name: "GastoAsistenciaTecn",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoAsistenciaTecn: number;

  @Column("float", {
    name: "GastoSeguridadCont",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoSeguridadCont: number;

  @Column("float", {
    name: "GastoFumigacion",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoFumigacion: number;

  @Column("float", {
    name: "GastoSupervisiones",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoSupervisiones: number;

  @Column("float", {
    name: "GastoFitosanitario",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  gastoFitosanitario: number;

  @Column("float", {
    name: "OGastosPortuariosAduanales",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  oGastosPortuariosAduanales: number;

  @Column("float", { name: "GastosImportacion", precision: 53 })
  @Field(() => Float)
  gastosImportacion: number;

  @Column("float", { name: "OtrosGastos", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  otrosGastos: number;

  @Column("float", {
    name: "Financiamiento",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  financiamiento: number;

  @Column("float", { name: "TotalGastos", precision: 53 })
  @Field(() => Float)
  totalGastos: number;

  @Column("float", { name: "IndicePGasto", nullable: true, precision: 53 })
  @Field(() => Float)
  indicePGasto: number | null;

  @Column("float", {
    name: "IndGastoAdquisicion",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  indGastoAdquisicion: number | null;

  @Column("float", {
    name: "TasaMaxRecargo",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaMaxRecargo: number;

  @Column("float", { name: "MargenComercial", nullable: true, precision: 53 })
  @Field(() => Float)
  margenComercial: number | null;

  @Column("float", {
    name: "TasaImpuestoVentas",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaImpuestoVentas: number;

  @Column("float", {
    name: "TasaContibucion",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaContibucion: number;

  @Column("float", {
    name: "TasaImpuestoProducto",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaImpuestoProducto: number;

  @Column("float", { name: "TotalImpuestoContrib", precision: 53 })
  @Field(() => Float)
  totalImpuestoContrib: number;

  @Column("float", { name: "PVentaImportador", nullable: true, precision: 53 })
  @Field(() => Float)
  pVentaImportador: number | null;

  @Column("float", {
    name: "TasaCircMayorista",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaCircMayorista: number;

  @Column("float", {
    name: "TasaCircMinorista",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaCircMinorista: number;

  @Column("float", {
    name: "TasaImpuestoVentasMin",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaImpuestoVentasMin: number;

  @Column("float", {
    name: "TasaContibucionMin",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaContibucionMin: number;

  @Column("float", {
    name: "TasaImpuestoProductoMin",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  tasaImpuestoProductoMin: number;

  @Column("float", { name: "TotalImpuestoContribMin", precision: 53 })
  @Field(() => Float)
  totalImpuestoContribMin: number;

  @Column("datetime", { name: "Fecha", default: () => "getdate()" })
  @Field()
  fecha: Date;

  @Column("nvarchar", { name: "Nota", nullable: true })
  @Field()
  nota: string | null;

  @Column("int", { name: "RealizadoPor", nullable: true })
  @Field(() => Int)
  realizadoPor: number | null;

  @Column("bit", { name: "Aprobado", default: () => "(0)" })
  @Field()
  aprobado: boolean;

  @Column("bit", { name: "Terminado", default: () => "(0)" })
  @Field()
  terminado: boolean;

  @Column("datetime", { name: "FechaAprobado", nullable: true })
  @Field()
  fechaAprobado: Date | null;

  @Column("bit", { name: "Cancelado", default: () => "(0)" })
  @Field()
  cancelado: boolean;

  @Column("int", { name: "CanceladoPor", nullable: true })
  @Field(() => Int)
  canceladoPor: number | null;

  @Column("datetime", { name: "FechaCancelacion", nullable: true })
  @Field()
  fechaCancelacion: Date | null;

  @Column("bit", { name: "ChkRecepcion", default: () => "(0)" })
  @Field()
  chkRecepcion: boolean;

  @Column("nvarchar", { name: "NoFicha", nullable: true, length: 4000 })
  @Field()
  noFicha: string | null;

  @Field(() => [FichaCompraDetalle], {nullable: true})
  @OneToMany(() => FichaCompraDetalle,(fichaCompraDetalle) => fichaCompraDetalle.fichaCompraResumen)
  fichaCompraDetalles: FichaCompraDetalle[];

  @Field(() => Monedas, {nullable: true})
  @ManyToOne(() => Monedas, (monedas) => monedas.fichaCompraResumen)
  @JoinColumn([{ name: "IdMoneda", referencedColumnName: "idMoneda" }])
  moneda: Monedas;

  @Field(() => Incoterm, {nullable: true})
  @ManyToOne(() => Incoterm, (incoterm) => incoterm.fichaCompraResumen)
  @JoinColumn([{ name: "IdIncoterm", referencedColumnName: "idIncoterm" }])
  incoterm: Incoterm;

  @Field(() => Contratos, {nullable: true})
  @ManyToOne(() => Contratos, (contratos) => contratos.fichaCompraResumen)
  @JoinColumn([{ name: "IdContrato", referencedColumnName: "idContrato" }])
  contrato: Contratos;

  @Field(() => NegociacionResumen, {nullable: true})
  @ManyToOne(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.fichaCompraResumen)
  @JoinColumn([{ name: "IdNegociacion", referencedColumnName: "idNegociacion" }])
  negociacionResumen: NegociacionResumen;
}
