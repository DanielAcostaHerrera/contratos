import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesCMarco } from "./BasesCMarco.entity";
import { Monedas } from "./Monedas.entity";
import { FormasPago } from "./FormasPago.entity";
import { Incoterm } from "./Incoterm.entity";
import { Puertos } from "./Puertos.entity";
import { Embalajes } from "./Embalajes.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("IX_FichaCostoResumen", ["fecha"], {})
@Index("IX_FichaCostoResumen_Pais", ["idPais"], {})
@Index("IX_FichaCostoResumen_Prov", ["idProveedor"], {})
@Index("PK_FichaCostoResumen", ["idFicha"], { unique: true })
@Entity("FichaCostoResumen", { schema: "dbo" })
export class FichaCostoResumen {
  @PrimaryGeneratedColumn({ type: "int", name: "IdFicha" })
  @Field(() => Int)
  idFicha: number;

  @Column("int", { name: "IdCCosto" })
  @Field(() => Int)
  idCCosto: number;

  @Column("int", { name: "IdBaseCMarco" })
  @Field(() => Int)
  idBaseCMarco: number;

  @Column("int", { name: "IdMoneda" })
  @Field(() => Int)
  idMoneda: number;

  @Column("int", { name: "IdFormaPago" })
  @Field(() => Int)
  idFormaPago: number;

  @Column("int", { name: "IdIncoterm" })
  @Field(() => Int)
  idIncoterm: number;

  @Column("int", { name: "IdPuerto" })
  @Field(() => Int)
  idPuerto: number;

  @Column("int", { name: "IdEmbalaje" })
  @Field(() => Int)
  idEmbalaje: number;

  @Column("int", { name: "IdProveedor" })
  @Field(() => Int)
  idProveedor: number;

  @Column("nvarchar", { name: "BL", nullable: true, length: 50 })
  @Field()
  bl: string | null;

  @Column("int", { name: "CantAnexos" })
  @Field(() => Int)
  cantAnexos: number;

  @Column("nvarchar", { name: "ViaTransporte", nullable: true, length: 50 })
  @Field(() => Int)
  viaTransporte: string | null;

  @Column("int", { name: "IdPais" })
  @Field(() => Int)
  idPais: number;

  @Column("nvarchar", { name: "Destino", nullable: true, length: 50 })
  @Field()
  destino: string | null;

  @Column("nvarchar", { name: "Contenedores", nullable: true, length: 50 })
  @Field()
  contenedores: string | null;

  @Column("float", { name: "PesoBruto", nullable: true, precision: 53 })
  @Field(() => Float)
  pesoBruto: number | null;

  @Column("float", { name: "PesoNeto", nullable: true, precision: 53 })
  @Field(() => Float)
  pesoNeto: number | null;

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

  @Column("float", { name: "ValorContratacion", nullable: true, precision: 53 })
  @Field(() => Float)
  valorContratacion: number | null;

