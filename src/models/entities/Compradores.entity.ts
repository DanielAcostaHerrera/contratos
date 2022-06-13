import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesGenerales } from "./BasesGenerales.entity";
import { DatosEntidad } from "./DatosEntidad.entity";
import { SolicitudContratacion } from "./SolicitudContratacion.entity";

@ObjectType()
@Index("PK_Compradores", ["idComprador"], { unique: true })
@Entity("Compradores", { schema: "CONTRATO.dbo" })
export class Compradores {
  @PrimaryGeneratedColumn({ type: "int", name: "IdComprador" })
  @Field(() => Int)
  idComprador: number;

  @Column("int", { name: "IdEntidad"})
  @Field(() => Int,{nullable: true})
  idEntidad: number;

  @Column("nvarchar", { name: "Nombre", nullable: true, length: 100 })
  @Field({nullable: true})
  nombre: string | null;

  @Column("nvarchar", { name: "Representante", nullable: true, length: 100 })
  @Field({nullable: true})
  representante: string | null;

  @Column("nvarchar", { name: "Domicilio", nullable: true, length: 100 })
  @Field({nullable: true})
  domicilio: string | null;

  @Column("nvarchar", { name: "Cargo", nullable: true, length: 100 })
  @Field({nullable: true})
  cargo: string | null;

  @Column("bit", { name: "Doble", nullable: true })
  @Field({nullable: true})
  doble: boolean | null;

  @Column("bit", { name: "Activo", nullable: true })
  @Field({nullable: true})
  activo: boolean | null;

  @Field(() => [BasesGenerales], { nullable: true })
  @OneToMany(() => BasesGenerales,(basesGenerales) => basesGenerales.compradores)
  basesGenerales: BasesGenerales[];

  @Field(() => [SolicitudContratacion], { nullable: true })
  @OneToMany(() => SolicitudContratacion,(solicitudContratacion) => solicitudContratacion.comprador)
  solicitudContratacion: SolicitudContratacion[];

  @Field(() => DatosEntidad, {nullable: true})
  @ManyToOne(() => DatosEntidad, (datosEntidad) => datosEntidad.compradores)
  @JoinColumn([{ name: "IdEntidad", referencedColumnName: "idEntidad" }])
  entidad: DatosEntidad;
}
