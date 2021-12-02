import { Column, Entity, Index, OneToMany } from "typeorm";
import { Documentacion } from "./Documentacion.entity";

@Index("PK_CTO_TiposDocumento", ["idTipoDoc"], { unique: true })
@Entity("TiposDocumento", { schema: "dbo" })
export class TiposDocumento {
  @Column("int", { primary: true, name: "IdTipoDoc" })
  idTipoDoc: number;

  @Column("nvarchar", { name: "NombreDoc", length: 150 })
  nombreDoc: string;

  @OneToMany(() => Documentacion, (documentacion) => documentacion.tiposDocumento)
  documentacions: Documentacion[];
}