  @Column("float", {
    name: "GastoAlmacenOrigen",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  gastoAlmacenOrigen: number | null;

  @Column("float", { name: "GastoTranspOrigen", nullable: true, precision: 53 })
  @Field(() => Float)
  gastoTranspOrigen: number | null;

  @Column("float", { name: "GastoAduanaOrigen", nullable: true, precision: 53 })
  @Field(() => Float)
  gastoAduanaOrigen: number | null;

  @Column("float", {
    name: "GastoManipulacionOrigen",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  gastoManipulacionOrigen: number | null;

  @Column("float", { name: "OtrosGastosOrigen", nullable: true, precision: 53 })
  @Field(() => Float)
  otrosGastosOrigen: number | null;

  @Column("float", { name: "TotalGastoOrigen", nullable: true, precision: 53 })
  @Field(() => Float)
  totalGastoOrigen: number | null;

  @Column("float", {
    name: "RecargoContratacion",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  recargoContratacion: number | null;

  @Column("float", {
    name: "DescuentoContratacion",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  descuentoContratacion: number | null;

  @Column("float", {
    name: "TotalRecDescContrato",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  totalRecDescContrato: number | null;

  @Column("float", { name: "TotalAdquisicion", nullable: true, precision: 53 })
  @Field(() => Float)
  totalAdquisicion: number | null;

  @Column("float", { name: "DifCambioMoneda", nullable: true, precision: 53 })
  @Field(() => Float)
  difCambioMoneda: number | null;

  @Column("float", {
    name: "TasaCambioContratacion",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  tasaCambioContratacion: number | null;

  @Column("float", { name: "ValorMercancia", nullable: true, precision: 53 })
  @Field(() => Float)
  valorMercancia: number | null;

  @Column("float", { name: "TarifaFlete", nullable: true, precision: 53 })
  @Field(() => Float)
  tarifaFlete: number | null;

  @Column("float", { name: "RecargoFlete", nullable: true, precision: 53 })
  @Field(() => Float)
  recargoFlete: number | null;

  @Column("float", { name: "DescuentoFlete", nullable: true, precision: 53 })
  @Field(() => Float)
  descuentoFlete: number | null;

  @Column("float", { name: "TotalFlete", nullable: true, precision: 53 })
  @Field(() => Float)
  totalFlete: number | null;

  @Column("float", { name: "CostoFleteUSD", nullable: true, precision: 53 })
  @Field(() => Float)
  costoFleteUsd: number | null;

  @Column("float", { name: "Seguro", nullable: true, precision: 53 })
  @Field(() => Float)
  seguro: number | null;

  @Column("float", { name: "TasaSeguro", nullable: true, precision: 53 })
  @Field(() => Float)
  tasaSeguro: number | null;

  @Column("float", { name: "CostoCIFFleteUSD", nullable: true, precision: 53 })
  @Field(() => Float)
  costoCifFleteUsd: number | null;

  @Column("float", { name: "TasaCambioMN", nullable: true, precision: 53 })
  @Field(() => Float)
  tasaCambioMn: number | null;

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

  @Column("float", { name: "TasaArancelaria", nullable: true, precision: 53 })
  @Field(() => Float)
  tasaArancelaria: number | null;

  @Column("float", { name: "ValorArancel", nullable: true, precision: 53 })
  @Field(() => Float)
  valorArancel: number | null;

  @Column("float", { name: "GastoManipulacion", nullable: true, precision: 53 })
  @Field(() => Float)
  gastoManipulacion: number | null;

  @Column("float", { name: "GastoDoc", nullable: true, precision: 53 })
  @Field(() => Float)
  gastoDoc: number | null;

  @Column("float", { name: "GastoEmisionBL", nullable: true, precision: 53 })
  @Field(() => Float)
  gastoEmisionBl: number | null;

  @Column("float", {
    name: "GastoMovContenedores",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  gastoMovContenedores: number | null;

  @Column("float", {
    name: "GastoAsistenciaTecn",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  gastoAsistenciaTecn: number | null;

  @Column("float", {
    name: "GastoSeguridadCont",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  gastoSeguridadCont: number | null;

  @Column("float", { name: "GastoFumigacion", nullable: true, precision: 53 })
  @Field(() => Float)
  gastoFumigacion: number | null;

  @Column("float", {
    name: "GastoSupervisiones",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  gastoSupervisiones: number | null;

  @Column("float", {
    name: "GastoFitosanitario",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  gastoFitosanitario: number | null;

  @Column("float", {
    name: "OGastosPortuariosAduanales",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  oGastosPortuariosAduanales: number | null;

  @Column("float", { name: "GastosImportacion", nullable: true, precision: 53 })
  @Field(() => Float)
  gastosImportacion: number | null;

  @Column("float", { name: "OtrosGastos", nullable: true, precision: 53 })
  @Field(() => Float)
  otrosGastos: number | null;

  @Column("float", { name: "TotalGastos", nullable: true, precision: 53 })
  @Field(() => Float)
  totalGastos: number | null;

  @Column("float", { name: "IndicePGasto", nullable: true, precision: 53 })
  @Field(() => Float)
  indicePGasto: number | null;

  @Column("float", { name: "TasaMaxRecargo", nullable: true, precision: 53 })
  @Field(() => Float)
  tasaMaxRecargo: number | null;

  @Column("float", { name: "MargenComercial", nullable: true, precision: 53 })
  @Field(() => Float)
  margenComercial: number | null;

  @Column("float", {
    name: "TasaImpuestoVentas",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  tasaImpuestoVentas: number | null;

  @Column("float", { name: "TasaContibucion", nullable: true, precision: 53 })
  @Field(() => Float)
  tasaContibucion: number | null;

  @Column("float", {
    name: "TasaImpuetoProducto",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  tasaImpuetoProducto: number | null;

  @Column("float", {
    name: "TotalImpuestoContrib",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float)
  totalImpuestoContrib: number | null;

  @Column("float", { name: "PVentaImportador", nullable: true, precision: 53 })
  @Field(() => Float)
  pVentaImportador: number | null;

  @Column("datetime", {
    name: "Fecha",
    nullable: true,
    default: () => "getdate()",
  })
  @Field()
  fecha: Date | null;

  @Column("nvarchar", { name: "Nota", nullable: true })
  @Field()
  nota: string | null;

  @Column("int", { name: "Elaborado", nullable: true })
  @Field(() => Int)
  elaborado: number | null;

  @Column("int", { name: "Aprobado", nullable: true })
  @Field(() => Int)
  aprobado: number | null;

  @Field(() => BasesCMarco)
  @ManyToOne(() => BasesCMarco, (basesCMarco) => basesCMarco.fichaCostoResumen)
  @JoinColumn([{ name: "IdBaseCMarco", referencedColumnName: "idBaseCMarco" }])
  baseCMarco: BasesCMarco;

  @Field(() => Monedas)
  @ManyToOne(() => Monedas, (monedas) => monedas.fichaCostoResumen)
  @JoinColumn([{ name: "IdMoneda", referencedColumnName: "idMoneda" }])
  moneda: Monedas;

  @Field(() => FormasPago)
  @ManyToOne(() => FormasPago, (formasPago) => formasPago.fichaCostoResumen)
  @JoinColumn([{ name: "IdFormaPago", referencedColumnName: "idFormaPago" }])
  formaPago: FormasPago;

  @Field(() => Incoterm)
  @ManyToOne(() => Incoterm, (incoterm) => incoterm.fichaCostoResumen)
  @JoinColumn([{ name: "IdIncoterm", referencedColumnName: "idIncoterm" }])
  incoterm: Incoterm;

  @Field(() => Puertos)
  @ManyToOne(() => Puertos, (puertos) => puertos.fichaCostoResumen)
  @JoinColumn([{ name: "IdPuerto", referencedColumnName: "idPuerto" }])
  puerto: Puertos;

  @Field(() => Embalajes)
  @ManyToOne(() => Embalajes, (embalajes) => embalajes.fichaCostoResumen)
  @JoinColumn([{ name: "IdEmbalaje", referencedColumnName: "idEmbalaje" }])
  embalaje: Embalajes;
}
