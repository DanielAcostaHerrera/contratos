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
import { Compradores } from "./Compradores.entity";
import { BasesCMarco } from "./BasesCMarco.entity";
import { Proveedores } from './../../modelsMercurio/entities/Proveedores.entity';
import { Paises } from './../../modelsMercurio/entities/Paises.entity';

@ObjectType()
@Index("IX_CTO_BasesGeneralesComprador", ["idComprador"], {})
@Index("IX_CTO_BasesGeneralesConsecutivo", ["consecutivo"], {})
@Index("IX_CTO_BasesGeneralesIncoterm", ["idIncoterm"], {})
@Index("IX_CTO_BasesGeneralesPais", ["pais"], {})
@Index("IX_CTO_BasesGeneralesProforma", ["idProforma"], {})
@Index("IX_CTO_BasesGeneralesProveedor", ["idProveedor"], {})
@Index("IX_CTO_BasesGeneralesTipoContrato", ["idTipoContrato"], {})
@Index("PK_CTO_BasesGenerales", ["idBasesGenerales"], { unique: true })
@Entity("BasesGenerales", { schema: "CONTRATO.dbo" })
export class BasesGenerales {
  @PrimaryGeneratedColumn({ type: "int", name: "IdBasesGenerales" })
  @Field(() => Int)
  idBasesGenerales: number;

  @Column("int", { name: "Consecutivo" })
  @Field(() => Int)
  consecutivo: number;

  @Column("datetime", { name: "Fecha" , default: () => "getdate()"})
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
  idPais: number;

  @Column("smallint", { name: "IdProveedor" })
  @Field(() => Int)
  idProveedor: number;

  @Column("int", { name: "IdComprador" })
  @Field(() => Int)
  idComprador: number;

  @Column("int", { name: "Vigencia", default: () => "(1095)" })
  @Field(() => Int)
  vigencia: number;

  @Column({ name: "FechaVencimiento", insert: false, update: false })
  @Field()
  fechaVencimiento: Date;

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

  @Column({ name: "NoContrato", insert: false, update: false })
  @Field()
  noContrato: string;

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

  @Field(() => Compradores , {nullable: true})
  @ManyToOne(() => Compradores, (compradores) => compradores.basesGenerales)
  @JoinColumn([{ name: "IdComprador", referencedColumnName: "idComprador" }])
  compradores: Compradores;

  @Field(() => [BasesGeneralesClausulas] , {nullable: true})
  @OneToMany(() => BasesGeneralesClausulas,(basesGeneralesClausulas) => basesGeneralesClausulas.basesGenerales)
  basesGeneralesClausulas: BasesGeneralesClausulas[];

  @Field(() => [Contratos] , {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.basesGenerales)
  contratos: Contratos[];

  @Field(() => [BasesCMarco], { nullable: true })
  @OneToMany(() => BasesCMarco,(basesCMarco) => basesCMarco.basesGenerales)
  basesCMarco: BasesCMarco[];

  @Field(() => Proveedores , {nullable: true})
  @ManyToOne(() => Proveedores, (proveedores) => proveedores.basesGenerales)
  @JoinColumn([{ name: "IdProveedor", referencedColumnName: "codigo" }])
  proveedor: Proveedores;

  @Field(() => Paises , {nullable: true})
  @ManyToOne(() => Paises, (paises) => paises.basesGenerales)
  @JoinColumn([{ name: "Pais", referencedColumnName: "pais" }])
  pais: Paises;
}
