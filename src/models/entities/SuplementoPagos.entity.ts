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
import { PagosAPartirDe } from "./PagosAPartirDe.entity";

@ObjectType()
@Index("PK_SuplementoPagos", ["idSuplementoPagos"], { unique: true })
@Entity("SuplementoPagos", { schema: "CONTRATO.dbo" })
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

  @Column("int", { name: "IdPago" })
  @Field(() => Int)
  idPago: number;

  @Column("smallint", { name: "PlazoPago" })
  @Field(() => Int)
  plazoPago: number;

  @Column("int", { name: "APartirDe" })
  @Field(() => Int)
  aPartirDe: number;

  @Column("float", { name: "Porciento", precision: 53 })
  @Field(() => Float)
  porciento: number;

  @Field(() => PagosAPartirDe, {nullable: true})
  @ManyToOne(() => PagosAPartirDe,(pagoAPartirDe) => pagoAPartirDe.suplementoPagos)
  @JoinColumn([{name: "APartirDe",referencedColumnName: "idPartir"}])
  pagoAPartirDe: PagosAPartirDe;

  @Field(() => SuplementoResumen, {nullable: true})
  @ManyToOne(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.suplementoPagos)
  @JoinColumn([{name: "IdSuplementoResumen",referencedColumnName: "idSuplementoResumen"}])
  suplementoResumen: SuplementoResumen;

  @Field(() => Embarques, {nullable: true})
  @ManyToOne(() => Embarques, (embarques) => embarques.suplementoPagos)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarques: Embarques;

  @Field(() => FormasPago, {nullable: true})
  @ManyToOne(() => FormasPago, (formasPago) => formasPago.suplementoPagos)
  @JoinColumn([{ name: "IdFormaPago", referencedColumnName: "idFormaPago" }])
  formasPago: FormasPago;
}
