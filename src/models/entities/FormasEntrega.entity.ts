import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contratos } from "./Contratos.entity";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";

@ObjectType()
@Index("IX_FormasEntrega", ["formaEntrega"], { unique: true })
@Index("PK_FormasEntrega", ["idFormaEntrega"], { unique: true })
@Entity("FormasEntrega", { schema: "CONTRATO.dbo" })
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

  @Field(() => [PliegoConcurrenciaResumen], {nullable: true})
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.formaEntrega)
  pliegoConcurrenciaResumen: PliegoConcurrenciaResumen[];

  @Field(() => [Contratos], {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.formaEntrega)
  contratos: Contratos[];
}
