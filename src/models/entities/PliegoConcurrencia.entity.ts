import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SolicitudOfertas } from "./SolicitudOfertas.entity";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_PliegoConcurrencia", ["idPliego"], { unique: true })
@Entity("PliegoConcurrencia", { schema: "CONTRATO.dbo" })
export class PliegoConcurrencia {
  @PrimaryGeneratedColumn({ type: "int", name: "IdPliego" })
  @Field(() => Int)
  idPliego: number;

  @Column("int", { name: "IdOferta", nullable: true })
  @Field(() => Int,{nullable: true})
  idOferta: number | null;

  @Field(() => SolicitudOfertas, {nullable: true})
  @ManyToOne(() => SolicitudOfertas,(solicitudOfertas) => solicitudOfertas.pliegoConcurrencias)
  @JoinColumn([{ name: "IdOferta", referencedColumnName: "idOferta" }])
  oferta: SolicitudOfertas;

  @Field(() => [PliegoConcurrenciaResumen], {nullable: true})
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.pliegoConcurrencia)
  pliegoConcurrenciaResumen: PliegoConcurrenciaResumen[];
}
