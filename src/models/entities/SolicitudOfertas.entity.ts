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
import { PliegoConcurrencia } from "./PliegoConcurrencia.entity";
import { SolicitudContratacion } from "./SolicitudContratacion.entity";
import { SolicitudOfertasProveedor } from "./SolicitudOfertasProveedor.entity";

@ObjectType()
@Index("IX_SolicitudOfertasSolicitudContrato", ["idSolicitudContrato"], {})
@Index("PK_SolicitudOfertas", ["idOferta"], { unique: true })
@Entity("SolicitudOfertas", { schema: "dbo" })
export class SolicitudOfertas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdOferta" })
  @Field(() => Int)
  idOferta: number;

  @Column("int", { name: "IdSolicitudContrato" })
  @Field(() => Int)
  idSolicitudContrato: number;

  @Column("int", { name: "Consecutivo" })
  @Field(() => Int)
  consecutivo: number;

  @Column("nvarchar", { name: "Solicitud" })
  @Field()
  solicitud: string;

  @Column("datetime", { name: "FechaSolicitudOferta" })
  @Field()
  fechaSolicitudOferta: Date;

  @Column("datetime", { name: "FechaEnviadaOferta" })
  @Field()
  fechaEnviadaOferta: Date;

  @Column("datetime", { name: "FechaFin" })
  @Field()
  fechaFin: Date;

  @Column("bit", { name: "ContraOferta", default: () => "(0)" })
  @Field()
  contraOferta: boolean;

  @Column("bit", { name: "Terminada", default: () => "(0)" })
  @Field()
  terminada: boolean;

  @Column("bit", { name: "Cancelada", default: () => "(0)" })
  @Field()
  cancelada: boolean;

  @Column("int", { name: "ElaboradoPor" })
  @Field(() => Int)
  elaboradoPor: number;

  @Column("int", { name: "AprobadoPor" })
  @Field(() => Int)
  aprobadoPor: number;

  @Field(() => [PliegoConcurrencia])
  @OneToMany(() => PliegoConcurrencia,(pliegoConcurrencia) => pliegoConcurrencia.idOferta)
  pliegoConcurrencias: PliegoConcurrencia[];

  @Field(() => SolicitudContratacion)
  @ManyToOne(() => SolicitudContratacion,(solicitudContratacion) => solicitudContratacion.solicitudOfertas)
  @JoinColumn([{name: "IdSolicitudContrato",referencedColumnName: "idSolicitudContrato",}])
  solicitudContrato: SolicitudContratacion;

  @Field(() => [SolicitudOfertasProveedor])
  @OneToMany(() => SolicitudOfertasProveedor,(solicitudOfertasProveedor) => solicitudOfertasProveedor.solicitudOfertas)
  solicitudOfertasProveedores: SolicitudOfertasProveedor[];
}
