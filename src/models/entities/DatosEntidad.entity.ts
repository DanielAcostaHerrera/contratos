import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Compradores } from "./Compradores.entity";
import { Configuracion } from "./Configuracion.entity";

@ObjectType()
@Index("PK_DatosEntidad", ["codigo"], { unique: true })
@Entity("DatosEntidad", { schema: "CONTRATO.dbo" })
export class DatosEntidad {
  @PrimaryGeneratedColumn({ type: "int", name: "CODIGO" })
  @Field(() => Int)
  codigo: number;

  @Column("varchar", { name: "CuentaUSD", nullable: true, length: 300 })
  @Field({nullable: true})
  cuentaUsd: string | null;

  @Column("varchar", { name: "CodAgenciaUSD", nullable: true, length: 300 })
  @Field({nullable: true})
  codAgenciaUsd: string | null;

  @Column("varchar", { name: "AgenciaUSD", nullable: true, length: 300 })
  @Field({nullable: true})
  agenciaUsd: string | null;

  @Column("varchar", { name: "FaxAgenciaUSD", nullable: true, length: 300 })
  @Field({nullable: true})
  faxAgenciaUsd: string | null;

  @Column("varchar", { name: "CuentaMN", nullable: true, length: 300 })
  @Field({nullable: true})
  cuentaMn: string | null;

  @Column("varchar", { name: "CodAgenciaMN", nullable: true, length: 300 })
  @Field({nullable: true})
  codAgenciaMn: string | null;

  @Column("varchar", { name: "AgenciaMN", nullable: true, length: 300 })
  @Field({nullable: true})
  agenciaMn: string | null;

  @Column("varchar", { name: "FaxAgenciaMN", nullable: true, length: 300 })
  @Field({nullable: true})
  faxAgenciaMn: string | null;

  @Column("varchar", { name: "CodigoEnt", nullable: true, length: 300 })
  @Field({nullable: true})
  codigoEnt: string | null;

  @Column("varchar", { name: "CodigoMINCEX", nullable: true, length: 300 })
  @Field({nullable: true})
  codigoMincex: string | null;

  @Column("varchar", { name: "Lic_CComercio", nullable: true, length: 300 })
  @Field({nullable: true})
  licCComercio: string | null;

  @Column("varchar", { name: "Nombre", nullable: true, length: 300 })
  @Field({nullable: true})
  nombre: string | null;

  @Column("varchar", { name: "Compañia", nullable: true, length: 300 })
  @Field({nullable: true})
  compaIa: string | null;

  @Field(() => [Configuracion], {nullable: true})
  @OneToOne(() => Configuracion,(configuracion) => configuracion.entidad)
  configuracion: Configuracion;

  @Field(() => [Compradores], { nullable: true })
  @OneToMany(() => Compradores,(compradores) => compradores.entidad)
  compradores: Compradores[];
}
