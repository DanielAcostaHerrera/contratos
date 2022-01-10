import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CampanaEtapasContratacion } from "./CampanaEtapasContratacion.entity";
import { TiemposTravesia } from "./TiemposTravesia.entity";

@ObjectType()
@Index("PK_CTO_EtapasContratacion", ["idEtapa"], { unique: true })
@Index("IX_EtapasContratacion", ["etapa"], { unique: true })
@Entity("EtapasContratacion", { schema: "CONTRATO.dbo" })
export class EtapasContratacion {
  @PrimaryGeneratedColumn({ type: "int", name: "IdEtapa" })
  @Field(() => Int)
  idEtapa: number;

  @Column("nvarchar", { name: "Etapa", length: 200 })
  @Field()
  etapa: string;

  @Column("nvarchar", { name: "Calculos", nullable: true, length: 100 })
  @Field({nullable: true})
  calculos: string | null;

  @Column("int", { name: "TiempoMax", default: () => "(0)" })
  @Field(() => Int)
  tiempoMax: number;

  @Column("int", { name: "TiempoReal", default: () => "(0)" })
  @Field(() => Int)
  tiempoReal: number;

  @Field(() => [CampanaEtapasContratacion], {nullable: true})
  @OneToMany(() => CampanaEtapasContratacion,(campanaEtapasContratacion) => campanaEtapasContratacion.etapaContratacion)
  campanaEtapasContratacion: CampanaEtapasContratacion[];

  @Field(() => [TiemposTravesia], {nullable: true})
  @OneToMany(() => TiemposTravesia,(tiemposTravesia) => tiemposTravesia.etapaContratacion)
  tiemposTravesias: TiemposTravesia[];
}
