import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesCMarco } from "./BasesCMarco.entity";
import { Monedas } from "./Monedas.entity";
import { FormasPago } from "./FormasPago.entity";
import { Incoterm } from "./Incoterm.entity";
import { Puertos } from "./Puertos.entity";
import { Embalajes } from "./Embalajes.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Contratos } from "./Contratos.entity";
import { Proveedores } from "../../modelsMercurio/entities/Proveedores.entity";
import { Paises } from "../../modelsMercurio/entities/Paises.entity";
import { CodigosParaLaVenta } from "../../modelsMercurio/entities/CodigosParaLaVenta.entity";

@ObjectType()
@Index("IX_FichaCostoResumen", ["fecha"], {})
@Index("IX_FichaCostoResumen_Pais", ["idPais"], {})
@Index("IX_FichaCostoResumen_Prov", ["idProveedor"], {})
@Index("PK_FichaCostoResumen", ["idFicha"], { unique: true })
@Entity("FichaCostoResumen", { schema: "CONTRATO.dbo" })
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
  @Field({nullable: true})
  bl: string | null;

  @Column("int", { name: "CantAnexos" })
  @Field(() => Int)
  cantAnexos: number;

  @Column("nvarchar", { name: "ViaTransporte", nullable: true, length: 50 })
  @Field(() => Int,{nullable: true})
  viaTransporte: string | null;

  @Column("int", { name: "IdPais" })
  @Field(() => Int)
  idPais: number;

  @Column("nvarchar", { name: "Destino", nullable: true, length: 50 })
  @Field({nullable: true})
  destino: string | null;

  @Column("nvarchar", { name: "Contenedores", nullable: true, length: 50 })
  @Field({nullable: true})
  contenedores: string | null;

  @Column("float", { name: "PesoBruto", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  pesoBruto: number | null;

  @Column("float", { name: "PesoNeto", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  pesoNeto: number | null;

  @Column("float", { name: "CantidadEmbalaje", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  cantidadEmbalaje: number | null;

  @Column("float", { name: "Cantidad", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  cantidad: number | null;

  @Column("int", { name: "Codigo", nullable: true })
  @Field({nullable: true})
  idCodigo: number | null;

  @Column("nvarchar", { name: "Descripcion", nullable: true, length: 200 })
  @Field({nullable: true})
  descripcion: string | null;

  @Column("float", { name: "ValorContratacion", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  valorContratacion: number | null;

  @Column("float", {
    name: "GastoAlmacenOrigen",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  gastoAlmacenOrigen: number | null;

  @Column("float", { name: "GastoTranspOrigen", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  gastoTranspOrigen: number | null;

  @Column("float", { name: "GastoAduanaOrigen", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  gastoAduanaOrigen: number | null;

  @Column("float", {
    name: "GastoManipulacionOrigen",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  gastoManipulacionOrigen: number | null;

  @Column("float", { name: "OtrosGastosOrigen", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  otrosGastosOrigen: number | null;

  @Column({ name: "TotalGastoOrigen", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  totalGastoOrigen: number | null;

  @Column("float", {
    name: "RecargoContratacion",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  recargoContratacion: number | null;

  @Column("float", {
    name: "DescuentoContratacion",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  descuentoContratacion: number | null;

  @Column({
    name: "TotalRecDescContrato",
    nullable: true,
    precision: 53, 
    insert: false, 
    update: false
  })
  @Field(() => Float,{nullable: true})
  totalRecDescContrato: number | null;

  @Column({ name: "TotalAdquisicion", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  totalAdquisicion: number | null;

  @Column("float", { name: "DifCambioMoneda", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  difCambioMoneda: number | null;

  @Column("float", {
    name: "TasaCambioContratacion",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  tasaCambioContratacion: number | null;

  @Column({ name: "ValorMercancia", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  valorMercancia: number | null;

  @Column("float", { name: "TarifaFlete", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  tarifaFlete: number | null;

  @Column("float", { name: "RecargoFlete", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  recargoFlete: number | null;

  @Column("float", { name: "DescuentoFlete", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  descuentoFlete: number | null;

  @Column({ name: "TotalFlete", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  totalFlete: number | null;

  @Column({ name: "CostoFleteUSD", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  costoFleteUsd: number | null;

  @Column("float", { name: "Seguro", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  seguro: number | null;

  @Column({ name: "TasaSeguro", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  tasaSeguro: number | null;

  @Column({ name: "CostoCIFFleteUSD", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  costoCifFleteUsd: number | null;

  @Column("float", { name: "TasaCambioMN", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  tasaCambioMn: number | null;

  @Column({
    name: "CostoFleteSeguroMN",
    nullable: true,
    precision: 53, 
    insert: false, 
    update: false
  })
  @Field(() => Float,{nullable: true})
  costoFleteSeguroMn: number | null;

  @Column({ name: "FactorConversion", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  factorConversion: number | null;

  @Column("float", { name: "TasaArancelaria", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  tasaArancelaria: number | null;

  @Column({ name: "ValorArancel", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  valorArancel: number | null;

  @Column("float", { name: "GastoManipulacion", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  gastoManipulacion: number | null;

  @Column("float", { name: "GastoDoc", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  gastoDoc: number | null;

  @Column("float", { name: "GastoEmisionBL", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  gastoEmisionBl: number | null;

  @Column("float", {
    name: "GastoMovContenedores",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  gastoMovContenedores: number | null;

  @Column("float", {
    name: "GastoAsistenciaTecn",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  gastoAsistenciaTecn: number | null;

  @Column("float", {
    name: "GastoSeguridadCont",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  gastoSeguridadCont: number | null;

  @Column("float", { name: "GastoFumigacion", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  gastoFumigacion: number | null;

  @Column("float", {
    name: "GastoSupervisiones",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  gastoSupervisiones: number | null;

  @Column("float", {
    name: "GastoFitosanitario",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  gastoFitosanitario: number | null;

  @Column("float", {
    name: "OGastosPortuariosAduanales",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  oGastosPortuariosAduanales: number | null;

  @Column({ name: "GastosImportacion", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  gastosImportacion: number | null;

  @Column("float", { name: "OtrosGastos", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  otrosGastos: number | null;

  @Column({ name: "TotalGastos", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  totalGastos: number | null;

  @Column({ name: "IndicePGasto", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  indicePGasto: number | null;

  @Column("float", { name: "TasaMaxRecargo", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  tasaMaxRecargo: number | null;

  @Column({ name: "MargenComercial", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  margenComercial: number | null;

  @Column("float", {
    name: "TasaImpuestoVentas",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  tasaImpuestoVentas: number | null;

  @Column("float", { name: "TasaContibucion", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  tasaContibucion: number | null;

  @Column("float", {
    name: "TasaImpuetoProducto",
    nullable: true,
    precision: 53,
  })
  @Field(() => Float,{nullable: true})
  tasaImpuetoProducto: number | null;

  @Column({
    name: "TotalImpuestoContrib",
    nullable: true,
    precision: 53, 
    insert: false, 
    update: false
  })
  @Field(() => Float,{nullable: true})
  totalImpuestoContrib: number | null;

  @Column({ name: "PVentaImportador", nullable: true, precision: 53, insert: false, update: false })
  @Field(() => Float,{nullable: true})
  pVentaImportador: number | null;

  @Column("datetime", {
    name: "Fecha",
    nullable: true,
    default: () => "getdate()",
  })
  @Field({nullable: true})
  fecha: Date | null;

  @Column("nvarchar", { name: "Nota", nullable: true })
  @Field({nullable: true})
  nota: string | null;

  @Column("int", { name: "Elaborado", nullable: true })
  @Field(() => Int,{nullable: true})
  elaborado: number | null;

  @Column("int", { name: "Aprobado", nullable: true })
  @Field(() => Int,{nullable: true})
  aprobado: number | null;

  @Field(() => BasesCMarco, {nullable: true})
  @ManyToOne(() => BasesCMarco, (basesCMarco) => basesCMarco.fichaCostoResumen)
  @JoinColumn([{ name: "IdBaseCMarco", referencedColumnName: "idBaseCMarco" }])
  baseCMarco: BasesCMarco;

  @Field(() => Monedas, {nullable: true})
  @ManyToOne(() => Monedas, (monedas) => monedas.fichaCostoResumen)
  @JoinColumn([{ name: "IdMoneda", referencedColumnName: "idMoneda" }])
  moneda: Monedas;

  @Field(() => FormasPago, {nullable: true})
  @ManyToOne(() => FormasPago, (formasPago) => formasPago.fichaCostoResumen)
  @JoinColumn([{ name: "IdFormaPago", referencedColumnName: "idFormaPago" }])
  formaPago: FormasPago;

  @Field(() => Incoterm, {nullable: true})
  @ManyToOne(() => Incoterm, (incoterm) => incoterm.fichaCostoResumen)
  @JoinColumn([{ name: "IdIncoterm", referencedColumnName: "idIncoterm" }])
  incoterm: Incoterm;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos, (puertos) => puertos.fichaCostoResumen)
  @JoinColumn([{ name: "IdPuerto", referencedColumnName: "idPuerto" }])
  puerto: Puertos;

  @Field(() => Embalajes, {nullable: true})
  @ManyToOne(() => Embalajes, (embalajes) => embalajes.fichaCostoResumen)
  @JoinColumn([{ name: "IdEmbalaje", referencedColumnName: "idEmbalaje" }])
  embalaje: Embalajes;

  @Field(() => [Contratos], {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.fichaCostoResumen)
  contratos: Contratos[];

  @Field(() => Proveedores, {nullable: true})
  @ManyToOne(() => Proveedores, (proveedor) => proveedor.fichaCostoResumen)
  @JoinColumn([{ name: "IdProveedor", referencedColumnName: "codigo" }])
  proveedor: Proveedores;

  @Field(() => Paises, {nullable: true})
  @ManyToOne(() => Paises, (paises) => paises.fichaCostoResumen)
  @JoinColumn([{ name: "IdPais", referencedColumnName: "pais" }])
  pais: Paises;

  @Field(() => CodigosParaLaVenta, {nullable: true})
  @ManyToOne(() => CodigosParaLaVenta, (codigo) => codigo.fichaCostoResumen)
  @JoinColumn([{ name: "Codigo", referencedColumnName: "idCodigo" }])
  codigo: CodigosParaLaVenta;
}
