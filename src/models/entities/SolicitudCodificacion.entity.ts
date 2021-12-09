import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";

@ObjectType()
@Index("PK_SolicitudCodificacion_1", ["idSolicitudCompra"], { unique: true })
@Entity("SolicitudCodificacion", { schema: "dbo" })
export class SolicitudCodificacion {
  @PrimaryGeneratedColumn({ type: "int", name: "IdSolicitudCompra" })
  @Field(() => Int)
  idSolicitudCompra: number;

  @Column("int", { name: "IdPliegoResumen" })
  @Field(() => Int)
  idPliegoResumen: number;

  @Column("nvarchar", { name: "Referencia", length: 20 })
  @Field()
  referencia: string;

  @Column("nvarchar", { name: "Decripcion", length: 300 })
  @Field()
  decripcion: string;

  @Column("nvarchar", { name: "UM", length: 8 })
  @Field()
  um: string;

  @Column("nvarchar", { name: "Marca", nullable: true, length: 50 })
  @Field()
  marca: string | null;

  @Column("nvarchar", { name: "Naturaleza", nullable: true, length: 50 })
  @Field()
  naturaleza: string | null;

  @Column("int", { name: "Packing" })
  @Field(() => Int)
  packing: number;

  @Column("float", { name: "Cantidad", precision: 53 })
  @Field(() => Float)
  cantidad: number;

  @Column("nvarchar", { name: "Dimension", nullable: true, length: 10 })
  @Field()
  dimension: string | null;

  @Column("nvarchar", { name: "Cubicaje", nullable: true, length: 10 })
  @Field()
  cubicaje: string | null;

  @Column("nvarchar", { name: "Embalaje", nullable: true, length: 50 })
  @Field()
  embalaje: string | null;

  @Column("float", { name: "PrecioCosto", precision: 53 })
  @Field(() => Float)
  precioCosto: number;

  @Field(() => PliegoConcurrenciaResumen)
  @ManyToOne(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.solicitudCodificacion)
  @JoinColumn([{ name: "IdPliegoResumen", referencedColumnName: "idPliegoResumen" }])
  pliegoResumen: PliegoConcurrenciaResumen;
}
