import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NegociacionResumen } from "./NegociacionResumen.entity";

@ObjectType()
@Index("PK_NegociacionProveedores", ["idNegociacionProveedores"], {
  unique: true,
})
@Index("IX_NegociacionProveedores", ["idNegociacion", "proveedor"], {
  unique: true,
})

@Entity("NegociacionProveedores", { schema: "CONTRATO.dbo" })
export class NegociacionProveedores {
  @PrimaryGeneratedColumn({ type: "int", name: "IdNegociacionProveedores" })
  @Field(() => Int)
  idNegociacionProveedores: number;

  @Column("int", { primary: true, name: "IdNegociacion" })
  @Field(() => Int)
  idNegociacion: number;

  @Column("int", { primary: true, name: "Proveedor" })
  @Field(() => Int)
  proveedor: number;

  @Column("float", { name: "Importe", nullable: true, precision: 53 })
  @Field(() => Float)
  importe: number | null;

  @Column("bit", { name: "LADI" })
  @Field()
  ladi: boolean;

  @Field(() => NegociacionResumen, {nullable: true})
  @ManyToOne(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.negociacionProveedores)
  @JoinColumn([{ name: "IdNegociacion", referencedColumnName: "idNegociacion" }])
  negociacionResumen: NegociacionResumen;
}
