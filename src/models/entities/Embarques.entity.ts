import { CompaniasNavieras } from './../../modelsNomgen/entities/CompaniasNavieras.entity';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContratoDesglose } from "./ContratoDesglose.entity";
import { Contratos } from "./Contratos.entity";
import { Ejecutivos } from "./Ejecutivos.entity";
import { FacturaResumen } from "./FacturaResumen.entity";
import { Puertos } from "./Puertos.entity";
import { SuplementoChange } from "./SuplementoChange.entity";
import { SuplementoDesglose } from "./SuplementoDesglose.entity";
import { SuplementoEmbarques } from "./SuplementoEmbarques.entity";
import { SuplementoPagos } from "./SuplementoPagos.entity";

@ObjectType()
@Index("PK_Embarques", ["idEmbarque"], { unique: true })
@Entity("Embarques", { schema: "CONTRATO.dbo" })
export class Embarques {
  @PrimaryGeneratedColumn({ type: "int", name: "IdEmbarque" })
  @Field(() => Int)
  idEmbarque: number;

  @Column("smalldatetime", { name: "FechaEntrega" })
  @Field()
  fechaEntrega: Date;

  @Column("int", { name: "IdContrato" ,nullable: true})
  @Field(() => Int,{nullable: true})
  idContrato: number | null;
  
  @Column("int", { name: "IdEjecutivo",nullable: true})
  @Field(() => Int,{nullable: true})
  idEjecutivo: number | null;

  @Column("int", { name: "Numero" })
  @Field(() => Int)
  numero: number;

  @Column("int", {
    name: "Destino",
    nullable: true,
    default: () => "(100)",
  })
  @Field(() => Int,{nullable: true})
  destino: number | null;

  @Column("real", {
    name: "Descuento",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  @Field(() => Float,{nullable: true})
  descuento: number | null;

  @Column("bit", { name: "Terminado", default: () => "(0)" })
  @Field()
  terminado: boolean;

  @Column("bit", { name: "Cancelado", default: () => "(0)" })
  @Field()
  cancelado: boolean;

  @Column("bit", { name: "PorFirmar", default: () => "(0)" })
  @Field()
  porFirmar: boolean;

  @Column("int", { name: "QtyCnt", default: () => "(1)" })
  @Field(() => Int)
  qtyCnt: number;

  @Column("float", { name: "Flete", default: () => "(0)" })
  @Field(() => Float)
  flete: number;

  @Column("float", { name: "Seguro", default: () => "(0)" })
  @Field(() => Float)
  seguro: number;

  @Column("float", {
    name: "Financiamiento",
    precision: 53,
    default: () => "(0)",
  })
  @Field(() => Float)
  financiamiento: number;

  @Column("nvarchar", { name: "Maquina", nullable: true, length: 100 })
  @Field({nullable: true})
  maquina: string | null;

  @Column("int", { name: "EmpNaviera", default: () => "(1)" })
  @Field(() => Int)
  idEmpresaNaviera: number;

  @Column("float", { name: "Inspeccion", default: () => "(0)" })
  @Field(() => Float)
  inspeccion: number;

  @Column("float", { name: "Otros", default: () => "(0)" })
  @Field(() => Float)
  otros: number;

  @Column("int", { name: "C40", default: () => "(0)" })
  @Field(() => Int)
  c40: number;

  @Column("int", { name: "C20", default: () => "(0)" })
  @Field(() => Int)
  c20: number;

  @Column("bit", { name: "ActSCI", default: () => "(0)" })
  @Field()
  actSci: boolean;

  @Field(() => [ContratoDesglose], {nullable: true})
  @OneToMany(() => ContratoDesglose,(contratoDesglose) => contratoDesglose.embarques)
  contratoDesgloses: ContratoDesglose[];

  @Field(() => Contratos, {nullable: true})
  @ManyToOne(() => Contratos, (contratos) => contratos.embarques)
  @JoinColumn([{ name: "IdContrato", referencedColumnName: "idContrato" }])
  contratos: Contratos;

  @Field(() => Ejecutivos, {nullable: true})
  @ManyToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.embarques)
  @JoinColumn([{ name: "IdEjecutivo", referencedColumnName: "idEjecutivo" }])
  ejecutivos: Ejecutivos;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos, (puertos) => puertos.embarques)
  @JoinColumn([{ name: "Destino", referencedColumnName: "idPuerto" }])
  puertoDestino: Puertos;

  @Field(() => [FacturaResumen], {nullable: true})
  @OneToMany(() => FacturaResumen,(facturaResumen) => facturaResumen.embarques)
  facturaResumen: FacturaResumen[];

  @Field(() => [SuplementoChange], {nullable: true})
  @OneToMany(() => SuplementoChange,(suplementoChange) => suplementoChange.embarques)
  suplementoChanges: SuplementoChange[];

  @Field(() => [SuplementoDesglose], {nullable: true})
  @OneToMany(() => SuplementoDesglose,(suplementoDesglose) => suplementoDesglose.embarques)
  suplementoDesgloses: SuplementoDesglose[];

  @Field(() => [SuplementoEmbarques], {nullable: true})
  @OneToMany(() => SuplementoEmbarques,(suplementoEmbarques) => suplementoEmbarques.embarques)
  suplementoEmbarques: SuplementoEmbarques[];

  @Field(() => [SuplementoPagos], {nullable: true})
  @OneToMany(() => SuplementoPagos,(suplementoPagos) => suplementoPagos.embarques)
  suplementoPagos: SuplementoPagos[];

  @Field(() => CompaniasNavieras, {nullable: true})
  @ManyToOne(() => CompaniasNavieras, (companiasNavieras) => companiasNavieras.embarques)
  @JoinColumn([{ name: "EmpNaviera", referencedColumnName: "id" }])
  companiaNaviera: CompaniasNavieras;
}
