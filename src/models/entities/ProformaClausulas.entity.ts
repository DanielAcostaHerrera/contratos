import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesCMarcoClausulas } from "./BasesCMarcoClausulas.entity";
import { BasesGeneralesClausulas } from "./BasesGeneralesClausulas.entity";
import { TiposDeClausulas } from "./TiposDeClausulas.entity";
import { Proformas } from "./Proformas.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("IX_CTO_ProformaClausulas", ["idProforma", "idTipoClausula", "orden"], {
  unique: true,
})
@Index("IX_CTO_ProformaClausulas_IdProforma", ["idProforma"], {})
@Index("IX_CTO_ProformaClausulas_IdTipoClausula", ["idTipoClausula"], {})
@Index("IX_CTO_ProformaClausulas_Orden", ["orden"], {})
@Index("PK_CTO_ProformaClausulas", ["idProformaClausula"], { unique: true })
@Entity("ProformaClausulas", { schema: "dbo" })
export class ProformaClausulas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdProformaClausula" })
  @Field(() => Int)
  idProformaClausula: number;

  @Column("int", { name: "IdProforma" })
  @Field(() => Int)
  idProforma: number;

  @Column("int", { name: "IdTipoClausula" })
  @Field(() => Int)
  idTipoClausula: number;

  @Column("int", { name: "Orden", default: () => "(1)" })
  @Field(() => Int)
  orden: number;

  @Column("nvarchar", { name: "Clausula" })
  @Field()
  clausula: string;

  @OneToMany(
    () => BasesCMarcoClausulas,
    (basesCMarcoClausulas) => basesCMarcoClausulas.proformaClausulas
  )
  basesCMarcoClausulas: BasesCMarcoClausulas[];

  @OneToMany(
    () => BasesGeneralesClausulas,
    (basesGeneralesClausulas) => basesGeneralesClausulas.proformaClausula
  )
  basesGeneralesClausulas: BasesGeneralesClausulas[];

  @ManyToOne(
    () => TiposDeClausulas,
    (tiposDeClausulas) => tiposDeClausulas.proformaClausulas
  )
  @JoinColumn([
    { name: "IdTipoClausula", referencedColumnName: "idTipoClausula" },
  ])
  tiposDeClausulas: TiposDeClausulas;

  @ManyToOne(() => Proformas, (proformas) => proformas.proformaClausulas, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "IdProforma", referencedColumnName: "idProforma" }])
  idProforma2: Proformas;
}
