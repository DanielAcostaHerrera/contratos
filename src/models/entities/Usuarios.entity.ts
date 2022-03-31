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
@Index("IX_Usuarios_NombreUsuario", ["nombreUsuario"], { unique: true })
@Index("PK_Usuarios", ["idUsuario"], { unique: true })  
@Entity("Usuarios", { schema: "CONTRATO.dbo" })
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
  contrasena: string;

  @Field(() => [Int])
  roles: number[];

  @Field()
  token: string;

  @Field(() => [UsuarioRol], {nullable: true})
  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.usuario/* , { onDelete: "CASCADE"} */)
  usuarioRoles: UsuarioRol[];

  @Field(() => Ejecutivos, {nullable: true})
  @OneToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.usuarios)
  @JoinColumn([{ name: "IdEjecutivo", referencedColumnName: "idEjecutivo" }])
  ejecutivo: Ejecutivos;
}
