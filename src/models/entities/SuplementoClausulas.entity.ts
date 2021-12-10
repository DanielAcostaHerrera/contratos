import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuplementoResumen } from "./SuplementoResumen.entity";
import { ContratoClausulas } from "./ContratoClausulas.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_SuplementoClausulas", ["idSuplementoClausulas"], { unique: true })
@Entity("SuplementoClausulas", { schema: "dbo" })
export class SuplementoClausulas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdSuplementoClausulas" })
  @Field(() => Int)
  idSuplementoClausulas: number;

  @Column("int", { name: "IdSuplementoResumen" })
  @Field(() => Int)
  idSuplementoResumen: number;

  @Column("int", { name: "IdContratoClausulas" })
  @Field(() => Int)
  idContratoClausulas: number;

  @Column("smallint", { name: "Orden", nullable: true })
  @Field(() => Int)
  orden: number | null;

  @Column("bit", { name: "Modificada", default: () => "(0)" })
  @Field()
  modificada: boolean;

  @Field(() => SuplementoResumen)
  @ManyToOne(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.suplementoClausulas)
  @JoinColumn([{name: "IdSuplementoResumen",referencedColumnName: "idSuplementoResumen"}])
  suplementoResumen: SuplementoResumen;

  @Field(() => ContratoClausulas)
  @ManyToOne(() => ContratoClausulas,(contratoClausulas) => contratoClausulas.suplementoClausulas)
  @JoinColumn([{name: "IdContratoClausulas",referencedColumnName: "idContratoClausulas"}])
  contratoClausulas: ContratoClausulas;
}
