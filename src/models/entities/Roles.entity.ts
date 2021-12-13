import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsuarioRol } from "./UsuarioRol.entity";

@ObjectType()
@Index("PK_Roles", ["idRol"], { unique: true })
@Entity("Roles", { schema: "CONTRATO.dbo" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "IdRol" })
  @Field(() => Int)
  idRol: number;

  @Column("nvarchar", { name: "Rol", length: 30 })
  @Field()
  rol: string;

  @Field(() => [UsuarioRol], {nullable: true})
  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.rol)
  usuarioRoles: UsuarioRol[];
}
