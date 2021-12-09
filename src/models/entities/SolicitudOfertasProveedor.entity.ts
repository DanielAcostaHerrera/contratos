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

@ObjectType()
@Index("IX_SolicitudOfertasProveedor", ["idOferta", "idProveedor"], {
  unique: true,
})
@Index("PK_SolicitudOfertaProveedor", ["idOfertasProveedor"], { unique: true })
@Entity("SolicitudOfertasProveedor", { schema: "dbo" })
export class SolicitudOfertasProveedor {
  @PrimaryGeneratedColumn({ type: "int", name: "IdOfertasProveedor" })
  @Field(() => Int)
  idOfertasProveedor: number;

  @Column("int", { name: "IdOferta" })
  @Field(() => Int)
  idOferta: number;

  @Column("int", { name: "IdProveedor" })
  @Field(() => Int)
  idProveedor: number;

  @Column("nvarchar", { name: "Representante", nullable: true, length: 100 })
  @Field()
  representante: string | null;

  @Column("nvarchar", { name: "Cargo", nullable: true, length: 100 })
  @Field()
  cargo: string | null;

  @Field(() => [SolicitudOfertasEntradas])
  @OneToMany(() => SolicitudOfertasEntradas,(solicitudOfertasEntradas) => solicitudOfertasEntradas.ofertasProveedor)
  solicitudOfertasEntradas: SolicitudOfertasEntradas[];

  @Field(() => SolicitudOfertas)
  @ManyToOne(() => SolicitudOfertas,(solicitudOfertas) => solicitudOfertas.solicitudOfertasProveedores)
  @JoinColumn([{ name: "IdOferta", referencedColumnName: "idOferta" }])
  solicitudOfertas: SolicitudOfertas;
}
