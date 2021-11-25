import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ejecutivos } from "./Ejecutivos.entity";

@ObjectType()
@Index("PK_Cargos", ["idCargo"], { unique: true })
@Entity("Cargos", { schema: "dbo" })
export class Cargos {
  @PrimaryGeneratedColumn({ type: "tinyint", name: "IDCargo"})
  @Field(() => Int)
  idCargo: number;

  @Field()
  @Column("nvarchar", { length: 50 })
  cargo: string;

  @Field()
  @Column("uniqueidentifier", {
    name: "msrepl_tran_version",
    default: () => "newid()",
  })
  msreplTranVersion: string;

  @Field(() => [Ejecutivos])
  @OneToMany(() => Ejecutivos, (ejecutivos) => ejecutivos.cargo)
  ejecutivos: Ejecutivos[];
}
