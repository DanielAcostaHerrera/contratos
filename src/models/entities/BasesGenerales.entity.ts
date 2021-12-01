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
  idBaseGenerales: number;

  @Column("int", { name: "Consecutivo" })
  consecutivo: number;

  @Column("datetime", { name: "Fecha" })
  fecha: Date;

  @Column("int", { name: "IdTipoContrato" })
  idTipoContrato: number;

  @Column("int", { name: "IdIncoterm" })
  idIncoterm: number;

  @Column("int", { name: "IdProforma" })
  idProforma: number;

  @Column("nvarchar", { name: "LugardeFirma", length: 60 })
  lugardeFirma: string;

  @Column("int", { name: "Pais" })
  pais: number;

  @Column("int", { name: "IdProveedor" })
  idProveedor: number;

  @Column("nvarchar", { name: "NProveedor", nullable: true, length: 250 })
  nProveedor: string | null;

  @Column("nvarchar", { name: "NombreRepresentante", length: 100 })
  nombreRepresentante: string;

  @Column("nvarchar", { name: "CargoRepresentante", length: 100 })
  cargoRepresentante: string;

  @Column("nvarchar", { name: "DireccionProveedor", length: 500 })
  direccionProveedor: string;

  @Column("int", { name: "IdComprador" })
  idComprador: number;

  @Column("int", { name: "Vigencia", default: () => "(1095)" })
  vigencia: number;

  @Column("datetime", { name: "FechaVencimiento", nullable: true })
  fechaVencimiento: Date | null;

  @Column("bit", { name: "Aprobado", default: () => "(0)" })
  aprobado: boolean;

  @Column("bit", { name: "Cancelado", default: () => "(0)" })
  cancelado: boolean;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo: boolean;

  @Column("datetime", { name: "Actualizado", default: () => "getdate()" })
  actualizado: Date;

  @Column("nvarchar", { name: "NoContrato", nullable: true, length: 4000 })
  noContrato: string | null;

  @ManyToOne(
    () => Clasificaciones,
    (clasificaciones) => clasificaciones.basesGenerales,
    { onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "IdClasificacion", referencedColumnName: "idClasificacion" },
  ])
  idClasificacion: Clasificaciones;

  @ManyToOne(() => TipoContrato, (tipoContrato) => tipoContrato.basesGenerales)
  @JoinColumn([
    { name: "IdTipoContrato", referencedColumnName: "idTipoContrato" },
  ])
  idTipoContrato2: TipoContrato;

  @ManyToOne(() => Incoterm, (incoterm) => incoterm.basesGenerales)
  @JoinColumn([{ name: "IdIncoterm", referencedColumnName: "idIncoterm" }])
  incoterm: Incoterm;

  @OneToMany(
    () => BasesGeneralesClausulas,
    (basesGeneralesClausulas) => basesGeneralesClausulas.idBaseGenerales2
  )
  basesGeneralesClausulas: BasesGeneralesClausulas[];
}
