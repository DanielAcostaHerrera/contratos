import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NegociacionResumen } from "./NegociacionResumen.entity";

@ObjectType()
@Index("PK_NegociacionDetalles", ["idNegociacionDetalles"], {
  unique: true,
})

@Index("IX_NegociacionDetalles", ["idNegociacion", "consecutivo"], {
  unique: true,
})

@Entity("NegociacionDetalles", { schema: "CONTRATO.dbo" })
export class NegociacionDetalles {
  @PrimaryGeneratedColumn({ type: "int", name: "IdNegociacionDetalles" })
  @Field(() => Int)
  idNegociacionDetalles: number;

  @Column("int", { name: "IdNegociacion" })
  @Field(() => Int)
  idNegociacion: number;

  @Column("int", { name: "Consecutivo" })
  @Field(() => Int)
  consecutivo: number;

  @Column("smalldatetime", { name: "Fecha", nullable: true })
  @Field({nullable: true})
  fecha: Date | null;

  @Column("int", { name: "Acuerdo", nullable: true })
  @Field(() => Int,{nullable: true})
  acuerdo: number | null;

  @Column("nchar", { name: "Detalles", nullable: true, length: 300 })
  @Field({nullable: true})
  detalles: string | null;

  @Field(() => NegociacionResumen, {nullable: true})
  @ManyToOne(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.negociacionDetalles)
  @JoinColumn([{ name: "IdNegociacion", referencedColumnName: "idNegociacion" }])
  negociacionResumen: NegociacionResumen;
}
