import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasesGenerales } from "./BasesGenerales.entity";

@Index("PK_NOM_Clasificaciones", ["idClasificacion"], { unique: true })
@Entity("Clasificaciones", { schema: "dbo" })
export class Clasificaciones {
  @PrimaryGeneratedColumn({ type: "int", name: "IdClasificacion" })
  idClasificacion: number;

  @Column("nvarchar", { name: "Clasificacion", length: 50 })
  clasificacion: string;

  @OneToMany(
    () => BasesGenerales,
    (basesGenerales) => basesGenerales.idClasificacion
  )
  basesGenerales: BasesGenerales[];
}
