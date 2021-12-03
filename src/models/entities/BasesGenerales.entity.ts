import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clasificaciones } from "./Clasificaciones.entity";
import { TipoContrato } from "./TipoContrato.entity";
import { Incoterm } from "./Incoterm.entity";
import { BasesGeneralesClausulas } from "./BasesGeneralesClausulas.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Proformas } from "./Proformas.entity";
import { Contratos } from "./Contratos.entity";

@ObjectType()
@Index("IX_CTO_BasesGeneralesComprador", ["idComprador"], {})
@Index("IX_CTO_BasesGeneralesConsecutivo", ["consecutivo"], {})
@Index("IX_CTO_BasesGeneralesIncoterm", ["idIncoterm"], {})
@Index("IX_CTO_BasesGeneralesPais", ["pais"], {})
@Index("IX_CTO_BasesGeneralesProforma", ["idProforma"], {})
@Index("IX_CTO_BasesGeneralesProveedor", ["idProveedor"], {})
@Index("IX_CTO_BasesGeneralesTipoContrato", ["idTipoContrato"], {})
@Index("PK_CTO_BasesGenerales", ["idBaseGenerales"], { unique: true })
@Entity("BasesGenerales", { schema: "dbo" })
export class BasesGenerales {
  @PrimaryGeneratedColumn({ type: "int", name: "IdBaseGenerales" })
  @Field(() => Int)
  idBaseGenerales: number;

  @Column("int", { name: "Consecutivo" })
  @Field(() => Int)
  consecutivo: number;

  @Column("datetime", { name: "Fecha" })
  @Field()
  fecha: Date;

  @Column("int", { name: "IdTipoContrato" })
  @Field(() => Int)
  idTipoContrato: number;

  @Column("int", { name: "IdIncoterm" })
  @Field(() => Int)
  idIncoterm: number;

  @Column("int", { name: "IdProforma" })
  @Field(() => Int)
  idProforma: number;

  @Column("nvarchar", { name: "LugardeFirma", length: 60 })
  @Field()
  lugardeFirma: string;

  @Column("int", { name: "Pais" })
  @Field(() => Int)
  pais: number;

  @Column("int", { name: "IdProveedor" })
  @Field(() => Int)
  idProveedor: number;

  @Column("nvarchar", { name: "NProveedor", nullable: true, length: 250 })
  @Field()
  nProveedor: string | null;

  @Column("nvarchar", { name: "NombreRepresentante", length: 100 })
  @Field()
  nombreRepresentante: string;

  @Column("nvarchar", { name: "CargoRepresentante", length: 100 })
  @Field()
  cargoRepresentante: string;

  @Column("nvarchar", { name: "DireccionProveedor", length: 500 })
  @Field()
  direccionProveedor: string;

  @Column("int", { name: "IdComprador" })
  @Field(() => Int)
  idComprador: number;

  @Column("int", { name: "Vigencia", default: () => "(1095)" })
  @Field(() => Int)
  vigencia: number;

  @Column("datetime", { name: "FechaVencimiento", nullable: true })
  @Field()
  fechaVencimiento: Date | null;

  @Column("bit", { name: "Aprobado", default: () => "(0)" })
  @Field()
  aprobado: boolean;

  @Column("bit", { name: "Cancelado", default: () => "(0)" })
  @Field()
  cancelado: boolean;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  @Field()
  activo: boolean;

  @Column("datetime", { name: "Actualizado", default: () => "getdate()" })
  @Field()
  actualizado: Date;

  @Column("nvarchar", { name: "NoContrato", nullable: true, length: 4000 })
  @Field()
  noContrato: string | null;

  @Field(() => Clasificaciones , {nullable: true})
  @ManyToOne(() => Clasificaciones,(clasificaciones) => clasificaciones.basesGenerales,{ onUpdate: "CASCADE" })
  @JoinColumn([{ name: "IdClasificacion", referencedColumnName: "idClasificacion" }])
  clasificaciones: Clasificaciones;

  @Field(() => TipoContrato , {nullable: true})
  @ManyToOne(() => TipoContrato, (tipoContrato) => tipoContrato.basesGenerales)
  @JoinColumn([{ name: "IdTipoContrato", referencedColumnName: "idTipoContrato" }])
  tipoDeContrato: TipoContrato;

  @Field(() => Incoterm , {nullable: true})
  @ManyToOne(() => Incoterm, (incoterm) => incoterm.basesGenerales)
  @JoinColumn([{ name: "IdIncoterm", referencedColumnName: "idIncoterm" }])
  incoterm: Incoterm;

  @Field(() => Proformas , {nullable: true})
  @ManyToOne(() => Proformas, (proforma) => proforma.basesGenerales)
  @JoinColumn([{ name: "IdProforma", referencedColumnName: "idProforma" }])
  proforma: Proformas;

  @Field(() => [BasesGeneralesClausulas] , {nullable: true})
  @OneToMany(() => BasesGeneralesClausulas,(basesGeneralesClausulas) => basesGeneralesClausulas.basesGenerales)
  basesGeneralesClausulas: BasesGeneralesClausulas[];

  @Field(() => [Contratos] , {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.basesGenerales)
  contratos: Contratos[];
}
