import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuplementoResumen } from "./SuplementoResumen.entity";
import { Embarques } from "./Embarques.entity";
import { Contratos } from "./Contratos.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { CompaniasNavieras } from "../../modelsNomgen/entities/CompaniasNavieras.entity";

@ObjectType()
@Index("PK_SuplementoEmbarques", ["idSuplementoEmbarques"], { unique: true })
@Entity("SuplementoEmbarques", { schema: "CONTRATO.dbo" })
export class SuplementoEmbarques {
  @PrimaryGeneratedColumn({ type: "int", name: "IdSuplementoEmbarques" })
  @Field(() => Int)
  idSuplementoEmbarques: number;

  @Column("int", { name: "IdSuplementoResumen" })
  @Field(() => Int)
  idSuplementoResumen: number;

  @Column("int", { name: "IdEmbarque" })
  @Field(() => Int)
  idEmbarque: number;

  @Column("int", { name: "IdContrato" })
  @Field(() => Int)
  idContrato: number;

  @Column("smalldatetime", { name: "FechaEntrega" })
  @Field()
  fechaEntrega: Date;

  @Column("int", { name: "Numero" })
  @Field(() => Int)
  numero: number;

  @Column("float", { name: "Descuento", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  descuento: number | null;

  @Column("bit", { name: "Terminado" })
  @Field()
  terminado: boolean;

  @Column("bit", { name: "Cancelado" })
  @Field()
  cancelado: boolean;

  @Column("bit", { name: "PorFirmar" })
  @Field()
  porFirmar: boolean;

  @Column("int", { name: "QtyCnt" })
  @Field(() => Int)
  qtyCnt: number;

  @Column("float", { name: "Flete", precision: 53 })
  @Field(() => Float)
  flete: number;

  @Column("float", { name: "Seguro", precision: 53 })
  @Field(() => Float)
  seguro: number;

  @Column("float", { name: "Financiamiento", precision: 53 })
  @Field(() => Float)
  financiamiento: number;

  @Column("int", { name: "EmpNaviera" })
  @Field(() => Int)
  idEmpresaNaviera: number;

  @Column("float", { name: "Inspeccion", precision: 53 })
  @Field(() => Float)
  inspeccion: number;

  @Column("float", { name: "Otros", precision: 53 })
  @Field(() => Float)
  otros: number;

  @Column("int", { name: "C40" })
  @Field(() => Int)
  c40: number;

  @Column("int", { name: "C20" })
  @Field(() => Int)
  c20: number;

  @Column("bit", { name: "ActSCI", default: () => "(0)" })
  @Field()
  actSci: boolean;

  @Field(() => SuplementoResumen, {nullable: true})
  @ManyToOne(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.suplementoEmbarques)
  @JoinColumn([{name: "IdSuplementoResumen",referencedColumnName: "idSuplementoResumen"}])
  suplementoResumen: SuplementoResumen;

  @Field(() => Embarques, {nullable: true})
  @ManyToOne(() => Embarques, (embarques) => embarques.suplementoEmbarques)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarques: Embarques;

  @Field(() => Contratos, {nullable: true})
  @ManyToOne(() => Contratos, (contratos) => contratos.suplementoEmbarques)
  @JoinColumn([{ name: "IdContrato", referencedColumnName: "idContrato" }])
  contrato: Contratos;

  @Field(() => CompaniasNavieras, {nullable: true})
  @ManyToOne(() => CompaniasNavieras, (companiasNavieras) => companiasNavieras.suplementoEmbarques)
  @JoinColumn([{ name: "EmpNaviera", referencedColumnName: "id" }])
  companiaNaviera: CompaniasNavieras;
}
