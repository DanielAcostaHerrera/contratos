import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios.entity";
import { Roles } from "./Roles.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_UsuarioRol", ["idUsuarioRol"], { unique: true })
@Index("IX_UsuarioRol", ["idUsuario","idRol"], { unique: true })
@Entity("UsuarioRol", { schema: "CONTRATO.dbo" })
export class UsuarioRol {
  @PrimaryGeneratedColumn({ type: "int", name: "IdUsuarioRol" })
  @Field(() => Int)
  idUsuarioRol: number;

  @Column("int", { name: "IdUsuario" })
  @Field(() => Int)
  idUsuario: number;

  @Column("int", { name: "IdRol" })
  @Field(() => Int)
  idRol: number;

  @Field(() => Usuarios)
  @ManyToOne(() => Usuarios, (usuarios) => usuarios.usuarioRoles)
  @JoinColumn([{ name: "IdUsuario", referencedColumnName: "idUsuario" }])
  usuario: Usuarios;

  @Field(() => Roles, {nullable: true})
  @ManyToOne(() => Roles, (roles) => roles.usuarioRoles)
  @JoinColumn([{ name: "IdRol", referencedColumnName: "idRol" }])
  rol: Roles;
}
