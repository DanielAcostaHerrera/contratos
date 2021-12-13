import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Index("PK_CambiosSuplementos", ["idCambio"], { unique: true })
@Entity("CambiosSuplementos", { schema: "dbo" })
export class CambiosSuplementos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdCambio" })
  @Field(() => Int)
  idCambio: number;

  @Column("nvarchar", { name: "Descripción", length: 150 })
  @Field()
  descripciN: string;
}
