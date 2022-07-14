import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesGeneralesClausulas } from "./BasesGeneralesClausulas.entity";
import { ProformaClausulas } from "./ProformaClausulas.entity";

@ObjectType()
@Index("IX_CTO_TiposDeClausulasNombre", ["nombre"], { unique: true })
@Index("IX_CTO_TiposDeClausulasOrden", ["orden"], {})
@Index("PK_CTO_TiposDeClausulas", ["idTipoClausula"], { unique: true })
@Entity("TiposDeClausulas", { schema: "CONTRATO.dbo" })
export class TiposDeClausulas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdTipoClausula" })
  @Field(() => Int)
  idTipoClausula: number;

  @Column("nvarchar", { name: "Nombre", length: 80 })
  @Field()
  nombre: string;

  @Column("int", { name: "Orden" })
  @Field()
  orden: number;

  @Column("bit", { name: "Excepcional", default: () => "(0)" })
  @Field()
  excepcional: boolean;

  @Field(() => [BasesGeneralesClausulas], { nullable: true })
  @OneToMany(() => BasesGeneralesClausulas,(basesGeneralesClausulas) => basesGeneralesClausulas.tiposDeClausulas)
  basesGeneralesClausulas: BasesGeneralesClausulas[];

  @Field(() => [ProformaClausulas], { nullable: true })
  @OneToMany(() => ProformaClausulas,(proformaClausulas) => proformaClausulas.tiposDeClausulas)
  proformaClausulas: ProformaClausulas[];
}
