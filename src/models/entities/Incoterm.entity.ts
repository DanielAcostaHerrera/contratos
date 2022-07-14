import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesGenerales } from "./BasesGenerales.entity";
import { Contratos } from "./Contratos.entity";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";
import { ProformaClausulas } from "./ProformaClausulas.entity";
import { SuplementoResumen } from "./SuplementoResumen.entity";

@ObjectType()
@Index("PK_Incoterm", ["idIncoterm"], { unique: true })
@Entity("NOM_Incoterm", { schema: "CONTRATO.dbo" })
export class Incoterm {
  @PrimaryGeneratedColumn({ type: "int", name: "IdIncoterm" })
  @Field(() => Int)
  idIncoterm: number;

  @Column("nvarchar", { name: "Nombre", length: 100 })
  @Field()
  nombre: string;

  @Column("nvarchar", { name: "Abreviatura", length: 50 })
  @Field()
  abreviatura: string;

  @Column("nvarchar", { name: "Nota", nullable: true, length: 500 })
  @Field()
  nota: string | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  @Field()
  activo: boolean;

  @Field(() => [BasesGenerales] , {nullable: true})
  @OneToMany(() => BasesGenerales,(basesGenerales) => basesGenerales.incoterm)
  basesGenerales: BasesGenerales[];

  @Field(() => [PliegoConcurrenciaResumen] , {nullable: true})
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.incoterm)
  pliegoConcurrenciaResumen: PliegoConcurrenciaResumen[];

  @Field(() => [Contratos] , {nullable: true})
  @OneToMany(() => Contratos,(contratos) => contratos.incoterm)
  contratos: Contratos[];

  @Field(() => [SuplementoResumen] , {nullable: true})
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.incoterm)
  suplementoResumen: SuplementoResumen[];

  @Field(() => [ProformaClausulas], { nullable: true })
  @OneToMany(() => ProformaClausulas, (proformaClausulas) => proformaClausulas.incoterm)
  proformaClausulas: ProformaClausulas[];
}

