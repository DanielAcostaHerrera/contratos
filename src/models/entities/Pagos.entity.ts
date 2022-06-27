import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Embarques } from "./Embarques.entity";
import { FormasPago } from "./FormasPago.entity";
import { PagosAPartirDe } from "./PagosAPartirDe.entity";

@ObjectType()
@Index("PK_Pagos", ["idPago"], { unique: true })
@Entity("Pagos", { schema: "dbo" })
export class Pagos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdPago" })
  @Field(() => Int)
  idPago: number;

  @Column("int", { name: "IdEmbarque" })
  @Field(() => Int)
  idEmbarque: number;

  @Column("int", { name: "IdFormaPago" })
  @Field(() => Int)
  idFormaPago: number;

  @Column("int", { name: "IdPagosAPartirDe" })
  @Field(() => Int)
  idPagosAPartirDe: number;

  @Column("int", { name: "PlazoPago" })
  @Field(() => Int)
  plazoPago: number;

  @Column("float", { name: "Porciento", precision: 53, default: () => "(100)" })
  @Field(() => Float)
  porciento: number;

  @Field(() => Embarques, {nullable: true})
  @ManyToOne(() => Embarques, (embarques) => embarques.pagos)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarques: Embarques;

  @Field(() => FormasPago, {nullable: true})
  @ManyToOne(() => FormasPago, (formasPago) => formasPago.pagos)
  @JoinColumn([{ name: "IdFormaPago", referencedColumnName: "idFormaPago" }])
  formaPago: FormasPago;

  @Field(() => PagosAPartirDe, {nullable: true})
  @ManyToOne(() => PagosAPartirDe, (pagosAPartirDe) => pagosAPartirDe.pagos)
  @JoinColumn([{ name: "IdPagosAPartirDe", referencedColumnName: "idPartir" }])
  pagoAPartirDe: PagosAPartirDe;
}
