import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesGenerales } from "./BasesGenerales.entity";

@Index("IX_Incoterm", ["abreviatura"], { unique: true })
@Index("PK_Incoterm", ["idIncoterm"], { unique: true })
@Entity("Incoterm", { schema: "dbo" })
export class Incoterm {
  @PrimaryGeneratedColumn({ type: "int", name: "IdIncoterm" })
  idIncoterm: number;

  @Column("nvarchar", { name: "Nombre", length: 100 })
  nombre: string;

  @Column("nvarchar", { name: "Abreviatura", length: 50 })
  abreviatura: string;

  @Column("nvarchar", { name: "Nota", nullable: true, length: 500 })
  nota: string | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo: boolean;

  @OneToMany(
    () => BasesGenerales,
    (basesGenerales) => basesGenerales.incoterm
  )
  basesGenerales: BasesGenerales[];
}
