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
import { Proveedores } from "../../modelsMercurio/entities/Proveedores.entity";
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
@Index("PK_NegociacionResumen", ["idNegociacion"], { unique: true })
@Entity("NegociacionResumen", { schema: "CONTRATO.dbo" })
export class NegociacionResumen {
  @PrimaryGeneratedColumn({ type: "int", name: "IdNegociacion" })
  @Field(() => Int)
  idNegociacion: number;

  @Column("int", { name: "Consecutivo", default: () => "(0)" })
  @Field(() => Int)
  consecutivo: number;

  @Column("nvarchar", { name: "NoNegociacion", nullable: true, length: 17 })
  @Field({nullable: true})
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
  @Field({nullable: true})
  nota: string | null;

  @Column("int", { name: "Proveedor", nullable: true })
  @Field(() => Int,{nullable: true})
  idProveedor: number | null;

  @Column("decimal", {
    name: "ImporteTRD",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  @Field(() => Float,{nullable: true})
  importeTrd: number | null;

  @Column("decimal", {
    name: "ImporteGAE",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  @Field(() => Float,{nullable: true})
  importeGae: number | null;

  @Column("decimal", {
    name: "ImporteCUC",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  @Field(() => Float,{nullable: true})
  importeCuc: number | null;

  @Column("nvarchar", { name: "Comentarios", nullable: true, length: 300 })
  @Field({nullable: true})
  comentarios: string | null;

  @Column("bit", { name: "Operacion", nullable: true })
  @Field({nullable: true})
  operacion: boolean | null;

  @Column("float", { name: "Tasa", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  tasa: number | null;

  @Column("bit", { name: "Terminado", nullable: true })
  @Field({nullable: true})
  terminado: boolean | null;

  @Field(() => [NegociacionDetalle], {nullable: true})
  @OneToMany(() => NegociacionDetalle,(negociacionDetalle) => negociacionDetalle.negociacionResumen)
  negociacionDetalle: NegociacionDetalle[];

  @Field(() => [NegociacionDetalles], {nullable: true})
  @OneToMany(() => NegociacionDetalles,(negociacionDetalles) => negociacionDetalles.negociacionResumen)
  negociacionDetalles: NegociacionDetalles[];

  @Field(() => [NegociacionProveedores], {nullable: true})
  @OneToMany(() => NegociacionProveedores,(negociacionProveedores) => negociacionProveedores.negociacionResumen)
  negociacionProveedores: NegociacionProveedores[];

  @Field(() => TiposDeCompras, {nullable: true})
  @ManyToOne(() => TiposDeCompras,(tiposDeCompras) => tiposDeCompras.negociacionResumen)
  @JoinColumn([{ name: "IdTipoCompras", referencedColumnName: "idTipoCompras" },])
  tiposDeCompras: TiposDeCompras;

  @Field(() => Monedas, {nullable: true})
  @ManyToOne(() => Monedas,(monedas) => monedas.negociacionResumen)
  @JoinColumn([{ name: "IdMoneda", referencedColumnName: "idMoneda" },])
  monedas: Monedas;

  @Field(() => GruposDeCompras, {nullable: true})
  @ManyToOne(() => GruposDeCompras,(grupos) => grupos.negociacionResumen)
  @JoinColumn([{ name: "IdGrupo", referencedColumnName: "idGrupo" },])
  grupo: GruposDeCompras;

  @Field(() => [FichaCompraResumen], {nullable: true})
  @OneToMany(() => FichaCompraResumen,(fichaCompraResumen) => fichaCompraResumen.negociacionResumen)
  fichaCompraResumen: FichaCompraResumen[];

  @Field(() => [SolicitudContratacion], {nullable: true})
  @OneToMany(() => SolicitudContratacion,(solicitudContratacion) => solicitudContratacion.negociacion)
  solicitudContratacion: SolicitudContratacion[];

  @Field(() => [Contratos], {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.negociacionResumen)
  contratos: Contratos[];

  @Field(() => [FacturaResumen], {nullable: true})
  @OneToMany(() => FacturaResumen,(facturaResumen) => facturaResumen.negociacionResumen)
  facturaResumen: FacturaResumen[];

  @Field(() => Proveedores, {nullable: true})
  @ManyToOne(() => Proveedores,(proveedor) => proveedor.negociacionResumen)
  @JoinColumn([{ name: "Proveedor", referencedColumnName: "codigo" },])
  proveedor: Proveedores;
}
