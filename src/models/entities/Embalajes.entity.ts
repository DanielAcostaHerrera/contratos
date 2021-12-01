import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Index("PK_CTO_Embalajes", ["idEmbalaje"], { unique: true })
@Entity("Embalajes", { schema: "dbo" })
export class Embalajes {
  @PrimaryGeneratedColumn({ type: "int", name: "IdEmbalaje" })
  @Field(() => Int)
  idEmbalaje: number;

  @Column("nvarchar", { name: "Descripcion", nullable: true, length: 35 })
  @Field()
  descripcion: string | null;

  @Column("nvarchar", { name: "Abreviatura", nullable: true, length: 7 })
  @Field()
  abreviatura: string | null;
}
