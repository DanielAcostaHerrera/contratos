import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ejecutivos } from "./Ejecutivos.entity";

@ObjectType()
@Index("IX_CargosCargo", ["cargo"], { unique: true })
@Index("PK_Cargos", ["idCargo"], { unique: true })
@Entity("NOM_Cargos", { schema: "CONTRATO.dbo" })
export class Cargos {
  
  @PrimaryGeneratedColumn({ type: "int", name: "IdCargo" })
  @Field(() => Int)
  idCargo: number;

  
  @Column("nvarchar", { name: "Cargo", length: 50 })
  @Field()
  cargo: string;

  @Field(() => [Ejecutivos], { nullable: true })
  @OneToMany(() => Ejecutivos, (ejecutivos) => ejecutivos.cargo)
  ejecutivos: Ejecutivos[];

}
