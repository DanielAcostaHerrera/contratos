import { AgenciasAseguradoras } from './../../modelsNomgen/entities/AgenciasAseguradoras.entity';
import { CompaniasNavieras } from './../../modelsNomgen/entities/CompaniasNavieras.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesGenerales } from "./BasesGenerales.entity";
import { Monedas } from "./Monedas.entity";
import { FormasEntrega } from "./FormasEntrega.entity";
import { NegociacionResumen } from "./NegociacionResumen.entity";
import { Ejecutivos } from "./Ejecutivos.entity";
import { DocumentacionContrato } from "./DocumentacionContrato.entity";
import { Embarques } from "./Embarques.entity";
import { FacturaResumen } from "./FacturaResumen.entity";
import { SuplementoEmbarques } from "./SuplementoEmbarques.entity";
import { SuplementoResumen } from "./SuplementoResumen.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { ContratoClausulas } from "./ContratoClausulas.entity";
import { Incoterm } from './Incoterm.entity';
import { ContratoMarco } from './ContratoMarco.entity';
import { SuplementoClausulas } from './SuplementoClausulas.entity';

@ObjectType()
@Index("PK_Contratos", ["idContrato"], { unique: true })
@Entity("Contratos", { schema: "CONTRATO.dbo" })
export class Contratos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdContrato" })
  @Field(() => Int)
  idContrato: number;

  @Column("int", { name: "IdBasesGenerales" })
  @Field(() => Int)
  idBasesGenerales: number;

  @Column("int", { name: "IdCMarco", nullable: true })
  @Field(() => Int, {nullable: true})
  idCMarco?: number;

  @Column("int", { name: "IdMoneda" })
  @Field(() => Int)
  idMoneda: number;

  @Column("int", { name: "IdFormaEntrega" })
  @Field(() => Int)
  idFormaEntrega: number;

  @Column("int", { name: "IdNegociacion" })
  @Field(() => Int)
  idNegociacion: number;

  @Column("int", { name: "IdEjecutivo" })
  @Field(() => Int)
  idEjecutivo: number;

  @Column("int", { name: "RealizadoPor" })
  @Field(() => Int)
  realizadoPor: number;

  @Column("int", { name: "FirmadoPor" })
  @Field(() => Int)
  firmadoPor: number;

  @Column("int", { name: "ModificadoPor" })
  @Field(() => Int)
  modificadoPor: number;

  @Column("nvarchar", { name: "LugarFirma", nullable: true, length: 50 })
  @Field({nullable: true})
  lugarFirma: string | null;

  @Column("int", { name: "Consecutivo" })
  @Field(() => Int)
  consecutivo: number;

  @Column("int", { name: "IdIncoterm" })
  @Field(() => Int)
  idIncoterm: number;

  @Column("bit", { name: "Cancelado", default: () => "(0)" })
  @Field()
  cancelado: boolean;

  @Column("bit", { name: "Terminado", default: () => "(0)" })
  @Field()
  terminado: boolean;

  @Column("bit", { name: "Modificado", default: () => "(0)" })
  @Field()
  modificado: boolean;

  @Column("nvarchar", {name: "EmpresaSeguro",nullable: true,})
  @Field({nullable: true})
  empresaSeguro: string | null;

  @Column("int", {
    name: "EmpresaNaviera",
    nullable: true,
    default: () => "(1)",
  })
  @Field(() => Int,{nullable: true})
  idEmpresaNaviera: number | null;

  @Column("nvarchar", { name: "LugarEntrega", nullable: true, length: 50 })
  @Field({nullable: true})
  lugarEntrega: string | null;

  @Column("ntext", { name: "Notas", nullable: true })
  @Field({nullable: true})
  notas: string | null;

  @Column("bit", { name: "PermitirEmbarquesParciales", default: () => "(0)" })
  @Field()
  permitirEmbarquesParciales: boolean;

  @Column("tinyint", { name: "CantidadEP", nullable: true })
  @Field(() => Int,{nullable: true})
  cantidadEp: number | null;

  @Column("bit", { name: "PermitirEntregas", default: () => "(0)" })
  @Field()
  permitirEntregas: boolean;

  @Column("bit", { name: "PermitirTrasbordos", default: () => "(0)" })
  @Field()
  permitirTrasbordos: boolean;

  @Column("ntext", { name: "Producto", nullable: true })
  @Field({nullable: true})
  producto: string | null;

  @Column("smallint", { name: "NoEntregasParciales", nullable: true })
  @Field(() => Int,{nullable: true})
  noEntregasParciales: number | null;

  @Column("smalldatetime", { name: "FechaElaboracion", default: () => "getdate()" })
  @Field()
  fechaElaboracion: Date;

  @Column("smalldatetime", { name: "FechaInicial", nullable: true })
  @Field({nullable: true})
  fechaInicial: Date | null;

  @Column("smalldatetime", { name: "FechaFinal", nullable: true })
  @Field({nullable: true})
  fechaFinal: Date | null;

  @Column("smalldatetime", { name: "FechaFirma", nullable: true })
  @Field({nullable: true})
  fechaFirma: Date | null;

  @Column("smalldatetime", { name: "FechaRecepcion", nullable: true })
  @Field({nullable: true})
  fechaRecepcion: Date | null;

  @Column("smalldatetime", { name: "FechaArribo", nullable: true })
  @Field({nullable: true})
  fechaArribo: Date | null;

  @Column("datetime", { name: "FechaPFirma", nullable: true })
  @Field({nullable: true})
  fechaPFirma: Date | null;

  @Column("float", {
    name: "Financiamiento",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  financiamiento: number;

  @Column("float", { name: "TasaMoneda", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  tasaMoneda: number;

  @Column("datetime", {
    name: "FechaTasa",
    nullable: true,
    default: () => "getdate()",
  })
  @Field({nullable: true})
  fechaTasa: Date | null;

  @Column("float", { name: "PFin", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  pFin: number;

  @Column("float", { name: "GastosLogisticos", precision: 53 })
  @Field(() => Float)
  gastosLogisticos: number;

  @Field(() => [ContratoClausulas], {nullable: true})
  @OneToMany(() => ContratoClausulas,(contratoClausulas) => contratoClausulas.contratos)
  contratoClausulas: ContratoClausulas[];

  @Field(() => BasesGenerales, {nullable: true})
  @ManyToOne(() => BasesGenerales, (basesGenerales) => basesGenerales.contratos)
  @JoinColumn([{ name: "IdBasesGenerales", referencedColumnName: "idBasesGenerales" }])
  basesGenerales: BasesGenerales;

  @Field(() => ContratoMarco, {nullable: true})
  @ManyToOne(() => ContratoMarco, (contratoMarco) => contratoMarco.contratos)
  @JoinColumn([{ name: "IdCMarco", referencedColumnName: "idCMarco" }])
  contratoMarco: ContratoMarco;

  @Field(() => Monedas, {nullable: true})
  @ManyToOne(() => Monedas, (monedas) => monedas.contratos)
  @JoinColumn([{ name: "IdMoneda", referencedColumnName: "idMoneda" }])
  moneda: Monedas;

  @Field(() => FormasEntrega, {nullable: true})
  @ManyToOne(() => FormasEntrega, (formasEntrega) => formasEntrega.contratos)
  @JoinColumn([{ name: "IdFormaEntrega", referencedColumnName: "idFormaEntrega" }])
  formaEntrega: FormasEntrega;

  @Field(() => NegociacionResumen, {nullable: true})
  @ManyToOne(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.contratos)
  @JoinColumn([{ name: "IdNegociacion", referencedColumnName: "idNegociacion" }])
  negociacionResumen: NegociacionResumen;

  @Field(() => Ejecutivos, {nullable: true})
  @ManyToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.contratos)
  @JoinColumn([{ name: "IdEjecutivo", referencedColumnName: "idEjecutivo" }])
  ejecutivo: Ejecutivos;

  @Field(() => Ejecutivos, {nullable: true})
  @ManyToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.contratosRealiza)
  @JoinColumn([{ name: "RealizadoPor", referencedColumnName: "idEjecutivo" }])
  ejecutivoRealiza: Ejecutivos;

  @Field(() => Ejecutivos, {nullable: true})
  @ManyToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.contratosFirma)
  @JoinColumn([{ name: "FirmadoPor", referencedColumnName: "idEjecutivo" }])
  ejecutivoFirma: Ejecutivos;

  @Field(() => Ejecutivos, {nullable: true})
  @ManyToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.contratosModifica)
  @JoinColumn([{ name: "ModificadoPor", referencedColumnName: "idEjecutivo" }])
  ejecutivoModifica: Ejecutivos;

  @Field(() => [DocumentacionContrato], {nullable: true})
  @OneToMany(() => DocumentacionContrato,(documentacionContrato) => documentacionContrato.contratos)
  documentacionContratos: DocumentacionContrato[];

  @Field(() => [Embarques], {nullable: true})
  @OneToMany(() => Embarques, (embarques) => embarques.contratos)
  embarques: Embarques[];

  @Field(() => [FacturaResumen], {nullable: true})
  @OneToMany(() => FacturaResumen,(facturaResumen) => facturaResumen.contratos)
  facturaResumen: FacturaResumen[];

  @Field(() => [SuplementoEmbarques], {nullable: true})
  @OneToMany(() => SuplementoEmbarques,(suplementoEmbarques) => suplementoEmbarques.contrato)
  suplementoEmbarques: SuplementoEmbarques[];

  @Field(() => [SuplementoResumen], {nullable: true})
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.contrato)
  suplementoResumen: SuplementoResumen[];

  @Field(() => [SuplementoClausulas], {nullable: true})
  @OneToMany(() => SuplementoClausulas,(suplementoClausulas) => suplementoClausulas.contrato)
  suplementoClausulas: SuplementoClausulas[];

  @Field(() => CompaniasNavieras, {nullable: true})
  @ManyToOne(() => CompaniasNavieras, (companiasNavieras) => companiasNavieras.contratos)
  @JoinColumn([{ name: "EmpresaNaviera", referencedColumnName: "id" }])
  companiaNaviera: CompaniasNavieras;

  @Field(() => Incoterm, {nullable: true})
  @ManyToOne(() => Incoterm, (incoterm) => incoterm.contratos)
  @JoinColumn([{ name: "IdIncoterm", referencedColumnName: "idIncoterm" }])
  incoterm: Incoterm;
}
