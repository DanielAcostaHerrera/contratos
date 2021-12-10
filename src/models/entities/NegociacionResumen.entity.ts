import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contratos } from "./Contratos.entity";
import { FacturaResumen } from "./FacturaResumen.entity";
import { FichaCompraResumen } from "./FichaCompraResumen.entity";
import { GruposDeCompras } from "./GruposDeCompras.entity";
import { Monedas } from "./Monedas.entity";
import { NegociacionDetalle } from "./NegociacionDetalle.entity";
import { NegociacionDetalles } from "./NegociacionDetalles.entity";
import { NegociacionProveedores } from "./NegociacionProveedores.entity";
import { SolicitudContratacion } from "./SolicitudContratacion.entity";
import { TiposDeCompras } from "./TiposDeCompras.entity";

@ObjectType()
@Index("IX_NegociacionResumen", ["idNegociacionUnico"], { unique: true })
@Index("PK_NegociacionResumen", ["idNegociacion"], { unique: true })
@Entity("NegociacionResumen", { schema: "dbo" })
export class NegociacionResumen {
  @PrimaryGeneratedColumn({ type: "int", name: "IdNegociacion" })
  @Field(() => Int)
  idNegociacion: number;

  @Column("int", { name: "Consecutivo", default: () => "(0)" })
  @Field(() => Int)
  consecutivo: number;

  @Column("nvarchar", { name: "NoNegociacion", nullable: true, length: 17 })
  @Field()
  noNegociacion: string | null;

  @Column("datetime", { name: "Fecha", default: () => "getdate()" })
  @Field()
  fecha: Date;

  @Column("int", { name: "Comite", default: () => "(0)" })
  @Field(() => Int)
  comite: number;

  @Column("int", { name: "IdTipoCompras", default: () => "(0)" })
  @Field(() => Int)
  idTipoCompras: number;

  @Column("int", { name: "IdGrupo", default: () => "(0)" })
  @Field(() => Int)
  idGrupo: number;

  @Column("int", { name: "IdMoneda", default: () => "(7)" })
  @Field(() => Int)
  idMoneda: number;

  @Column("nvarchar", { name: "Mercancias", length: 300 })
  @Field()
  mercancias: string;

  @Column("bit", { name: "Aprobada" })
  @Field()
  aprobada: boolean;

  @Column("bit", { name: "Cancelada", default: () => "(0)" })
  @Field()
  cancelada: boolean;

  @Column("nvarchar", { name: "Nota", nullable: true })
  @Field()
  nota: string | null;

  @Column("nvarchar", { name: "NoNegociacion", nullable: true, length: 4000 })
  @Field()
  noNeg: string | null;

  @Column("int", { name: "Proveedor", nullable: true })
  @Field(() => Int)
  proveedor: number | null;

  @Column("decimal", {
    name: "ImporteTRD",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  @Field(() => Float)
  importeTrd: number | null;

  @Column("decimal", {
    name: "ImporteGAE",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  @Field(() => Float)
  importeGae: number | null;

  @Column("decimal", {
    name: "ImporteCUC",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  @Field(() => Float)
  importeCuc: number | null;

  @Column("nvarchar", { name: "Comentarios", nullable: true, length: 300 })
  @Field()
  comentarios: string | null;

  @Column("bit", { name: "Operacion", nullable: true })
  @Field()
  operacion: boolean | null;

  @Column("float", { name: "Tasa", nullable: true, precision: 53 })
  @Field(() => Float)
  tasa: number | null;

  @Column("bit", { name: "Terminado", nullable: true })
  @Field()
  terminado: boolean | null;

  @Column("nvarchar", {
    name: "IdNegociacionUnico",
    nullable: true,
    length: 300,
  })
  @Field()
  idNegociacionUnico: string | null;

  @Field(() => [NegociacionDetalle])
  @OneToMany(() => NegociacionDetalle,(negociacionDetalle) => negociacionDetalle.negociacionResumen)
  negociacionDetalle: NegociacionDetalle[];

  @Field(() => [NegociacionDetalles])
  @OneToMany(() => NegociacionDetalles,(negociacionDetalles) => negociacionDetalles.negociacionResumen)
  negociacionDetalles: NegociacionDetalles[];

  @Field(() => [NegociacionProveedores])
  @OneToMany(() => NegociacionProveedores,(negociacionProveedores) => negociacionProveedores.negociacionResumen)
  negociacionProveedores: NegociacionProveedores[];

  @Field(() => TiposDeCompras)
  @ManyToOne(() => TiposDeCompras,(tiposDeCompras) => tiposDeCompras.negociacionResumen)
  @JoinColumn([{ name: "IdTipoCompras", referencedColumnName: "idTipoCompras" },])
  tiposDeCompras: TiposDeCompras;

  @Field(() => Monedas)
  @ManyToOne(() => Monedas,(monedas) => monedas.negociacionResumen)
  @JoinColumn([{ name: "IdMoneda", referencedColumnName: "idMoneda" },])
  monedas: Monedas;

  @Field(() => GruposDeCompras)
  @ManyToOne(() => GruposDeCompras,(grupos) => grupos.negociacionResumen)
  @JoinColumn([{ name: "IdGrupo", referencedColumnName: "idGrupo" },])
  grupos: GruposDeCompras;

  @Field(() => [FichaCompraResumen])
  @OneToMany(() => FichaCompraResumen,(fichaCompraResumen) => fichaCompraResumen.negociacionResumen)
  fichaCompraResumen: FichaCompraResumen[];

  @Field(() => [SolicitudContratacion])
  @OneToMany(() => SolicitudContratacion,(solicitudContratacion) => solicitudContratacion.negociacion)
  solicitudContratacion: SolicitudContratacion[];

  @Field(() => [Contratos])
  @OneToMany(() => Contratos, (contratos) => contratos.negociacionResumen)
  contratos: Contratos[];

  @Field(() => [FacturaResumen])
  @OneToMany(() => FacturaResumen,(facturaResumen) => facturaResumen.negociacionResumen)
  facturaResumen: FacturaResumen[];
}
