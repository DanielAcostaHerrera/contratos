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
@Index("IX_ContratoDesglose", ["idContrato", "noClausula"], { unique: true })
@Index("PK_ContratoDesglose", ["idContratoDesglose"], { unique: true })
@Entity("ContratoDesglose", { schema: "dbo" })
export class ContratoDesglose {
  @PrimaryGeneratedColumn({ type: "int", name: "IdContratoDesglose" })
  @Field(() => Int)
  idContratoDesglose: number;

  @Column("int", { name: "IdContrato" })
  @Field(() => Int)
  idContrato: number;

  @Column("int", { name: "NoClausula" })
  @Field(() => Int)
  noClausula: number;

  @Column("nvarchar", { name: "Contenido", nullable: true })
  @Field()
  contenido: string | null;

  @Field(() => Contratos, {nullable: true})
  @ManyToOne(() => Contratos, (contratos) => contratos.contratoDesgloses)
  @JoinColumn([{ name: "IdContrato", referencedColumnName: "idContrato" }])
  contratos: Contratos;
}
