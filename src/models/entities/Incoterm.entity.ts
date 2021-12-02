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
@Index("IX_Incoterm", ["abreviatura"], { unique: true })
@Index("PK_Incoterm", ["idIncoterm"], { unique: true })
@Entity("NOM_Incoterm", { schema: "dbo" })
export class Incoterm {
  @PrimaryGeneratedColumn({ type: "int", name: "IdIncoterm" })
  @Field(() => Int)
  idIncoterm: number;

  @Column("nvarchar", { name: "Nombre", length: 100 })
  @Field()
  nombre: string;

  @Column("nvarchar", { name: "Abreviatura", length: 50 })
  @Field()
  abreviatura: string;

  @Column("nvarchar", { name: "Nota", nullable: true, length: 500 })
  @Field()
  nota: string | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  @Field()
  activo: boolean;

  @Field(() => [BasesGenerales] , {nullable: true})
  @OneToMany(() => BasesGenerales,(basesGenerales) => basesGenerales.incoterm)
  basesGenerales: BasesGenerales[];
}
