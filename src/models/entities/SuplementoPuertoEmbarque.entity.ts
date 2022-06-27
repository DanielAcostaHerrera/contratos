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
import { Puertos } from "./Puertos.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_SuplementoPuertoEmbarque", ["idSuplementoPuertoEmbarque"], {
  unique: true,
})
@Entity("SuplementoPuertoEmbarque", { schema: "dbo" })
export class SuplementoPuertoEmbarque {
  @PrimaryGeneratedColumn({ type: "int", name: "IdSuplementoPuertoEmbarque" })
  @Field(() => Int)
  idSuplementoPuertoEmbarque: number;

  @Column("int", { name: "IdSuplementoResumen" })
  @Field(() => Int)
  idSuplementoResumen: number;

  @Column("int", { name: "IdEmbarque" })
  @Field(() => Int)
  idEmbarque: number;

  @Column("int", { name: "IdPuertoEmbarque" })
  @Field(() => Int)
  idPuertoEmbarque: number;

  @Column("int", { name: "IdPuertoOrigen" })
  @Field(() => Int)
  idPuertoOrigen: number;

  @Column("int", { name: "IdPuertoDestino" })
  @Field(() => Int)
  idPuertoDestino: number;

  @Field(() => SuplementoResumen, {nullable: true})
  @ManyToOne(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.suplementoPuertoEmbarques)
  @JoinColumn([{name: "IdSuplementoResumen",referencedColumnName: "idSuplementoResumen",}])
  suplementoResumen: SuplementoResumen;

  @Field(() => Embarques, {nullable: true})
  @ManyToOne(() => Embarques,(embarques) => embarques.suplementoPuertoEmbarques)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarque: Embarques;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos,(puertos) => puertos.suplementoPuertoEmbarquesOrigen)
  @JoinColumn([{ name: "IdPuertoOrigen", referencedColumnName: "idPuerto" }])
  puertoOrigen: Puertos;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos,(puertos) => puertos.suplementoPuertoEmbarquesDestino)
  @JoinColumn([{ name: "IdPuertoDestino", referencedColumnName: "idPuerto" }])
  puertoDestino: Puertos;
}
