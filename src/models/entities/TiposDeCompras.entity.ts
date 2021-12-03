import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NegociacionResumen } from "./NegociacionResumen.entity";

@ObjectType()
@Index("PK_TiposDeCompras", ["idTipoCompras"], { unique: true })
@Entity("TiposDeCompras", { schema: "dbo" })
export class TiposDeCompras {
  @PrimaryGeneratedColumn({ type: "int", name: "IdTipoCompras" })
  @Field(() => Int)
  idTipoCompras: number;

  @Column("nchar", { name: "Compras", nullable: true, length: 300 })
  @Field()
  compras: string | null;

  @Field(() => [NegociacionResumen])
  @OneToMany(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.tiposDeCompras)
  negociacionResumen: NegociacionResumen[];
}
