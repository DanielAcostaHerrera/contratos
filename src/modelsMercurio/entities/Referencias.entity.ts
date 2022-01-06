import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Index("aaaaaReferencias_PK", ["referenciaId"], { unique: true })
@Index("Detalle de Circulares (Altas)Referencias", ["idCodigo"], {})
@Index("IdCodigo", ["idCodigo"], {})
@Index("IX_Referencias_Actualizacion", ["actualizacion"], {})
@Index("Referencia", ["referencia"], {})
@Entity("Referencias", { schema: "dbo" })
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
}
