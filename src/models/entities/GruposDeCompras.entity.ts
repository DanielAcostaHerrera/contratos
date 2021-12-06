import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ejecutivos } from "./Ejecutivos.entity";
import { NegociacionResumen } from "./NegociacionResumen.entity";

@ObjectType()
@Index("IX_GruposDeCompras", ["grupos"], { unique: true })
@Index("PK_GruposDeCompras", ["idGrupo"], { unique: true })
@Entity("GruposDeCompras", { schema: "dbo" })
export class GruposDeCompras {
  @PrimaryGeneratedColumn({ type: "int", name: "IdGrupo" })
  @Field(() => Int)
  idGrupo: number;

  @Column("nvarchar", { name: "Grupos", length: 50 })
  @Field()
  grupos: string;

  @Field(() => [Ejecutivos], { nullable: true })
  @OneToMany(() => Ejecutivos, (ejecutivos) => ejecutivos.grupo)
  ejecutivos: Ejecutivos[];

  @Field(() => [NegociacionResumen], { nullable: true })
  @OneToMany(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.grupos)
  negociacionResumen: NegociacionResumen[];
}
