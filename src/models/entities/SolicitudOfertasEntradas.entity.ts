import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CodigosParaLaVenta } from "../../modelsMercurio/entities/CodigosParaLaVenta.entity";
import { Referencias } from "../../modelsMercurio/entities/Referencias.entity";
import { UnidadMedida } from "../../modelsMercurio/entities/UnidadMedida.entity";
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

  @Column("nvarchar", { name: "Detalle", length: 300 })
  @Field()
  detalle: string;

  @Column("int", { name: "Referencia" })
  @Field(()=>Int)
  idReferencia: number;

  @Column("int", { name: "Codigo"})
  @Field(()=>Int)
  idCodigo: number;

  @Column("nvarchar", { name: "Decripcion", length: 300 })
  @Field()
  decripcion: string;

  @Column("int", { name: "UM"})
  @Field(()=>Int)
  idUm: number;

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

  @Field(() => Referencias, {nullable: true})
  @ManyToOne(() => Referencias,(referencia) => referencia.solicitudOfertasEntradas)
  @JoinColumn([{ name: "Referencia", referencedColumnName: "referenciaId" }])
  referencia: Referencias;

  @Field(() => CodigosParaLaVenta, {nullable: true})
  @ManyToOne(() => CodigosParaLaVenta,(codigo) => codigo.solicitudOfertasEntradas)
  @JoinColumn([{ name: "Codigo", referencedColumnName: "idCodigo" }])
  codigo: CodigosParaLaVenta;

  @Field(() => UnidadMedida, {nullable: true})
  @ManyToOne(() => UnidadMedida,(unidadMedida) => unidadMedida.solicitudOfertasEntradas)
  @JoinColumn([{ name: "UM", referencedColumnName: "id" }])
  unidadMedida: UnidadMedida;
}
