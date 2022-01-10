import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ejecutivos } from "./Ejecutivos.entity";
import { NegociacionResumen } from "./NegociacionResumen.entity";

@ObjectType()
@Index("PK_GruposDeCompras", ["idGrupo"], { unique: true })
@Entity("GruposDeCompras", { schema: "CONTRATO.dbo" })
export class GruposDeCompras {
  @PrimaryGeneratedColumn({ type: "int", name: "IdGrupo" })
  @Field(() => Int)
  idGrupo: number;

  @Column("nvarchar", { name: "Grupos", length: 500 })
  @Field()
  grupos: string;

  @Field(() => [Ejecutivos])
  @OneToMany(() => Ejecutivos, (ejecutivos) => ejecutivos.grupo)
  ejecutivos: Ejecutivos[];

  @Field(() => [NegociacionResumen])
  @OneToMany(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.grupo)
  negociacionResumen: NegociacionResumen[];
}
