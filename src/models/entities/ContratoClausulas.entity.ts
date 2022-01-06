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
import { Contratos } from "./Contratos.entity";
import { SuplementoChange } from "./SuplementoChange.entity";
import { SuplementoClausulas } from "./SuplementoClausulas.entity";


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

  @Field(() => [SuplementoChange], {nullable: true})
  @OneToMany(() => SuplementoChange,(suplementoChange) => suplementoChange.contratoClausulas)
  suplementoChanges: SuplementoChange[];

  @Field(() => [SuplementoClausulas], {nullable: true})
  @OneToMany(() => SuplementoClausulas,(suplementoClausulas) => suplementoClausulas.contratoClausulas)
  suplementoClausulas: SuplementoClausulas[];
}
