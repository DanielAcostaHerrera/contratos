import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contratos } from "./Contratos.entity";


@ObjectType()
@Index("IX_ContratoClausulas", ["idContrato", "noClausula"], { unique: true })
@Index("PK_ContratoClausulas", ["idContratoClausulas"], { unique: true })
@Entity("ContratoClausulas", { schema: "dbo" })
export class ContratoClausulas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdContratoClausulas" })
  @Field(() => Int)
  idContratoClausulas: number;

  @Column("int", { name: "IdContrato" })
  @Field(() => Int)
  idContrato: number;

  @Column("int", { name: "NoClausula" })
  @Field(() => Int)
  noClausula: number;

  @Column("nvarchar", { name: "contenido", nullable: true })
  @Field()
  contenido: string | null;


  @Field(() => Contratos, {nullable: true})
  @ManyToOne(() => Contratos, (contratos) => contratos.contratoClausulas)
  @JoinColumn([{ name: "IdContrato", referencedColumnName: "idContrato" }])
  contratos: Contratos;
}
