import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesCMarcoClausulas } from "./BasesCMarcoClausulas.entity";
import { BasesCMarcoEspecificos } from "./BasesCMarcoEspecificos.entity";
import { Field, Int, Float, ObjectType } from "@nestjs/graphql";
import { Puertos } from "./Puertos.entity";
import { Proformas } from "./Proformas.entity";
import { Compradores } from "./Compradores.entity";
import { FichaCostoResumen } from "./FichaCostoResumen.entity";
import { BasesGenerales } from "./BasesGenerales.entity";
import { Contratos } from "./Contratos.entity";

@ObjectType()
@Index("PK_CTO_BasesCMarco", ["idBaseCMarco"], { unique: true })
@Entity("BasesCMarco", { schema: "dbo" })
export class BasesCMarco {
  @PrimaryGeneratedColumn({ type: "int", name: "IdBaseCMarco" })
  @Field(() => Int)
  idBaseCMarco: number;

  @Column("int", { name: "IdBasesGenerales", nullable: true })
  @Field(() => Int)
  idBasesGenerales: number | null;

  @Column("int", { name: "IdProveedor", default: () => "(0)" })
  @Field(() => Int)
  idProveedor: number;

  @Column("int", { name: "Consecutivo", default: () => "(0)" })
  @Field(() => Int)
  consecutivo: number;

  @Column("nvarchar", { name: "DirectivaTRD", nullable: true, length: 50 })
  @Field()
  directivaTrd: string | null;

  @Column("nvarchar", { name: "DirectivaGAE", nullable: true, length: 50 })
  @Field()
  directivaGae: string | null;

  @Column("datetime", { name: "Fecha" })
  @Field()
  fecha: Date;

  @Column("int", { name: "IdProforma" })
  @Field(() => Int)
  idProforma: number;

  @Column("nvarchar", { name: "Especificos" })
  @Field()
  especificos: string;

  @Column("smalldatetime", { name: "PeriodoInic" })
  @Field()
  periodoInic: Date;

  @Column("smalldatetime", { name: "PeriodoFin" })
  @Field()
  periodoFin: Date;

  @Column("float", { name: "ImporteTotal", precision: 53 })
  @Field(() => Float)
  importeTotal: number;

  @Column("float", { name: "ImporteFinanciamiento", precision: 53 })
  @Field(() => Float)
  importeFinanciamiento: number;

  @Column("float", { name: "ImporteConFinanciamiento", precision: 53 })
  @Field(() => Float)
  importeConFinanciamiento: number;

  @Column("int", { name: "IdPuerto" })
  @Field(() => Int)
  idPuerto: number;

  @Column("bit", { name: "Aprobado", default: () => "(0)" })
  @Field()
  aprobado: boolean;

  @Column("bit", { name: "Cancelado", default: () => "(0)" })
  @Field()
  cancelado: boolean;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  @Field()
  activo: boolean;

  @Column("datetime", { name: "Actualizado", default: () => "getdate()" })
  @Field()
  actualizado: Date;

  @Column("varchar", {
    name: "ImporteTotalLetras",
    nullable: true,
    length: 512,
  })
  @Field()
  importeTotalLetras: string | null;

  @Column("varchar", {
    name: "ImporteFinanciamientoLetras",
    nullable: true,
    length: 512,
  })
  @Field()
  importeFinanciamientoLetras: string | null;

  @Column("varchar", {
    name: "ImporteTotalFinanciamientoLetras",
    nullable: true,
    length: 512,
  })
  @Field()
  importeTotalFinanciamientoLetras: string | null;

  @Column("smalldatetime", { name: "PeriodoInicV", nullable: true })
  @Field()
  periodoInicV: Date | null;

  @Column("smalldatetime", { name: "PeriodoFinV", nullable: true })
  @Field()
  periodoFinV: Date | null;

  @Column("int", { name: "IdComprador", nullable: true })
  @Field(() => Int)
  idComprador: number | null;

  @Column("nvarchar", { name: "NoCMarco", nullable: true, length: 500 })
  @Field()
  noCMarco: string | null;

  @Column("nvarchar", { name: "NProveedor", nullable: true, length: 500 })
  @Field()
  nProveedor: string | null;

  @Field(() => [BasesCMarcoClausulas], { nullable: true })
  @OneToMany(() => BasesCMarcoClausulas,(basesCMarcoClausulas) => basesCMarcoClausulas.basesCMarco)
  basesCMarcoClausulas: BasesCMarcoClausulas[];

  @Field(() => [BasesCMarcoEspecificos], { nullable: true })
  @OneToMany(() => BasesCMarcoEspecificos,(basesCMarcoEspecificos) => basesCMarcoEspecificos.baseCMarco)
  basesCMarcoEspecificos: BasesCMarcoEspecificos[];

  @Field(() => BasesGenerales, {nullable: true})
  @ManyToOne(() => BasesGenerales, (basesGenerales) => basesGenerales.basesCMarco)
  @JoinColumn([{ name: "IdBasesGenerales", referencedColumnName: "idBasesGenerales" }])
  basesGenerales: BasesGenerales;
  
  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos, (puertos) => puertos.basesCMarco)
  @JoinColumn([{ name: "IdPuerto", referencedColumnName: "idPuerto" }])
  puerto: Puertos;

  @Field(() => Proformas, {nullable: true})
  @ManyToOne(() => Proformas, (proformas) => proformas.basesCMarco)
  @JoinColumn([{ name: "IdProforma", referencedColumnName: "idProforma" }])
  proforma: Proformas;

  @Field(() => Compradores, {nullable: true})
  @ManyToOne(() => Compradores, (compradores) => compradores.basesCMarcos)
  @JoinColumn([{ name: "IdComprador", referencedColumnName: "idComprador" }])
  compradores: Compradores;

  @Field(() => [FichaCostoResumen], {nullable: true})
  @OneToMany(() => FichaCostoResumen,(fichaCostoResumen) => fichaCostoResumen.baseCMarco)
  fichaCostoResumen: FichaCostoResumen[];

  @Field(() => [Contratos], {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.baseCMarco)
  contratos: Contratos[];
}
