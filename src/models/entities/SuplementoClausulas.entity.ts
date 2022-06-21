import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuplementoResumen } from "./SuplementoResumen.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Contratos } from "./Contratos.entity";

@ObjectType()
@Index("PK_SuplementoClausulas", ["idSuplementoClausulas"], { unique: true })
@Entity("SuplementoClausulas", { schema: "CONTRATO.dbo" })
export class SuplementoClausulas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdSuplementoClausulas" })
  @Field(() => Int)
  idSuplementoClausulas: number;

  @Column("int", { name: "IdSuplementoResumen" })
  @Field(() => Int)
  idSuplementoResumen: number;

  @Column("int", { name: "IdContrato" })
  @Field(() => Int)
  idContrato: number;

  @Column("int", { name: "NoClausula" })
  @Field(() => Int)
  noClausula: number;

  @Column("nvarchar", { name: "TxClausula" })
  @Field()
  txClausula: string;

  @Column("smallint", { name: "Orden", nullable: true })
  @Field(() => Int,{nullable: true})
  orden: number | null;

  @Column("bit", { name: "Modificada", default: () => "(0)" })
  @Field()
  modificada: boolean;

  @Field(() => SuplementoResumen, {nullable: true})
  @ManyToOne(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.suplementoClausulas)
  @JoinColumn([{name: "IdSuplementoResumen",referencedColumnName: "idSuplementoResumen"}])
  suplementoResumen: SuplementoResumen;

  @Field(() => Contratos, {nullable: true})
  @ManyToOne(() => Contratos,(contrato) => contrato.suplementoClausulas)
  @JoinColumn([{name: "IdContrato",referencedColumnName: "idContrato"}])
  contrato: Contratos;
}
