import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NegociacionResumen } from "./NegociacionResumen.entity";

@ObjectType()
@Index("PK_TiposDeCompras", ["idTipoCompras"], { unique: true })
@Index("IX_TiposDeCompras", ["compras"], { unique: true })
@Entity("TiposDeCompras", { schema: "CONTRATO.dbo" })
export class TiposDeCompras {
  @PrimaryGeneratedColumn({ type: "int", name: "IdTipoCompras" })
  @Field(() => Int)
  idTipoCompras: number;

  @Column("nvarchar", { name: "Compras", nullable: true, length: 300 })
  @Field({nullable: true})
  compras: string | null;

  @Field(() => [NegociacionResumen], {nullable: true})
  @OneToMany(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.tiposDeCompras)
  negociacionResumen: NegociacionResumen[];
}
