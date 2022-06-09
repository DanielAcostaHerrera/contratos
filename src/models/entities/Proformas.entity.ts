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
import { BasesGenerales } from "./BasesGenerales.entity";
import { Contratos } from "./Contratos.entity";
import { Incoterm } from "./Incoterm.entity";
import { ProformaClausulas } from "./ProformaClausulas.entity";
import { TipoContrato } from "./TipoContrato.entity";

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

  @Field(() => [ProformaClausulas], { nullable: true })
  @OneToMany(() => ProformaClausulas,(proformaClausulas) => proformaClausulas.proformas)
  proformaClausulas: ProformaClausulas[];

  @Field(() => [BasesGenerales], { nullable: true })
  @OneToMany(() => BasesGenerales, (basesGenerales) => basesGenerales.proforma)
  basesGenerales: BasesGenerales[];

  @Field(() => TipoContrato , {nullable: true})
  @ManyToOne(() => TipoContrato, (tipoContrato) => tipoContrato.basesGenerales)
  @JoinColumn([{ name: "IdTipoContrato", referencedColumnName: "idTipoContrato" }])
  tipoDeContrato: TipoContrato;

  @Field(() => Incoterm , {nullable: true})
  @ManyToOne(() => Incoterm, (incoterm) => incoterm.basesGenerales)
  @JoinColumn([{ name: "IdIncoterm", referencedColumnName: "idIncoterm" }])
  incoterm: Incoterm;
}
