import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("Logs", { schema: "dbo" })
export class Logs {
  @PrimaryGeneratedColumn({ type: "int", name: "IdLog" })
  @Field(() => Int)
  idLog: number;
  
  @Column("nvarchar", { name: "Mensaje", length: 250 })
  @Field()
  mensaje: string;

  @Column("nvarchar", { name: "Fecha", length: 250 })
  @Field()
  fecha: string;

  @Column("nvarchar", { name: "Usuario", length: 250 })
  @Field()
  usuario: string;
}
