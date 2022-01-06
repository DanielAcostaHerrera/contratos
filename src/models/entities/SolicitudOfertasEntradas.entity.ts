import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SolicitudOfertasProveedor } from "./SolicitudOfertasProveedor.entity";

@ObjectType()
@Index("PK_RecepcionOfertas", ["idOfertasEntradas"], { unique: true })
@Entity("SolicitudOfertasEntradas", { schema: "CONTRATO.dbo" })
export class SolicitudOfertasEntradas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdOfertasEntradas" })
  @Field(() => Int)
  idOfertasEntradas: number;

  @Column("int", { name: "IdOfertasProveedor" })
  @Field(() => Int)
  idOfertasProveedor: number;

  @Column("datetime", { name: "FechaRecepcionOferta" })
  @Field()
  fechaRecepcionOferta: Date;

  @Column("xml", { name: "Detalle" })
  @Field()
  detalle: string;

  @Column("nvarchar", { name: "Referencia", length: 20 })
  @Field()
  referencia: string;

  @Column("nvarchar", { name: "Codigo", length: 13 })
  @Field()
  codigo: string;

  @Column("nvarchar", { name: "Decripcion", length: 300 })
  @Field()
  decripcion: string;

  @Column("nvarchar", { name: "UM", length: 8 })
  @Field()
  um: string;

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

  @Column("float", { name: "PrecioCosto", precision: 53 })
  @Field(() => Float)
  precioCosto: number;

  @Field(() => SolicitudOfertasProveedor, {nullable: true})
  @ManyToOne(() => SolicitudOfertasProveedor,(solicitudOfertasProveedor) => solicitudOfertasProveedor.solicitudOfertasEntradas)
  @JoinColumn([{ name: "IdOfertasProveedor", referencedColumnName: "idOfertasProveedor" }])
  ofertasProveedor: SolicitudOfertasProveedor;
}
