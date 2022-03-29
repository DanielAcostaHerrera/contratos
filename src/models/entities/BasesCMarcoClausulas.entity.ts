import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProformaClausulas } from "./ProformaClausulas.entity";
import { BasesCMarco } from "./BasesCMarco.entity";
import { TiposDeClausulas } from "./TiposDeClausulas.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_CTO_BasesCMarcoClausulas", ["idBasesCMarcoClausulas"], { unique: true })
@Index(
  "IX_BasesCMarcoClausulas",
  ["idBaseCMarco", "idProformaClausula", "idTipoClausula"],
  { unique: true }
)
@Entity("BasesCMarcoClausulas", { schema: "CONTRATO.dbo" })
export class BasesCMarcoClausulas {

  @PrimaryGeneratedColumn({ type: "int", name: "IdBasesCMarcoClausulas" })
  @Field(() => Int)
  idBasesCMarcoClausulas?: number;

  @Column("int", { name: "IdBaseCMarco" })
  @Field(() => Int)
  idBaseCMarco?: number;

  @Column("int", { name: "IdProformaClausula" })
  @Field(() => Int)
  idProformaClausula?: number;

  @Column("int", { name: "IdTipoClausula" })
  @Field(() => Int)
  idTipoClausula?: number;

  @Column("int", { name: "Orden" })
  @Field(() => Int)
  orden?: number;

  @Column("nvarchar", { name: "Clausula" })
  @Field()
  clausula?: string;

  @Column("datetime", { name: "Modificado", default: () => "getdate()" })
  @Field()
  modificado?: Date;

  @Field(() => ProformaClausulas, {nullable: true})
  @ManyToOne(() => ProformaClausulas, (proformaClausulas) => proformaClausulas.basesCMarcoClausulas)
  @JoinColumn([{ name: "IdProformaClausula", referencedColumnName: "idProformaClausula" }])
  proformaClausulas: ProformaClausulas;

  @Field(() => BasesCMarco, {nullable: true})
  @ManyToOne(() => BasesCMarco,(basesCMarco) => basesCMarco.basesCMarcoClausulas,{ onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "IdBaseCMarco", referencedColumnName: "idBaseCMarco" }])
  basesCMarco: BasesCMarco;

  @Field(() => TiposDeClausulas, {nullable: true})
  @ManyToOne(() => TiposDeClausulas,(tiposDeClausulas) => tiposDeClausulas.basesCMarcoClausulas)
  @JoinColumn([{ name: "IdTipoClausula", referencedColumnName: "idTipoClausula" }])
  tipoDeClausula: TiposDeClausulas;
}
