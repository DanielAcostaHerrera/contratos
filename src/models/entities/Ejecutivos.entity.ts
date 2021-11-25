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

@ObjectType()
@Index("PK_Ejecutivos", ["id"], { unique: true })
@Entity("Ejecutivos", { schema: "dbo" })
export class Ejecutivos {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "smallint", name: "Id"})
  id: number;

  @Field()
  @Column("nvarchar", { name: "Nombre", length: 50 })
  nombre: string;

  @Field({nullable: true})
  @Column("nvarchar", { name: "Correo", nullable: true, length: 50 })
  correo: string | null;

  @Field()
  @Column("uniqueidentifier", {
    name: "msrepl_tran_version",
    default: () => "newid()",
  })
  msreplTranVersion: string;

  @Field({nullable: true})
  @Column("char", { name: "usuarioSLQ", nullable: true, length: 150 })
  usuarioSlq: string | null;

  @Field()
  @Column("bit", { name: "Activo", default: () => "1" })
  activo: boolean;

  @Field({nullable: true})
  @Column("nvarchar", { name: "E_mail", nullable: true, length: 50 })
  eMail: string | null;

  @Field(() => Cargos, {nullable: true})
  @ManyToOne(() => Cargos, (cargos) => cargos.ejecutivos)
  @JoinColumn([{ name: "Cargo", referencedColumnName: "idCargo" }])
  cargo: Cargos;
}
