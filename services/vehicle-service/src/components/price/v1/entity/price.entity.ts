import { Vehicle } from "@components/bike/v1/entity";
import { Currency } from "@utils/enums";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("Price")
export class Price {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Index({ unique: true })
  @Column({
    type: "text",
  })
  public readonly plan_id: string;

  @Column({
    type: "text",
  })
  public readonly name: string;

  @Column({
    type: "text",
  })
  public readonly currency: Currency;

  @Column({
    type: "integer",
  })
  public readonly price: number;

  @Column({
    type: "boolean",
  })
  public readonly is_taxable: boolean;

  @Column({
    type: "text",
  })
  public readonly description: string;

  @Column({
    type: "text",
    transformer: {
      to: (value: string) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value),
    },
  })
  public readonly per_min_pricing: string;

  @OneToMany(() => Vehicle, (Vehicle) => Vehicle.price)
  public readonly vehicle: Vehicle[];
}
