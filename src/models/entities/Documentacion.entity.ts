import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DocumentacionContrato } from "./DocumentacionContrato.entity";
import { TiposDocumento } from "./TiposDocumento.entity";

@ObjectType()
@Index("IX_Documentacion_TipoDoc", ["idTipoDoc"], {})
@Index("PK_CTO_Documentacion", ["idDocumento"], { unique: true })
@Entity("Documentacion", { schema: "dbo" })
export class Documentacion {
  @PrimaryGeneratedColumn({ type: "int", name: "IdDocumento" })
  @Field(() => Int)
  idDocumento: number;

  @Column("int", { name: "IdTipoDoc" })
  @Field(() => Int)
  idTipoDoc: number;

  @Column("nvarchar", { name: "NombreFichero", length: 100 })
  @Field()
  nombreFichero: string;

  @Column("nvarchar", { name: "Descripcion", length: 250 })
  @Field()
  descripcion: string;

  @Column("varbinary", { name: "Documento" })
  @Field()
  documento: Buffer;

  @Column("nvarchar", { name: "TipoFichero", length: 10 })
  @Field()
  tipoFichero: string;

  @Column("nvarchar", { name: "IDoc", length: 65 })
  @Field()
  iDoc: string;

  @Field(() => TiposDocumento, {nullable: true})
  @ManyToOne(() => TiposDocumento,(tiposDocumento) => tiposDocumento.documentacions)
  @JoinColumn([{ name: "IdTipoDoc", referencedColumnName: "idTipoDoc" }])
  tiposDocumento: TiposDocumento;

  @Field(() => [DocumentacionContrato], {nullable: true})
  @OneToMany(() => DocumentacionContrato,(documentacionContrato) => documentacionContrato.documentacion)
  documentacionContratos: DocumentacionContrato[];
}
