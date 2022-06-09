
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BasesGenerales } from '../../models/entities/BasesGenerales.entity';
import { Contratos } from '../../models/entities/Contratos.entity';
import { SolicitudOfertasProveedor } from '../../models/entities/SolicitudOfertasProveedor.entity';
import { PliegoConcurrenciaResumen } from '../../models/entities/PliegoConcurrenciaResumen.entity';
import { NegociacionResumen } from '../../models/entities/NegociacionResumen.entity';
import { FichaCompraResumen } from '../../models/entities/FichaCompraResumen.entity';
import { FichaCostoResumen } from '../../models/entities/FichaCostoResumen.entity';
import { ContratoMarco } from '../../models/entities/ContratoMarco.entity';
import { NegociacionProveedores } from "../../models/entities/NegociacionProveedores.entity";

@ObjectType()
@Index("Actualizacion", ["actualizacion"], {})
@Index("CODIGO", ["codigo"], { unique: true })
@Index("Compañia", ["compaIa"], { unique: true })
@Index("IDOrgano", ["idOrgano"], {})
@Index("IX_Proveedores_DomicilioSucursal", ["domicilioSucursal"], {})
@Index("IX_Proveedores_Siglas", ["siglas"], {})
@Index("Organos del EstadoProveedores", ["idOrgano"], {})
@Index("País", ["pais"], {})
@Index("PaisesProveedores", ["pais"], {})
@Index("PK_Proveedores", ["codigo"], { unique: true })
@Entity("Proveedores", { schema: "Mercurio.dbo" })
export class Proveedores {
  @Column("smallint", {
    primary: true,
    name: "CODIGO",
    default: () => "(9999)",
  })
  @Field(() => Int)
  codigo: number;

  @Column("nvarchar", { name: "Compañia", length: 250 })
  @Field()
  compaIa: string;

  @Column("nvarchar", { name: "Siglas", nullable: true, length: 50 })
  @Field({nullable: true})
  siglas: string | null;

  @Column("nvarchar", { name: "Domicilio", nullable: true, length: 200 })
  @Field({nullable: true})
  domicilio: string | null;

  @Column("nvarchar", {
    name: "DomicilioSucursal",
    nullable: true,
    length: 100,
  })
  @Field({nullable: true})
  domicilioSucursal: string | null;

  @Column("nvarchar", { name: "Ciudad", nullable: true, length: 200 })
  @Field({nullable: true})
  ciudad: string | null;

  @Column("nvarchar", { name: "CodigoPostal", nullable: true, length: 10 })
  @Field({nullable: true})
  codigoPostal: string | null;

  @Column("nvarchar", { name: "Telefono", nullable: true, length: 40 })
  @Field({nullable: true})
  telefono: string | null;

  @Column("nvarchar", { name: "Fax", nullable: true, length: 50 })
  @Field({nullable: true})
  fax: string | null;

  @Column("nvarchar", { name: "E_mail", nullable: true, length: 50 })
  @Field({nullable: true})
  eMail: string | null;

  @Column("nvarchar", { name: "Representante", nullable: true, length: 100 })
  @Field({nullable: true})
  representante: string | null;

  @Column("nvarchar", { name: "Cargo", nullable: true, length: 100 })
  @Field({nullable: true})
  cargo: string | null;

  @Column("int", { name: "PAIS" })
  @Field(() => Int)
  pais: number;

  @Column("int", { name: "IDOrgano", nullable: true })
  @Field(() => Int,{nullable: true})
  idOrgano: number | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  @Field()
  activo: boolean;

  @Column("nvarchar", {
    name: "CuentaUSD",
    nullable: true,
    length: 20,
    default: () => "(0)",
  })
  @Field({nullable: true})
  cuentaUsd: string | null;

  @Column("nvarchar", { name: "CodAgenciaUSD", nullable: true, length: 50 })
  @Field({nullable: true})
  codAgenciaUsd: string | null;

  @Column("nvarchar", {
    name: "AgenciaUSD",
    nullable: true,
    length: 100,
    default: () => "(0)",
  })
  @Field({nullable: true})
  agenciaUsd: string | null;

  @Column("nvarchar", { name: "DirAgenciaUSD", nullable: true, length: 100 })
  @Field({nullable: true})
  dirAgenciaUsd: string | null;

  @Column("nvarchar", { name: "TelefAgenciaUSD", nullable: true, length: 10 })
  @Field({nullable: true})
  telefAgenciaUsd: string | null;

  @Column("nvarchar", { name: "FaxAgenciaUSD", nullable: true, length: 250 })
  @Field({nullable: true})
  faxAgenciaUsd: string | null;

  @Column("nvarchar", { name: "CuentaMN", nullable: true, length: 20 })
  @Field({nullable: true})
  cuentaMn: string | null;

  @Column("nvarchar", {
    name: "CodAgenciaMN",
    nullable: true,
    length: 50,
    default: () => "(0)",
  })
  @Field({nullable: true})
  codAgenciaMn: string | null;

  @Column("nvarchar", {
    name: "AgenciaMN",
    nullable: true,
    length: 100,
    default: () => "(0)",
  })
  @Field({nullable: true})
  agenciaMn: string | null;

