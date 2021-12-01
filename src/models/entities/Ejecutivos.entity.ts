import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cargos } from "./Cargos.entity";
import { GruposDeCompras } from "./GruposDeCompras.entity";

@ObjectType()
@Index("IX_CTO_Ejecutivos", ["nombre"], { unique: true })
@Index("IX_CTO_Ejecutivos_Grupo", ["idGrupo"], {})
@Index("PK_CTO_Ejecutivos", ["idEjecutivo"], { unique: true })
@Entity("Ejecutivos", { schema: "dbo" })
export class Ejecutivos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdEjecutivo" })
  @Field(() => Int)
  idEjecutivo: number;

  @Column("int", { name: "IdGrupo"})
  @Field(() => Int)
  idGrupo: number;

  @Column("nvarchar", { name: "Nombre", length: 50 })
  @Field()
  nombre: string;

  @Column("int", { name: "Cargo" })
  @Field(() => Int)
  idCargo: number;

  @Column("nvarchar", { name: "Correo", nullable: true, length: 50 })
  @Field()
  correo: string | null;

  @Column("nvarchar", { name: "usuarioSLQ", nullable: true, length: 150 })
  @Field()
  usuarioSlq: string | null;

  @Column("bit", { name: "Activo" })
  @Field()
  activo: boolean;

  @Field(() => Cargos, {nullable: true})
  @ManyToOne(() => Cargos, (cargos) => cargos.ejecutivos)
  @JoinColumn([{ name: "Cargo", referencedColumnName: "idCargo" }])
  cargo: Cargos;

  @Field(() => GruposDeCompras, {nullable: true})
  @ManyToOne(() => GruposDeCompras, (grupos) => grupos.ejecutivos)
  @JoinColumn([{ name: "IdGrupo", referencedColumnName: "idGrupo" }])
  grupo: GruposDeCompras;

}
