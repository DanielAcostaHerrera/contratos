import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TiposDeClausulas } from "./TiposDeClausulas.entity";
import { BasesGenerales } from "./BasesGenerales.entity";
import { ProformaClausulas } from "./ProformaClausulas.entity";

@Index(
  "IX_CTO_CTO_BasesGeneralesClausulasIdBaseGenerales",
  ["idBaseGenerales"],
  {}
)
@Index(
  "IX_CTO_CTO_BasesGeneralesClausulasIdProformaClausula",
  ["idProformaClausula"],
  {}
)
@Index(
  "IX_CTO_CTO_BasesGeneralesClausulasIdTipoClausula",
  ["idTipoClausula"],
  {}
)
@Index(
  "PK_CTO_CTO_BasesGeneralesClausulas",
  ["idBaseGenerales", "idProformaClausula", "idTipoClausula"],
  { unique: true }
)
@Entity("BasesGeneralesClausulas", { schema: "dbo" })
export class BasesGeneralesClausulas {
  @Column("int", { primary: true, name: "IdBaseGenerales" })
  idBaseGenerales: number;

  @Column("int", { primary: true, name: "IdProformaClausula" })
  idProformaClausula: number;

  @Column("int", { primary: true, name: "IdTipoClausula" })
  idTipoClausula: number;

  @Column("int", { name: "Orden" })
  orden: number;

  @Column("nvarchar", { name: "Clausula" })
  clausula: string;

  @Column("bit", { name: "Excepcional", default: () => "(0)" })
  excepcional: boolean;

  @Column("datetime", { name: "Modificado", default: () => "getdate()" })
  modificado: Date;

  @ManyToOne(
    () => TiposDeClausulas,
    (tiposDeClausulas) => tiposDeClausulas.basesGeneralesClausulas
  )
  @JoinColumn([
    { name: "IdTipoClausula", referencedColumnName: "idTipoClausula" },
  ])
  idTipoClausula2: TiposDeClausulas;

  @ManyToOne(
    () => BasesGenerales,
    (basesGenerales) => basesGenerales.basesGeneralesClausulas,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "IdBaseGenerales", referencedColumnName: "idBaseGenerales" },
  ])
  idBaseGenerales2: BasesGenerales;

  @ManyToOne(
    () => ProformaClausulas,
    (proformaClausulas) => proformaClausulas.basesGeneralesClausulas
  )
  @JoinColumn([
    { name: "IdProformaClausula", referencedColumnName: "idProformaClausula" },
  ])
  proformaClausula: ProformaClausulas;
}
