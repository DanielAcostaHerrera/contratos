import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Embalajes } from "./Embalajes.entity";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";

@ObjectType()
@Index("PK_SolicitudCodificacion_1", ["idSolicitudCompra"], { unique: true })
@Entity("SolicitudCodificacion", { schema: "CONTRATO.dbo" })
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
  @Field({nullable: true})
  marca: string | null;

  @Column("nvarchar", { name: "Naturaleza", nullable: true, length: 50 })
  @Field({nullable: true})
  naturaleza: string | null;

  @Column("int", { name: "Packing" })
  @Field(() => Int)
  packing: number;

  @Column("float", { name: "Cantidad", precision: 53 })
  @Field(() => Float)
  cantidad: number;

  @Column("nvarchar", { name: "Dimension", nullable: true, length: 10 })
  @Field({nullable: true})
  dimension: string | null;

  @Column("nvarchar", { name: "Cubicaje", nullable: true, length: 10 })
  @Field({nullable: true})
  cubicaje: string | null;

  @Column("int", { name: "IdEmbalaje", nullable: true})
  @Field({nullable: true})
  idEmbalaje: number | null;

  @Column("float", { name: "PrecioCosto", precision: 53 })
  @Field(() => Float)
  precioCosto: number;

  @Field(() => PliegoConcurrenciaResumen, {nullable: true})
  @ManyToOne(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.solicitudCodificacion)
  @JoinColumn([{ name: "IdPliegoResumen", referencedColumnName: "idPliegoResumen" }])
  pliegoResumen: PliegoConcurrenciaResumen;

  @Field(() => Embalajes, {nullable: true})
  @ManyToOne(() => Embalajes,(embalajes) => embalajes.solicitudCodificacion)
  @JoinColumn([{ name: "IdEmbalaje", referencedColumnName: "idEmbalaje" }])
  embalaje: Embalajes;
}
