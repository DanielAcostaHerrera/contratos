import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PliegoConcurrenciaDetalle } from "./PliegoConcurrenciaDetalle.entity";
import { SolicitudCodificacion } from "./SolicitudCodificacion.entity";

@ObjectType()
@Index("PK_CTO_Embalajes", ["idEmbalaje"], { unique: true })
@Entity("Embalajes", { schema: "CONTRATO.dbo" })
export class Embalajes {
  @PrimaryGeneratedColumn({ type: "int", name: "IdEmbalaje" })
  @Field(() => Int)
  idEmbalaje: number;

  @Column("nvarchar", { name: "Descripcion", nullable: true, length: 35 })
  @Field({nullable: true})
  descripcion: string | null;

  @Column("nvarchar", { name: "Abreviatura", nullable: true, length: 7 })
  @Field({nullable: true})
  abreviatura: string | null;

  @Field(() => [PliegoConcurrenciaDetalle], {nullable: true})
  @OneToMany(() => PliegoConcurrenciaDetalle,(pliegoConcurrenciaDetalle) => pliegoConcurrenciaDetalle.embalaje)
  pliegoConcurrenciaDetalles: PliegoConcurrenciaDetalle[];

  @Field(() => [SolicitudCodificacion], {nullable: true})
  @OneToMany(() => SolicitudCodificacion,(solicitudCodificacion) => solicitudCodificacion.embalaje)
  solicitudCodificacion: SolicitudCodificacion[];
}
