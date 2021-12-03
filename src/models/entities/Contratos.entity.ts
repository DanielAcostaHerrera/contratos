import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContratoDesglose } from "./ContratoDesglose.entity";
import { BasesGenerales } from "./BasesGenerales.entity";
import { TipoContrato } from "./TipoContrato.entity";
import { Proformas } from "./Proformas.entity";
import { DocumentacionContrato } from "./DocumentacionContrato.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_Contratos", ["idContrato"], { unique: true })
@Entity("Contratos", { schema: "dbo" })
export class Contratos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdContrato" })
  @Field(() => Int)
  idContrato: number;

  @Column("int", { name: "IdBasesGenerales" })
  @Field(() => Int)
  idBasesGenerales: number;

  @Column("int", { name: "IdTipoContrato" })
  @Field(() => Int)
  idTipoContrato: number;

  @Column("int", { name: "IdProforma" })
  @Field(() => Int)
  idProforma: number;
  
  @Column("int", { name: "Consecutivo" })
  @Field(() => Int)
  consecutivo: number;

  @Column("int", { name: "CondicionCompra" })
  @Field(() => Int)
  condicionCompra: number;

  @Column("nvarchar", { name: "Lugar", length: 50 })
  @Field()
  lugar: string;

  @Column("smalldatetime", { name: "Fecha" })
  @Field()
  fecha: Date;

  @Column("int", { name: "País" })
  @Field(() => Int)
  paS: number;

  @Column("bit", { name: "Cancelado", default: () => "(0)" })
  @Field()
  cancelado: boolean;

  @Column("bit", { name: "Terminado", default: () => "(0)" })
  @Field()
  terminado: boolean;

  @Column("nvarchar", { name: "NoContrato", nullable: true })
  @Field()
  noContrato: string | null;

  @Column("int", { name: "Proveedor", nullable: true })
  @Field(() => Int)
  proveedor: number;

  @Field(() => BasesGenerales)
  @ManyToOne(() => BasesGenerales, (basesGenerales) => basesGenerales.contratos)
  @JoinColumn([{ name: "IdBasesGenerales", referencedColumnName: "idBaseGenerales" }])
  basesGenerales: BasesGenerales;

  @Field(() => TipoContrato)
  @ManyToOne(() => TipoContrato, (tipoContrato) => tipoContrato.contratos)
  @JoinColumn([{ name: "IdTipoContrato", referencedColumnName: "idTipoContrato" }])
  tipoContrato: TipoContrato;

  @Field(() => Proformas)
  @ManyToOne(() => Proformas, (proformas) => proformas.contratos)
  @JoinColumn([{ name: "IdProforma", referencedColumnName: "idProforma" }])
  proformas: Proformas;

  @Field(() => [ContratoDesglose])
  @OneToMany(() => ContratoDesglose,(contratoDesglose) => contratoDesglose.contratos)
  contratoDesgloses: ContratoDesglose[];

  @Field(() => [DocumentacionContrato])
  @OneToMany(() => DocumentacionContrato,(documentacionContrato) => documentacionContrato.contratos)
  documentacionContratos: DocumentacionContrato[];
}
