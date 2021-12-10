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
import { FormasPago } from "./FormasPago.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_SuplementoPagos", ["idSuplementoPagos"], { unique: true })
@Entity("SuplementoPagos", { schema: "dbo" })
export class SuplementoPagos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdSuplementoPagos" })
  @Field(() => Int)
  idSuplementoPagos: number;

  @Column("int", { name: "IdSuplementoResumen" })
  @Field(() => Int)
  idSuplementoResumen: number;

  @Column("int", { name: "IdEmbarque" })
  @Field(() => Int)
  idEmbarque: number;

  @Column("int", { name: "IdFormaPago" })
  @Field(() => Int)
  idFormaPago: number;

  @Column("smallint", { name: "PlazoPago" })
  @Field(() => Int)
  plazoPago: number;

  @Column("tinyint", { name: "APartirDe" })
  @Field(() => Int)
  aPartirDe: number;

  @Column("float", { name: "Porciento", precision: 53 })
  @Field(() => Float)
  porciento: number;

  @Field(() => SuplementoResumen)
  @ManyToOne(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.suplementoPagos)
  @JoinColumn([{name: "IdSuplementoResumen",referencedColumnName: "idSuplementoResumen"}])
  suplementoResumen: SuplementoResumen;

  @Field(() => Embarques)
  @ManyToOne(() => Embarques, (embarques) => embarques.suplementoPagos)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarques: Embarques;

  @Field(() => FormasPago)
  @ManyToOne(() => FormasPago, (formasPago) => formasPago.suplementoPagos)
  @JoinColumn([{ name: "IdFormaPago", referencedColumnName: "idFormaPago" }])
  formasPago: FormasPago;
}
