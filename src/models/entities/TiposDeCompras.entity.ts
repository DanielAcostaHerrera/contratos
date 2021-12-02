import { Column, Entity, Index, OneToMany } from "typeorm";
import { NegociacionResumen } from "./NegociacionResumen.entity";

@Index("PK_TiposDeCompras", ["idTipoCompras"], { unique: true })
@Entity("TiposDeCompras", { schema: "dbo" })
export class TiposDeCompras {
  @Column("nchar", { primary: true, name: "IdTipoCompras", length: 1 })
  idTipoCompras: string;

  @Column("nchar", { name: "Compras", nullable: true, length: 300 })
  compras: string | null;

  @OneToMany(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.idTipoCompras)
  negociacionResumen: NegociacionResumen[];
}
