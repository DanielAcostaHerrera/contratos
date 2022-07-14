import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesGeneralesClausulas } from "./BasesGeneralesClausulas.entity";
import { TiposDeClausulas } from "./TiposDeClausulas.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { TipoContrato } from "./TipoContrato.entity";
import { Incoterm } from "./Incoterm.entity";

@ObjectType()
@Index("IX_CTO_ProformaClausulas_IdTipoClausula", ["idTipoClausula"], {})
@Index("IX_CTO_ProformaClausulas_Orden", ["orden"], {})
@Index("PK_CTO_ProformaClausulas", ["idProformaClausula"], { unique: true })
@Entity("ProformaClausulas", { schema: "CONTRATO.dbo" })
export class ProformaClausulas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdProformaClausula" })
  @Field(() => Int)
  idProformaClausula: number;

  @Column("int", { name: "IdTipoContrato" , nullable: true})
  @Field(() => Int,{nullable: true})
  idTipoContrato?: number;

  @Column("int", { name: "IdIncoterm", nullable: true })
  @Field(() => Int,{nullable: true})
  idIncoterm?: number;

  @Column("int", { name: "IdTipoClausula" , nullable: true})
  @Field(() => Int,{nullable: true})
  idTipoClausula?: number;

  @Column("int", { name: "Orden", default: () => "(1)" })
  @Field(() => Int)
  orden?: number;

  @Column("nvarchar", { name: "Clausula", nullable: true })
  @Field({nullable: true})
  clausula?: string;

  @Field(() => [BasesGeneralesClausulas] , {nullable: true})
  @OneToMany(() => BasesGeneralesClausulas,(basesGeneralesClausulas) => basesGeneralesClausulas.proformaClausula)
  basesGeneralesClausulas: BasesGeneralesClausulas[];

  @Field(() => TiposDeClausulas , {nullable: true})
  @ManyToOne(() => TiposDeClausulas,(tiposDeClausulas) => tiposDeClausulas.proformaClausulas)
  @JoinColumn([{ name: "IdTipoClausula", referencedColumnName: "idTipoClausula" }])
  tiposDeClausulas: TiposDeClausulas;

  @Field(() => TipoContrato , {nullable: true})
  @ManyToOne(() => TipoContrato, (tipoContrato) => tipoContrato.basesGenerales)
  @JoinColumn([{ name: "IdTipoContrato", referencedColumnName: "idTipoContrato" }])
  tipoDeContrato: TipoContrato;

  @Field(() => Incoterm , {nullable: true})
  @ManyToOne(() => Incoterm, (incoterm) => incoterm.basesGenerales)
  @JoinColumn([{ name: "IdIncoterm", referencedColumnName: "idIncoterm" }])
  incoterm: Incoterm;
}
