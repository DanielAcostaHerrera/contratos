import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Documentacion } from "./Documentacion.entity";

@ObjectType()
@Index(
  "IX_DocumentacionContrato",
  ["idDocumento", "idContrato", "idAsociacion"],
  { unique: true }
)

@Index(
  "PK_CTO_DocumentacionContrato",
  ["idDocumentacionContrato"],
  { unique: true }
)

@Entity("DocumentacionContrato", { schema: "dbo" })
export class DocumentacionContrato {
  @PrimaryGeneratedColumn({ type: "int", name: "IdDocumentacionContrato" })
  @Field(() => Int)
  idDocumentacionContrato: number;

  @Column("int", { name: "IdDocumento" })
  @Field(() => Int)
  idDocumento: number;

  @Column("int", { name: "IdContrato" })
  @Field(() => Int)
  idContrato: number;

  @Column("int", { name: "IdAsociacion" })
  @Field(() => Int)
  idAsociacion: number;

  @Field(() => Documentacion)
  @ManyToOne(() => Documentacion,(documentacion) => documentacion.documentacionContratos,{ onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "IdDocumento", referencedColumnName: "idDocumento" }])
  documentacion: Documentacion;
}
