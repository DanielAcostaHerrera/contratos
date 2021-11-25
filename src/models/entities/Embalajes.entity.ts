import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Index("PK_Embalajes", ["id"], { unique: true })
@Entity("Embalajes", { schema: "dbo" })
export class Embalajes {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field({nullable: true})
  @Column("nvarchar", { name: "Codigo", nullable: true, length: 2 })
  codigo: string | null;

  @Field({nullable: true})
  @Column("nvarchar", { name: "Descripcion", nullable: true, length: 35 })
  descripcion: string | null;

  @Field({nullable: true})
  @Column("nvarchar", { name: "Abreviatura", nullable: true, length: 7 })
  abreviatura: string | null;

  @Field()
  @Column("uniqueidentifier", {
    name: "msrepl_tran_version",
    default: () => "newid()",
  })
  msreplTranVersion: string;
}
