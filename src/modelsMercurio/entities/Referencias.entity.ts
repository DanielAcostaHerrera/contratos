import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContratoDesglose } from "../../models/entities/ContratoDesglose.entity";
import { FacturaDesglose } from "../../models/entities/FacturaDesglose.entity";
import { SolicitudCodificacion } from "../../models/entities/SolicitudCodificacion.entity";
import { SolicitudOfertasEntradas } from "../../models/entities/SolicitudOfertasEntradas.entity";
import { SuplementoDesglose } from "../../models/entities/SuplementoDesglose.entity";
import { CodigosParaLaVenta } from "./CodigosParaLaVenta.entity";

@ObjectType()
@Index("aaaaaReferencias_PK", ["referenciaId"], { unique: true })
@Index("Detalle de Circulares (Altas)Referencias", ["idCodigo"], {})
@Index("IdCodigo", ["idCodigo"], {})
@Index("IX_Referencias_Actualizacion", ["actualizacion"], {})
@Index("Referencia", ["referencia"], {})
@Entity("Referencias", { schema: "Mercurio.dbo" })
export class Referencias {
  @PrimaryGeneratedColumn({ type: "int", name: "ReferenciaId" })
  @Field(() => Int)
  referenciaId: number;

  @Column("int", { name: "IdCodigo", default: () => "0" })
  @Field(() => Int)
  idCodigo: number;

  @Column("nvarchar", { name: "Referencia", length: 30 })
  @Field()
  referencia: string;

  @Column("datetime", { name: "Actualizacion", default: () => "getdate()" })
  @Field()
  actualizacion: Date;

  @Column("timestamp", { name: "upsize_ts", nullable: true })
  @Field({nullable: true})
  upsizeTs: Date | null;

  @Column("bit", { name: "Emitida", default: () => "0" })
  @Field()
  emitida: boolean;

  @Column("int", { name: "ProveedorRef", nullable: true })
  @Field(() => Int,{nullable: true})
  proveedorRef: number | null;

  @Field(() => [ContratoDesglose], { nullable: true })
  @OneToMany(() => ContratoDesglose,(contratoDesglose) => contratoDesglose.referencia)
  contratoDesgloses: ContratoDesglose[];

  @Field(() => [FacturaDesglose], { nullable: true })
  @OneToMany(() => FacturaDesglose,(facturaDesglose) => facturaDesglose.referencia)
  facturaDesgloses: FacturaDesglose[];

  @Field(() => [SuplementoDesglose], { nullable: true })
  @OneToMany(() => SuplementoDesglose,(suplementoDesgloses) => suplementoDesgloses.referencia)
  suplementoDesgloses: SuplementoDesglose[];

  @Field(() => [SolicitudOfertasEntradas], { nullable: true })
  @OneToMany(() => SolicitudOfertasEntradas,(solicitudOfertasEntradas) => solicitudOfertasEntradas.referencia)
  solicitudOfertasEntradas: SolicitudOfertasEntradas[];

  @Field(() => [SolicitudCodificacion], { nullable: true })
  @OneToMany(() => SolicitudCodificacion,(solicitudCodificacion) => solicitudCodificacion.referencia)
  solicitudCodificacion: SolicitudCodificacion[];

  @Field(() => CodigosParaLaVenta, {nullable: true})
  @OneToOne(() => CodigosParaLaVenta, (codigo) => codigo.referencia)
  @JoinColumn([{ name: "IdCodigo", referencedColumnName: "idCodigo" }])
  codigo: CodigosParaLaVenta;
}
