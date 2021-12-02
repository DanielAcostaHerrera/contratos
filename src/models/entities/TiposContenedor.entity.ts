import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Index("PK_CTO_TiposContenedor", ["idTipoContenedor"], { unique: true })
@Entity("TiposContenedor", { schema: "dbo" })
export class TiposContenedor {
  @PrimaryGeneratedColumn({ type: "int", name: "IdTipoContenedor" })
  @Field(() => Int)
  idTipoContenedor: number;

  @Column("nvarchar", { name: "TipoContenedor", length: 50 })
  @Field()
  tipoContenedor: string;
}
