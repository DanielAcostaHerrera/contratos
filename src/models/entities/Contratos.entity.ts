import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContratoClausulas } from "./ContratoClausulas.entity";
import { BasesGenerales } from "./BasesGenerales.entity";
import { BasesCMarco } from "./BasesCMarco.entity";
import { Puertos } from "./Puertos.entity";
import { Monedas } from "./Monedas.entity";
import { FormasEntrega } from "./FormasEntrega.entity";
import { NegociacionResumen } from "./NegociacionResumen.entity";
import { FichaCostoResumen } from "./FichaCostoResumen.entity";
import { Ejecutivos } from "./Ejecutivos.entity";
import { DocumentacionContrato } from "./DocumentacionContrato.entity";
import { Embarques } from "./Embarques.entity";
import { FacturaResumen } from "./FacturaResumen.entity";
import { FichaCompraResumen } from "./FichaCompraResumen.entity";
import { SuplementoEmbarques } from "./SuplementoEmbarques.entity";
import { SuplementoResumen } from "./SuplementoResumen.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

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

  @Column("int", { name: "IdBaseCMarco" })
  @Field(() => Int)
  idBaseCMarco: number;

  @Column("int", { name: "IdPuertoOrigen" })
  @Field(() => Int)
  idPuertoOrigen: number;

  @Column("int", { name: "IdPuertoDestino" })
  @Field(() => Int)
  idPuertoDestino: number;

  @Column("int", { name: "IdMoneda" })
  @Field(() => Int)
  idMoneda: number;

  @Column("int", { name: "IdFormaEntrega" })
  @Field(() => Int)
  idFormaEntrega: number;

  @Column("int", { name: "IdNegociacion" })
  @Field(() => Int)
  idNegociacion: number;

  @Column("int", { name: "IdFichaCosto" })
  @Field(() => Int)
  idFichaCosto: number;

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
  @Field()
  lugarFirma: string | null;

  @Column("int", { name: "Consecutivo" })
  @Field(() => Int)
  consecutivo: number;

  @Column("int", { name: "CondicionCompra" })
  @Field(() => Int)
  condicionCompra: number;

  @Column("int", { name: "País" })
  @Field(() => Int)
  paS: number;

  @Column("bit", { name: "Cancelado", default: () => "(0)" })
  @Field()
  cancelado: boolean;

  @Column("bit", { name: "Terminado", default: () => "(0)" })
  @Field()
  terminado: boolean;

  @Column("bit", { name: "Modificado", default: () => "(0)" })
  @Field()
  modificado: boolean;

  @Column("int", { name: "Proveedor" })
  @Field(() => Int)
  proveedor: number;

  @Column("nvarchar", {
    name: "EmpresaSeguro",
    nullable: true,
    length: 50,
    default: () => "N'ESICUBA'",
  })
  @Field()
  empresaSeguro: string | null;

  @Column("int", {
    name: "EmpresaNaviera",
    nullable: true,
    default: () => "(1)",
  })
  @Field(() => Int)
  empresaNaviera: number | null;

  @Column("nvarchar", { name: "LugarEntrega", nullable: true, length: 50 })
  @Field()
  lugarEntrega: string | null;

  @Column("ntext", { name: "Notas", nullable: true })
  @Field()
  notas: string | null;

  @Column("bit", { name: "PermitirEmbarquesParciales", default: () => "(0)" })
  @Field()
  permitirEmbarquesParciales: boolean;

  @Column("tinyint", { name: "CantidadEP", nullable: true })
  @Field(() => Int)
  cantidadEp: number | null;

  @Column("bit", { name: "PermitirEntregas", default: () => "(0)" })
  @Field()
  permitirEntregas: boolean;

  @Column("bit", { name: "PermitirTrasbordos", default: () => "(0)" })
  @Field()
  permitirTrasbordos: boolean;

  @Column("ntext", { name: "Producto", nullable: true })
  @Field()
  producto: string | null;

  @Column("smallint", { name: "NoEntregasParciales", nullable: true })
  @Field(() => Int)
  noEntregasParciales: number | null;

  @Column("smalldatetime", { name: "FechaElaboracion" })
  @Field()
  fechaElaboracion: Date;

  @Column("smalldatetime", { name: "FechaInicial", nullable: true })
  @Field()
  fechaInicial: Date | null;

  @Column("smalldatetime", { name: "FechaFinal", nullable: true })
  @Field()
  fechaFinal: Date | null;

  @Column("smalldatetime", { name: "FechaFirma", nullable: true })
  @Field()
  fechaFirma: Date | null;

  @Column("smalldatetime", { name: "FechaRecepcion", nullable: true })
  @Field()
  fechaRecepcion: Date | null;

  @Column("smalldatetime", { name: "FechaArribo", nullable: true })
  @Field()
  fechaArribo: Date | null;

  @Column("datetime", { name: "FechaPFirma", nullable: true })
  @Field()
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
  @Field()
  fechaTasa: Date | null;

  @Column("float", { name: "PFin", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  pFin: number;

  @Field(() => [ContratoClausulas], {nullable: true})
  @OneToMany(() => ContratoClausulas,(contratoClausulas) => contratoClausulas.contratos)
  contratoClausulas: ContratoClausulas[];

  @Field(() => BasesGenerales, {nullable: true})
  @ManyToOne(() => BasesGenerales, (basesGenerales) => basesGenerales.contratos)
  @JoinColumn([{ name: "IdBasesGenerales", referencedColumnName: "idBasesGenerales" }])
  basesGenerales: BasesGenerales;

  @Field(() => BasesCMarco, {nullable: true})
  @ManyToOne(() => BasesCMarco, (basesCMarco) => basesCMarco.contratos)
  @JoinColumn([{ name: "IdBaseCMarco", referencedColumnName: "idBaseCMarco" }])
  baseCMarco: BasesCMarco;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos, (puertos) => puertos.contratosOrigen)
  @JoinColumn([{ name: "IdPuertoOrigen", referencedColumnName: "idPuerto" }])
  puertoOrigen: Puertos;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos, (puertos) => puertos.contratosDestino)
  @JoinColumn([{ name: "IdPuertoDestino", referencedColumnName: "idPuerto" }])
  puertoDestino: Puertos;

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

  @Field(() => FichaCostoResumen, {nullable: true})
  @ManyToOne(() => FichaCostoResumen,(fichaCostoResumen) => fichaCostoResumen.contratos)
  @JoinColumn([{ name: "IdFichaCosto", referencedColumnName: "idFicha" }])
  fichaCostoResumen: FichaCostoResumen;

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

  @Field(() => [FichaCompraResumen], {nullable: true})
  @OneToMany(() => FichaCompraResumen,(fichaCompraResumen) => fichaCompraResumen.contrato)
  fichaCompraResumen: FichaCompraResumen[];

  @Field(() => [SuplementoEmbarques], {nullable: true})
  @OneToMany(() => SuplementoEmbarques,(suplementoEmbarques) => suplementoEmbarques.contrato)
  suplementoEmbarques: SuplementoEmbarques[];

  @Field(() => [SuplementoResumen], {nullable: true})
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.contrato)
  suplementoResumen: SuplementoResumen[];
}
