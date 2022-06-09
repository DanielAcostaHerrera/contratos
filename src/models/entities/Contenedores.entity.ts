import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FacturaContenedor } from "./FacturaContenedor.entity";

@ObjectType()
@Index("PK_Contenedores", ["idContenedor"], { unique: true })
@Entity("Contenedores", { schema: "CONTRATO.dbo" })
export class Contenedores {
  @PrimaryGeneratedColumn({ type: "int", name: "IdContenedor" })
  @Field(() => Int)
  idContenedor: number;

  @Column("int", { name: "IdFactura"})
  @Field()
  idFactura: string;

  @Column("nvarchar", { name: "NoContenedor", length: 20 })
  @Field()
  noContenedor: string;
}
