import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesGenerales } from "./BasesGenerales.entity";

@ObjectType()
@Index("PK_NOM_Clasificaciones", ["idClasificacion"], { unique: true })
@Entity("NOM_Clasificaciones", { schema: "CONTRATO.dbo" })
export class Clasificaciones {
  @PrimaryGeneratedColumn({ type: "int", name: "IdClasificacion" })
  @Field(() => Int)
  idClasificacion: number;

  @Column("nvarchar", { name: "Clasificacion", length: 50 })
  @Field()
  clasificacion: string;

  @Field(() => [BasesGenerales] , {nullable: true})
  @OneToMany(() => BasesGenerales,(basesGenerales) => basesGenerales.clasificaciones)
  basesGenerales: BasesGenerales[];
}
