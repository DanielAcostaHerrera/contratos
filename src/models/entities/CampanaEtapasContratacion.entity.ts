import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Campanas } from "./Campanas.entity";
import { EtapasContratacion } from "./EtapasContratacion.entity";

@ObjectType()
@Index("IX_CampanaEtapasContratacion", ["idCampana", "idEtapa", "idPais"], {
  unique: true,
})
@Index("PK_CTO_CampanaEtapasCont", ["idCampanaEtapas"], { unique: true })
@Entity("CampanaEtapasContratacion", { schema: "CONTRATO.dbo" })
export class CampanaEtapasContratacion {
  @PrimaryGeneratedColumn({ type: "int", name: "IdCampanaEtapas" })
  @Field(() => Int)
  idCampanaEtapas: number;

  @Column("int", { name: "IdCampana" })
  @Field(() => Int)
  idCampana: number;

  @Column("int", { name: "IdEtapa" })
  @Field(() => Int)
  idEtapa: number;

  @Column("int", { name: "IdPais" })
  @Field(() => Int)
  idPais: number;

  @Column("int", { name: "MesDia" })
  @Field(() => Int)
  mesDia: number;

  @Field(() => Campanas, { nullable: true })
  @ManyToOne(() => Campanas, (campanas) => campanas.campanaEtapasContratacion)
  @JoinColumn([{ name: "IdCampana", referencedColumnName: "idCampana" }])
  campana: Campanas;

  @Field(() => EtapasContratacion, { nullable: true })
  @ManyToOne(() => EtapasContratacion,(etapasContratacion) => etapasContratacion.campanaEtapasContratacion)
  @JoinColumn([{ name: "IdEtapa", referencedColumnName: "idEtapa" }])
  etapaContratacion: EtapasContratacion;
}
