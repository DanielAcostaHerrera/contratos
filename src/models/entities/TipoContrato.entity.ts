import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BasesGenerales } from "./BasesGenerales.entity";

@ObjectType()
@Index("IX_CTO_TipoContrato", ["tipoContrato"], { unique: true })
@Index("PK_CTO_TipoContrato", ["idTipoContrato"], { unique: true })
@Entity("TipoContrato", { schema: "dbo" })
export class TipoContrato {
  @PrimaryGeneratedColumn({ type: "int", name: "IdTipoContrato" })  
  @Field(() => Int)
  idTipoContrato: number;

  @Column("nvarchar", { name: "TipoContrato", length: 50 })
  @Field()
  tipoContrato: string;

  @Column("nvarchar", { name: "Encabezado", nullable: true, length: 70 })
  @Field()
  encabezado: string | null;

  @Column("nvarchar", { name: "AmbasPartes", nullable: true, length: 3000 })
  @Field()
  ambasPartes: string | null;

  @Column("bit", { name: "Visible", default: () => "(1)" })
  @Field()
  visible: boolean;

  @Field(() => [BasesGenerales] , {nullable: true})
  @OneToMany(() => BasesGenerales,(basesGenerales) => basesGenerales.tipoDeContrato)
  basesGenerales: BasesGenerales[];
}