  @Column("nvarchar", {
    name: "DirAgenciaMN",
    nullable: true,
    length: 100,
    default: () => "(0)",
  })
  @Field({nullable: true})
  dirAgenciaMn: string | null;

  @Column("nvarchar", {
    name: "TelefAgenciaMN",
    nullable: true,
    length: 10,
    default: () => "(0)",
  })
  @Field({nullable: true})
  telefAgenciaMn: string | null;

  @Column("nvarchar", {
    name: "FaxAgenciaMN",
    nullable: true,
    length: 10,
    default: () => "(0)",
  })
  @Field({nullable: true})
  faxAgenciaMn: string | null;

  @Column("datetime", { name: "Actualizacion", default: () => "getdate()" })
  @Field()
  actualizacion: Date;

  @Column("nvarchar", { name: "CodigoEnt", nullable: true, length: 12 })
  @Field({nullable: true})
  codigoEnt: string | null;

  @Column("nvarchar", { name: "CodigoMINCEX", nullable: true, length: 50 })
  @Field({nullable: true})
  codigoMincex: string | null;

  @Column("nvarchar", { name: "Lic_CComercio", nullable: true, length: 11 })
  @Field({nullable: true})
  licCComercio: string | null;

  @Column("datetime", { name: "FechaAct_Lic", nullable: true })
  @Field({nullable: true})
  fechaActLic: Date | null;

  @Column("datetime", { name: "FechaVen_Lic", nullable: true })
  @Field({nullable: true})
  fechaVenLic: Date | null;

  @Column("bit", {
    name: "PRepresentativo",
    nullable: true,
    default: () => "(0)",
  })
  @Field({nullable: true})
  pRepresentativo: boolean | null;

  @Column("bit", { name: "PFabricante", nullable: true, default: () => "(0)" })
  @Field({nullable: true})
  pFabricante: boolean | null;

  @Column("bit", { name: "Cliente", default: () => "(0)" })
  @Field()
  cliente: boolean;

  @Column("bit", { name: "Solicitud", default: () => "(0)" })
  @Field()
  solicitud: boolean;

  @Column("bit", { name: "Importadora", default: () => "(0)" })
  @Field()
  importadora: boolean;

  @Column("decimal", {
    name: "IndiceMN",
    nullable: true,
    precision: 7,
    scale: 4,
    default: () => "(1.13)",
  })
  @Field(() => Float,{nullable: true})
  indiceMn: number | null;

  @Column("decimal", {
    name: "IndiceCUC",
    nullable: true,
    precision: 7,
    scale: 4,
    default: () => "(1.08)",
  })
  @Field(() => Float,{nullable: true})
  indiceCuc: number | null;

  @Column("nvarchar", { name: "User", nullable: true, length: 200 })
  @Field({nullable: true})
  user: string | null;

  @Column("int", { name: "IdCategoria", nullable: true, default: () => "(0)" })
  @Field(() => Int,{nullable: true})
  idCategoria: number | null;

  @Column("timestamp", { name: "upsize_ts", nullable: true })
  @Field({nullable: true})
  upsizeTs: Date | null;

  @Column("int", {
    name: "IDCircularAct",
    nullable: true,
    default: () => "[dbo].[AsignaCirc]()",
  })
  @Field(() => Int,{nullable: true})
  idCircularAct: number | null;

  @Column("datetime", {
    name: "FechaAlta",
    nullable: true,
    default: () => "getdate()",
  })
  @Field({nullable: true})
  fechaAlta: Date | null;

  @Field(() => [ContratoMarco], { nullable: true })
  @OneToMany(() => ContratoMarco,(contratoMarco) => contratoMarco.proveedor)
  contratoMarco: ContratoMarco[];

  @Field(() => [BasesGenerales], { nullable: true })
  @OneToMany(() => BasesGenerales,(basesGenerales) => basesGenerales.proveedor)
  basesGenerales: BasesGenerales[];

  @Field(() => [Contratos], { nullable: true })
  @OneToMany(() => Contratos,(contratos) => contratos.pais)
  contratos: Contratos[];

  @Field(() => [SolicitudOfertasProveedor], { nullable: true })
  @OneToMany(() => SolicitudOfertasProveedor,(solicitudOfertasProveedor) => solicitudOfertasProveedor.proveedor)
  solicitudOfertasProveedores: SolicitudOfertasProveedor[];

  @Field(() => [PliegoConcurrenciaResumen], { nullable: true })
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.proveedor)
  pliegoConcurrenciaResumen: PliegoConcurrenciaResumen[];

  @Field(() => [NegociacionProveedores], { nullable: true })
  @OneToMany(() => NegociacionProveedores,(negociacionProveedores) => negociacionProveedores.proveedor)
  negociacionProveedores: NegociacionProveedores[];

  @Field(() => [FichaCompraResumen], { nullable: true })
  @OneToMany(() => FichaCompraResumen,(fichaCompraResumen) => fichaCompraResumen.proveedor)
  fichaCompraResumen: FichaCompraResumen[];

  @Field(() => [FichaCostoResumen], { nullable: true })
  @OneToMany(() => FichaCostoResumen,(fichaCostoResumen) => fichaCostoResumen.proveedor)
  fichaCostoResumen: FichaCostoResumen[];
}
