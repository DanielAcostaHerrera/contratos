import { Field, Int, Float, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NegociacionResumen } from "./NegociacionResumen.entity";

@ObjectType()
@Index("IX_NegociacionDetalle", ["idNegociacion", "idProveedor"], {
  unique: true,
})
@Index("PK_NegociacionDetalle", ["idNegociacionDetalle"], {
  unique: true,
})

@Entity("NegociacionDetalle", { schema: "dbo" })
export class NegociacionDetalle {
  @PrimaryGeneratedColumn({ type: "int", name: "IdNegociacionDetalle" })
  @Field(() => Int)
  idNegociacionDetalle: number;

  @Column("int", { name: "IdNegociacion" })
  @Field(() => Int)
  idNegociacion: number;

  @Column("int", { name: "IdProveedor" })
  @Field(() => Int)
  idProveedor: number;

  @Column("float", { name: "ImporteTRD", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  importeTrd: number;

  @Column("float", { name: "ImporteGAE", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  importeGae: number;

  @Column("float", { name: "ImporteCUC", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  importeCuc: number;

  @Column("datetime", { name: "Fecha" })
  @Field()
  fecha: Date;

  @Column("float", { name: "Tasa", precision: 53 })
  @Field(() => Float)
  tasa: number;

  @Column("int", { name: "IdAcuerdo", nullable: true })
  @Field(() => Int)
  idAcuerdo: number | null;

  @Column("nvarchar", { name: "Detalles" })
  @Field()
  detalles: string;

  @Field(() => NegociacionResumen)
  @ManyToOne(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.negociacionDetalle)
  @JoinColumn([{ name: "IdNegociacion", referencedColumnName: "idNegociacion" },])
  negociacionResumen: NegociacionResumen;
}
