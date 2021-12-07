import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CampanaEtapasContratacion } from "./CampanaEtapasContratacion.entity";

@ObjectType()
@Index("PK_CTO_Campanas", ["idCampana"], { unique: true })
@Entity("Campanas", { schema: "dbo" })
export class Campanas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdCampana" })
  @Field(() => Int)
  idCampana: number;

  @Column("nvarchar", { name: "Campana", length: 100 })
  @Field()
  campana: string;

  @Field(() => [CampanaEtapasContratacion])
  @OneToMany(() => CampanaEtapasContratacion,(campanaEtapasContratacion) => campanaEtapasContratacion.campana)
  campanaEtapasContratacion: CampanaEtapasContratacion[];
}
