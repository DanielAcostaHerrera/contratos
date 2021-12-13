import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesCMarco } from "./BasesCMarco.entity";
import { BasesGenerales } from "./BasesGenerales.entity";
import { Contratos } from "./Contratos.entity";
import { ProformaClausulas } from "./ProformaClausulas.entity";

@ObjectType()
@Index("IX_CTO_ProformaResumenIdIncoterm", ["idIncoterm"], {})
@Index("IX_CTO_ProformaResumenIdProforma", ["idProforma"], {})
@Index("IX_CTO_ProformaResumenIdTipoContrato", ["idTipoContrato"], {})
@Index("IX_CTO_ProformaResumenNombreProfoma", ["nombreProfoma"], {
  unique: true,
})
@Index(
  "IX_CTO_ProformaResumenTotal",
  ["idTipoContrato", "idIncoterm", "nombreProfoma"],
  { unique: true }
)
@Index("PK_CTO_ProformaResumen", ["idProforma"], { unique: true })
@Entity("Proformas", { schema: "CONTRATO.dbo" })
export class Proformas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdProforma" })
  @Field(() => Int)
  idProforma: number;

  @Column("int", { name: "IdTipoContrato" })
  @Field(() => Int)
  idTipoContrato: number;

  @Column("int", { name: "IdIncoterm" })
  @Field(() => Int)
  idIncoterm: number;

  @Column("nvarchar", { name: "NombreProfoma", length: 60 })
  @Field()
  nombreProfoma: string;

  @Column("bit", { name: "Activa", default: () => "(1)" })
  @Field()
  activa: boolean;

  @Column("bit", { name: "CMarcoF" })
  @Field()
  cMarcoF: boolean;

  @Field(() => [BasesCMarco], { nullable: true })
  @OneToMany(() => BasesCMarco, (basesCMarco) => basesCMarco.proforma)
  basesCMarco: BasesCMarco[];

  @Field(() => [ProformaClausulas], { nullable: true })
  @OneToMany(() => ProformaClausulas,(proformaClausulas) => proformaClausulas.proformas)
  proformaClausulas: ProformaClausulas[];

  @Field(() => [BasesGenerales], { nullable: true })
  @OneToMany(() => BasesGenerales, (basesGenerales) => basesGenerales.proforma)
  basesGenerales: BasesGenerales[];
}
