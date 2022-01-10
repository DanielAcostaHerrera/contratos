import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SolicitudOfertasEntradas } from "./SolicitudOfertasEntradas.entity";
import { SolicitudOfertas } from "./SolicitudOfertas.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Proveedores } from "../../modelsMercurio/entities/Proveedores.entity";

@ObjectType()
@Index("IX_SolicitudOfertasProveedor", ["idOferta", "idProveedor"], {
  unique: true,
})
@Index("PK_SolicitudOfertaProveedor", ["idOfertasProveedor"], { unique: true })
@Entity("SolicitudOfertasProveedor", { schema: "CONTRATO.dbo" })
export class SolicitudOfertasProveedor {
  @PrimaryGeneratedColumn({ type: "int", name: "IdOfertasProveedor" })
  @Field(() => Int)
  idOfertasProveedor: number;

  @Column("int", { name: "IdOferta" })
  @Field(() => Int)
  idOferta: number;

  @Column("smallint", { name: "IdProveedor" })
  @Field(() => Int)
  idProveedor: number;

  @Field(() => [SolicitudOfertasEntradas], {nullable: true})
  @OneToMany(() => SolicitudOfertasEntradas,(solicitudOfertasEntradas) => solicitudOfertasEntradas.ofertasProveedor)
  solicitudOfertasEntradas: SolicitudOfertasEntradas[];

  @Field(() => SolicitudOfertas, {nullable: true})
  @ManyToOne(() => SolicitudOfertas,(solicitudOfertas) => solicitudOfertas.solicitudOfertasProveedores)
  @JoinColumn([{ name: "IdOferta", referencedColumnName: "idOferta" }])
  solicitudOfertas: SolicitudOfertas;

  @Field(() => Proveedores, {nullable: true})
  @ManyToOne(() => Proveedores, (proveedores) => proveedores.solicitudOfertasProveedores)
  @JoinColumn([{ name: "IdProveedor", referencedColumnName: "codigo" }])
  proveedor: Proveedores;
}
