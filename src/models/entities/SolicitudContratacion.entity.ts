import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NegociacionResumen } from "./NegociacionResumen.entity";
import { Compradores } from "./Compradores.entity";
import { SolicitudOfertas } from "./SolicitudOfertas.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("IX_SolicitudContratacion", ["idNegociacion"], {})
@Index("IX_SolicitudContratacion_Comprador", ["idComprador"], {})
@Index("PK_SolicitudContratacion", ["idSolicitudContrato"], { unique: true })
@Entity("SolicitudContratacion", { schema: "CONTRATO.dbo" })
export class SolicitudContratacion {
  @PrimaryGeneratedColumn({ type: "int", name: "IdSolicitudContrato" })
  @Field(() => Int)
  idSolicitudContrato: number;

  @Column("int", { name: "IdNegociacion" })
  @Field(() => Int)
  idNegociacion: number;

  @Column("int", { name: "Consecutivo" })
  @Field(() => Int)
  consecutivo: number;

  @Column("int", { name: "IdComprador" })
  @Field(() => Int)
  idComprador: number;

  @Column("datetime", { name: "Fecha" })
  @Field()
  fecha: Date;

  @Column("nvarchar", { name: "Nota", nullable: true })
  @Field({nullable: true})
  nota: string | null;

  @Field(() => NegociacionResumen, {nullable: true})
  @ManyToOne(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.solicitudContratacion)
  @JoinColumn([{ name: "IdNegociacion", referencedColumnName: "idNegociacion" }])
  negociacion: NegociacionResumen;

  @Field(() => Compradores, {nullable: true})
  @ManyToOne(() => Compradores,(compradores) => compradores.solicitudContratacion)
  @JoinColumn([{ name: "IdComprador", referencedColumnName: "idComprador" }])
  comprador: Compradores;

  @Field(() => [SolicitudOfertas], {nullable: true})
  @OneToMany(() => SolicitudOfertas,(solicitudOfertas) => solicitudOfertas.solicitudContrato)
  solicitudOfertas: SolicitudOfertas[];
}
