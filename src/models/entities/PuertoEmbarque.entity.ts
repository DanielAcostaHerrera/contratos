import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Embarques } from "./Embarques.entity";
import { Puertos } from "./Puertos.entity";

@ObjectType()
@Index(
  "IX_PuertoEmbarque",
  ["idPuertoDestino", "idPuertoOrigen", "idEmbarque"],
  { unique: true }
)
@Index("PK_PuertoEmbarque", ["idPuertoEmbarque"], { unique: true })
@Entity("PuertoEmbarque", { schema: "dbo" })
export class PuertoEmbarque {
  @PrimaryGeneratedColumn({ type: "int", name: "IdPuertoEmbarque" })
  @Field(() => Int)
  idPuertoEmbarque: number;

  @Column("int", { name: "IdEmbarque" })
  @Field(() => Int)
  idEmbarque: number;

  @Column("int", { name: "IdPuertoOrigen" })
  @Field(() => Int)
  idPuertoOrigen: number;

  @Column("int", { name: "IdPuertoDestino" })
  @Field(() => Int)
  idPuertoDestino: number;

  @Field(() => Embarques, {nullable: true})
  @ManyToOne(() => Embarques, (embarques) => embarques.puertoEmbarques)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarques: Embarques;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos, (puertos) => puertos.puertoEmbarquesOrigen)
  @JoinColumn([{ name: "IdPuertoOrigen", referencedColumnName: "idPuerto" }])
  puertoOrigen: Puertos;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos, (puertos) => puertos.puertoEmbarquesDestino)
  @JoinColumn([{ name: "IdPuertoDestino", referencedColumnName: "idPuerto" }])
  puertoDestino: Puertos;
}
