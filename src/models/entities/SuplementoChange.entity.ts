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
import { ContratoClausulas } from "./ContratoClausulas.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_SuplementoChange", ["idClausulaChange"], { unique: true })
@Entity("SuplementoChange", { schema: "dbo" })
export class SuplementoChange {
  @PrimaryGeneratedColumn({ type: "int", name: "IdClausulaChange" })
  @Field(() => Int)
  idClausulaChange: number;

  @Column("int", { name: "IdSuplementoResumen" })
  @Field(() => Int)
  idSuplementoResumen: number;

  @Column("int", { name: "IdEmbarque" })
  @Field(() => Int)
  idEmbarque: number;

  @Column("int", { name: "IdContratoClausula" })
  @Field(() => Int)
  idContratoClausula: number;

  @Column("nvarchar", { name: "ContenidoViejo", nullable: true })
  @Field()
  contenidoViejo: string | null;

  @Column("nvarchar", { name: "ContenidoNuevo", nullable: true })
  @Field()
  contenidoNuevo: string | null;

  @Field(() => SuplementoResumen)
  @ManyToOne(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.suplementoChanges)
  @JoinColumn([{name: "IdSuplementoResumen",referencedColumnName: "idSuplementoResumen",}])
  suplementoResumen: SuplementoResumen;

  @Field(() => Embarques)
  @ManyToOne(() => Embarques, (embarques) => embarques.suplementoChanges)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarques: Embarques;

  @Field(() => ContratoClausulas)
  @ManyToOne(() => ContratoClausulas,(contratoClausulas) => contratoClausulas.suplementoChanges)
  @JoinColumn([{ name: "IdContratoClausula", referencedColumnName: "idContratoClausulas" },])
  contratoClausulas: ContratoClausulas;
}
