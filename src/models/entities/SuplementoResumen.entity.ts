import { AgenciasAseguradoras } from './../../modelsNomgen/entities/AgenciasAseguradoras.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuplementoChange } from "./SuplementoChange.entity";
import { SuplementoClausulas } from "./SuplementoClausulas.entity";
import { SuplementoDesglose } from "./SuplementoDesglose.entity";
import { SuplementoEmbarques } from "./SuplementoEmbarques.entity";
import { SuplementoPagos } from "./SuplementoPagos.entity";
import { Contratos } from "./Contratos.entity";
import { Puertos } from "./Puertos.entity";
import { Ejecutivos } from "./Ejecutivos.entity";
import { Monedas } from "./Monedas.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { CompaniasNavieras } from '../../modelsNomgen/entities/CompaniasNavieras.entity';

@ObjectType()
@Index("PK_SuplementoResumen", ["idSuplementoResumen"], { unique: true })
@Entity("SuplementoResumen", { schema: "CONTRATO.dbo" })
export class SuplementoResumen {
  @PrimaryGeneratedColumn({ type: "int", name: "IdSuplementoResumen" })
  @Field(() => Int)
  idSuplementoResumen: number;

  @Column("int", { name: "IdContrato" })
  @Field(() => Int)
  idContrato: number;

  @Column("int", { name: "IdPuertoOrigen" })
  @Field(() => Int)
  idPuertoOrigen: number;

  @Column("int", { name: "IdPuertoDestino" })
  @Field(() => Int)
  idPuertoDestino: number;

  @Column("int", { name: "SuplementadoPor" })
  @Field(() => Int)
  suplementadoPor: number;

  @Column("int", { name: "IdEjecutivo" })
  @Field(() => Int)
  idEjecutivo: number;

  @Column("int", { name: "Firma" })
  @Field(() => Int)
  firma: number;

  @Column("int", { name: "IdMoneda" })
  @Field(() => Int)
  idMoneda: number;

  @Column("int", { name: "Consecutivo", default: () => "(0)" })
  @Field(() => Int)
  consecutivo: number;

  @Column("datetime", { name: "FechaSup", default: () => "getdate()" })
  @Field()
  fechaSup: Date;

  @Column("smallint", { name: "Numero" })
  @Field(() => Int)
  numero: number;

  @Column("smalldatetime", { name: "Fecha" })
  @Field()
  fecha: Date;

  @Column("int", { name: "EmpSeguro", nullable: true})
  @Field(() => Int,{nullable: true})
  idEmpSeguro: number | null;

  @Column("int", { name: "EmpNaviera", nullable: true })
  @Field(() => Int,{nullable: true})
  idEmpNaviera: number | null;

  @Column("nvarchar", { name: "LugarEntrega", nullable: true, length: 50 })
  @Field({nullable: true})
  lugarEntrega: string | null;

  @Column("bit", { name: "Cancelado" })
  @Field()
  cancelado: boolean;

  @Column("ntext", { name: "Notas", nullable: true })
  @Field({nullable: true})
  notas: string | null;

  @Column("bit", { name: "PermitirEmbarquesParciales" })
  @Field()
  permitirEmbarquesParciales: boolean;

  @Column("tinyint", { name: "CantidadEP", nullable: true })
  @Field(() => Int,{nullable: true})
  cantidadEp: number | null;

  @Column("bit", { name: "PermitirEntregas" })
  @Field()
  permitirEntregas: boolean;

  @Column("bit", { name: "PermitirTrasbordos" })
  @Field()
  permitirTrasbordos: boolean;

  @Column("ntext", { name: "Producto" })
  @Field()
  producto: string;

  @Column("smallint", { name: "NoEntregasParciales", nullable: true })
  @Field(() => Int,{nullable: true})
  noEntregasParciales: number | null;

  @Column("smalldatetime", { name: "FInicial" })
  @Field()
  fInicial: Date;

  @Column("smalldatetime", { name: "FFinal" })
  @Field()
  fFinal: Date;

  @Column("smalldatetime", { name: "FFirma", nullable: true })
  @Field({nullable: true})
  fFirma: Date | null;

  @Column("smalldatetime", { name: "FRecepcion", nullable: true })
  @Field({nullable: true})
  fRecepcion: Date | null;

