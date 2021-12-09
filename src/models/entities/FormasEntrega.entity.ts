import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";

@ObjectType()
@Index("IX_FormasEntrega", ["formaEntrega"], { unique: true })
@Index("PK_FormasEntrega", ["idFormaEntrega"], { unique: true })
@Entity("FormasEntrega", { schema: "dbo" })
export class FormasEntrega {
  @PrimaryGeneratedColumn({ type: "int", name: "IdFormaEntrega" })
  @Field(() => Int)
  idFormaEntrega: number;

  @Column("nvarchar", { name: "FormaEntrega", length: 100 })
  @Field()
  formaEntrega: string;

  @Column("int", { name: "Dias" })
  @Field(() => Int)
  dias: number;

  @Field(() => [PliegoConcurrenciaResumen])
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.formaEntrega)
  pliegoConcurrenciaResumen: PliegoConcurrenciaResumen[];
}