import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Paises } from "../../modelsMercurio/entities/Paises.entity";
import { EtapasContratacion } from "./EtapasContratacion.entity";

@ObjectType()
@Index("IX_TiemposTravesiaPais", ["idPais"], { unique: true })
@Index("PK_CTO_TiemposTravesia", ["idTiemposTravesia"], { unique: true })
@Entity("TiemposTravesia", { schema: "CONTRATO.dbo" })
export class TiemposTravesia {
  @PrimaryGeneratedColumn({ type: "int", name: "IdTiemposTravesia" })
  @Field(() => Int)
  idTiemposTravesia: number;

  @Column("int", { name: "IdPais" })
  @Field(() => Int)
  idPais: number;

  @Column("int", { name: "IdEtapa" })
  @Field(() => Int)
  idEtapa: number;

  @Column("int", { name: "Tiempo", default: () => "(15)" })
  @Field(() => Int)
  tiempo: number;

  @Field(() => EtapasContratacion, {nullable: true})
  @ManyToOne(() => EtapasContratacion,(etapasContratacion) => etapasContratacion.tiemposTravesias)
  @JoinColumn([{ name: "IdEtapa", referencedColumnName: "idEtapa" }])
  etapaContratacion: EtapasContratacion;

  @Field(() => Paises, {nullable: true})
  @ManyToOne(() => Paises,(pais) => pais.tiemposTravesias)
  @JoinColumn([{ name: "IdPais", referencedColumnName: "pais" }])
  pais: Paises;
}