  @Column("smalldatetime", { name: "FArribo", nullable: true })
  @Field({nullable: true})
  fArribo: Date | null;

  @Column("float", { name: "Financiamiento", precision: 53 })
  @Field(() => Float)
  financiamiento: number;

  @Column("bit", { name: "TerminadoS", default: () => "(0)" })
  @Field()
  terminadoS: boolean;

  @Column("ntext", { name: "NotaSuple", nullable: true })
  @Field({nullable: true})
  notaSuple: string | null;

  @Column("bit", { name: "CanceladoSup", default: () => "(0)" })
  @Field()
  canceladoSup: boolean;

  @Field(() => [SuplementoChange], {nullable: true})
  @OneToMany(() => SuplementoChange,(suplementoChange) => suplementoChange.suplementoResumen)
  suplementoChanges: SuplementoChange[];

  @Field(() => [SuplementoClausulas], {nullable: true})
  @OneToMany(() => SuplementoClausulas,(suplementoClausulas) => suplementoClausulas.suplementoResumen)
  suplementoClausulas: SuplementoClausulas[];

  @Field(() => [SuplementoDesglose], {nullable: true})
  @OneToMany(() => SuplementoDesglose,(suplementoDesglose) => suplementoDesglose.suplementoResumen)
  suplementoDesgloses: SuplementoDesglose[];

  @Field(() => [SuplementoEmbarques], {nullable: true})
  @OneToMany(() => SuplementoEmbarques,(suplementoEmbarques) => suplementoEmbarques.suplementoResumen)
  suplementoEmbarques: SuplementoEmbarques[];

  @Field(() => [SuplementoPagos], {nullable: true})
  @OneToMany(() => SuplementoPagos,(suplementoPagos) => suplementoPagos.suplementoResumen)
  suplementoPagos: SuplementoPagos[];
  
  @Field(() => Contratos, {nullable: true})
  @ManyToOne(() => Contratos, (contratos) => contratos.suplementoResumen)
  @JoinColumn([{ name: "IdContrato", referencedColumnName: "idContrato" }])
  contrato: Contratos;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos, (puertos) => puertos.suplementoResumenOrigen)
  @JoinColumn([{ name: "IdPuertoOrigen", referencedColumnName: "idPuerto" }])
  puertoOrigen: Puertos;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos, (puertos) => puertos.suplementoResumenDestino)
  @JoinColumn([{ name: "IdPuertoDestino", referencedColumnName: "idPuerto" }])
  puertoDestino: Puertos;

  @Field(() => Ejecutivos, {nullable: true})
  @ManyToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.suplementoResumenSuplementa)
  @JoinColumn([{ name: "SuplementadoPor", referencedColumnName: "idEjecutivo" }])
  ejecutivoSuplementa: Ejecutivos;

  @Field(() => Ejecutivos, {nullable: true})
  @ManyToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.suplementoResumen)
  @JoinColumn([{ name: "IdEjecutivo", referencedColumnName: "idEjecutivo" }])
  ejecutivo: Ejecutivos;

  @Field(() => Ejecutivos, {nullable: true})
  @ManyToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.suplementoResumenFirma)
  @JoinColumn([{ name: "Firma", referencedColumnName: "idEjecutivo" }])
  ejecutivoFirma: Ejecutivos;

  @Field(() => Monedas, {nullable: true})
  @ManyToOne(() => Monedas, (monedas) => monedas.suplementoResumen)
  @JoinColumn([{ name: "IdMoneda", referencedColumnName: "idMoneda" }])
  moneda: Monedas;


  @Field(() => AgenciasAseguradoras, {nullable: true})
  @ManyToOne(() => AgenciasAseguradoras, (agenciasAseguradoras) => agenciasAseguradoras.suplementoResumen)
  @JoinColumn([{ name: "EmpSeguro", referencedColumnName: "idAgenciaS" }])
  empresaAseguradora: AgenciasAseguradoras;

  @Field(() => CompaniasNavieras, {nullable: true})
  @ManyToOne(() => CompaniasNavieras, (companiasNavieras) => companiasNavieras.suplementoResumen)
  @JoinColumn([{ name: "EmpNaviera", referencedColumnName: "id" }])
  empresaNaviera: CompaniasNavieras;
}
