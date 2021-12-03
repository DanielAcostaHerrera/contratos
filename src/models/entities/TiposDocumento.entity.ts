import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Documentacion } from "./Documentacion.entity";

@ObjectType()
@Index("PK_CTO_TiposDocumento", ["idTipoDoc"], { unique: true })
@Entity("TiposDocumento", { schema: "dbo" })
export class TiposDocumento {
  @PrimaryGeneratedColumn({ type: "int", name: "IdTipoDoc" })
  @Field(() => Int)
  idTipoDoc: number;

  @Column("nvarchar", { name: "NombreDoc", length: 150 })
  @Field()
  nombreDoc: string;

  @Field(() => [Documentacion])
  @OneToMany(() => Documentacion, (documentacion) => documentacion.tiposDocumento)
  documentaciones: Documentacion[];
}
