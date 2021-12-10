import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contratos } from "./Contratos.entity";
import { FichaCompraResumen } from "./FichaCompraResumen.entity";
import { FichaCostoResumen } from "./FichaCostoResumen.entity";
import { NegociacionResumen } from "./NegociacionResumen.entity";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";
import { SuplementoResumen } from "./SuplementoResumen.entity";

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

  @Field(() => [FichaCostoResumen])
  @OneToMany(() => FichaCostoResumen,(fichaCostoResumen) => fichaCostoResumen.moneda)
  fichaCostoResumen: FichaCostoResumen[];

  @Field(() => [PliegoConcurrenciaResumen])
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.monedaOferta)
  pliegoConcurrenciaResumenOferta: PliegoConcurrenciaResumen[];

  @Field(() => [PliegoConcurrenciaResumen])
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.monedaPago)
  pliegoConcurrenciaResumenPago: PliegoConcurrenciaResumen[];

  @Field(() => [PliegoConcurrenciaResumen])
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.monedaCartaCredito)
  pliegoConcurrenciaResumenCredito: PliegoConcurrenciaResumen[];

  @Field(() => [Contratos])
  @OneToMany(() => Contratos, (contratos) => contratos.moneda)
  contratos: Contratos[];

  @Field(() => [SuplementoResumen])
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.moneda)
  suplementoResumen: SuplementoResumen[];
}
