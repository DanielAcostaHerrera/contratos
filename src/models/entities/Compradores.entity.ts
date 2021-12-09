import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesCMarco } from "./BasesCMarco.entity";
import { BasesGenerales } from "./BasesGenerales.entity";
import { SolicitudContratacion } from "./SolicitudContratacion.entity";

@ObjectType()
@Index("PK_Compradores", ["idComprador"], { unique: true })
@Entity("Compradores", { schema: "dbo" })
export class Compradores {
  @PrimaryGeneratedColumn({ type: "int", name: "IdComprador" })
  @Field(() => Int)
  idComprador: number;

  @Column("nvarchar", { name: "Nombre", nullable: true, length: 100 })
  @Field()
  nombre: string | null;

  @Column("nvarchar", { name: "Representante", nullable: true, length: 100 })
  @Field()
  representante: string | null;

  @Column("nvarchar", { name: "Domicilio", nullable: true, length: 100 })
  @Field()
  domicilio: string | null;

  @Column("nvarchar", { name: "Cargo", nullable: true, length: 100 })
  @Field()
  cargo: string | null;

  @Column("bit", { name: "Doble", nullable: true })
  @Field()
  doble: boolean | null;

  @Column("bit", { name: "Activo", nullable: true })
  @Field()
  activo: boolean | null;

  @Field(() => [BasesCMarco])
  @OneToMany(() => BasesCMarco, (basesCMarco) => basesCMarco.compradores)
  basesCMarcos: BasesCMarco[];

  @Field(() => [BasesGenerales])
  @OneToMany(() => BasesGenerales,(basesGenerales) => basesGenerales.compradores)
  basesGenerales: BasesGenerales[];

  @Field(() => [SolicitudContratacion])
  @OneToMany(() => SolicitudContratacion,(solicitudContratacion) => solicitudContratacion.comprador)
  solicitudContratacion: SolicitudContratacion[];
}
