import { Column, Entity, Index, OneToMany } from "typeorm";
import { BasesGenerales } from "./BasesGenerales.entity";

@Index("IX_CTO_TipoContrato", ["tipoContrato"], { unique: true })
@Index("PK_CTO_TipoContrato", ["idTipoContrato"], { unique: true })
@Entity("TipoContrato", { schema: "dbo" })
export class TipoContrato {
  @Column("int", { primary: true, name: "IdTipoContrato" })
  idTipoContrato: number;

  @Column("nvarchar", { name: "TipoContrato", length: 50 })
  tipoContrato: string;

  @Column("nvarchar", { name: "Encabezado", nullable: true, length: 70 })
  encabezado: string | null;

  @Column("nvarchar", { name: "AmbasPartes", nullable: true, length: 3000 })
  ambasPartes: string | null;

  @Column("bit", { name: "Visible", default: () => "(1)" })
  visible: boolean;

  @OneToMany(
    () => BasesGenerales,
    (basesGenerales) => basesGenerales.idTipoContrato2
  )
  basesGenerales: BasesGenerales[];
}
