import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsuarioRol } from "./UsuarioRol.entity";
import { Ejecutivos } from "./Ejecutivos.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("IX_Usuarios", ["idEjecutivo"], { unique: true })
@Index("PK_Usuarios", ["idUsuario"], { unique: true })
@Entity("Usuarios", { schema: "dbo" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "int", name: "IdUsuario" })
  @Field(() => Int)
  idUsuario: number;

  @Column("int", { name: "IdEjecutivo" })
  @Field(() => Int)
  idEjecutivo: number;

  @Column("nvarchar", { name: "NombreUsuario", length: 20 })
  @Field()
  nombreUsuario: string;

  @Column("nvarchar", { name: "Contraseña", length: 200 })
  @Field()
  contraseA: string;

  @Field(() => [UsuarioRol])
  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.usuario)
  usuarioRoles: UsuarioRol[];

  @Field(() => Ejecutivos)
  @OneToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.usuarios)
  @JoinColumn([{ name: "IdEjecutivo", referencedColumnName: "idEjecutivo" }])
  ejecutivo: Ejecutivos;
}
