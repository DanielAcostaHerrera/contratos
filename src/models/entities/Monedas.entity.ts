import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FichaCompraResumen } from "./FichaCompraResumen.entity";
import { NegociacionResumen } from "./NegociacionResumen.entity";

@ObjectType()
@Index("IX_NOM_MonedasAbreviatura", ["abreviatura"], { unique: true })
@Index("PK_NOM_Monedas", ["idMoneda"], { unique: true })
@Entity("NOM_Monedas", { schema: "dbo" })
export class Monedas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdMoneda" })
  @Field(() => Int)
  idMoneda: number;

  @Column("varchar", { name: "Moneda", length: 50 })
  @Field()
  moneda: string;

  @Column("nvarchar", { name: "Abreviatura", nullable: true, length: 3 })
  @Field()
  abreviatura: string | null;

  @Field(() => [NegociacionResumen])
  @OneToMany(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.monedas)
  negociacionResumen: NegociacionResumen[];

  @Field(() => [FichaCompraResumen])
  @OneToMany(() => FichaCompraResumen,(fichaCompraResumen) => fichaCompraResumen.moneda)
  fichaCompraResumen: FichaCompraResumen[];
}
