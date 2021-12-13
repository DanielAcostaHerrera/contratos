import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index } from "typeorm";

@ObjectType()
@Index("PK_DatosEntidad", ["codigo"], { unique: true })
@Entity("DatosEntidad", { schema: "CONTRATO.dbo" })
export class DatosEntidad {
  @Column("int", { primary: true, name: "CODIGO" })
  @Field(() => Int)
  codigo: number;

  @Column("varchar", { name: "CuentaUSD", nullable: true, length: 300 })
  @Field()
  cuentaUsd: string | null;

  @Column("varchar", { name: "CodAgenciaUSD", nullable: true, length: 300 })
  @Field()
  codAgenciaUsd: string | null;

  @Column("varchar", { name: "AgenciaUSD", nullable: true, length: 300 })
  @Field()
  agenciaUsd: string | null;

  @Column("varchar", { name: "FaxAgenciaUSD", nullable: true, length: 300 })
  @Field()
  faxAgenciaUsd: string | null;

  @Column("varchar", { name: "CuentaMN", nullable: true, length: 300 })
  @Field()
  cuentaMn: string | null;

  @Column("varchar", { name: "CodAgenciaMN", nullable: true, length: 300 })
  @Field()
  codAgenciaMn: string | null;

  @Column("varchar", { name: "AgenciaMN", nullable: true, length: 300 })
  @Field()
  agenciaMn: string | null;

  @Column("varchar", { name: "FaxAgenciaMN", nullable: true, length: 300 })
  @Field()
  faxAgenciaMn: string | null;

  @Column("varchar", { name: "CodigoEnt", nullable: true, length: 300 })
  @Field()
  codigoEnt: string | null;

  @Column("varchar", { name: "CodigoMINCEX", nullable: true, length: 300 })
  @Field()
  codigoMincex: string | null;

  @Column("varchar", { name: "Lic_CComercio", nullable: true, length: 300 })
  @Field()
  licCComercio: string | null;

  @Column("varchar", { name: "Nombre", nullable: true, length: 300 })
  @Field()
  nombre: string | null;

  @Column("varchar", { name: "Compañia", nullable: true, length: 300 })
  @Field()
  compaIa: string | null;
}
