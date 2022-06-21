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
import { CambiosSuplementos } from "./CambiosSuplementos.entity";

@ObjectType()
@Index("PK_SuplementoChange", ["idClausulaChange"], { unique: true })
@Entity("SuplementoChange", { schema: "CONTRATO.dbo" })
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

  @Column("int", { name: "IdCambio"})
  @Field(() => Int)
  idCambio: number;

  @Column("int", { name: "Orden", nullable: true})
  @Field(() => Int,{nullable: true})
  orden: number | null;

  @Column("nvarchar", { name: "Clausula", length: 150 })
  @Field()
  clausula: string;

  @Column("nvarchar", { name: "ContenidoViejo", nullable: true })
  @Field({nullable: true})
  contenidoViejo: string | null;

  @Column("nvarchar", { name: "ContenidoNuevo", nullable: true })
  @Field({nullable: true})
  contenidoNuevo: string | null;

  @Field(() => SuplementoResumen, {nullable: true})
  @ManyToOne(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.suplementoChanges)
  @JoinColumn([{name: "IdSuplementoResumen",referencedColumnName: "idSuplementoResumen",}])
  suplementoResumen: SuplementoResumen;

  @Field(() => Embarques, {nullable: true})
  @ManyToOne(() => Embarques, (embarques) => embarques.suplementoChanges)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarques: Embarques;

  @Field(() => CambiosSuplementos, {nullable: true})
  @ManyToOne(() => CambiosSuplementos, (cambiosSuplementos) => cambiosSuplementos.suplementoChanges)
  @JoinColumn([{ name: "IdCambio", referencedColumnName: "idCambio" }])
  cambiosSuplementos: CambiosSuplementos;
  
}
