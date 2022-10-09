import { Vehicle } from "@components/bike/v1/entity";
import { Currency } from "@utils/enums";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Price')
export class Price {
    @PrimaryGeneratedColumn()
    public id: number;

    @Index({ unique: true })
    @Column({
        type: 'text',
    })
    public plan_id: string;

    @Column({
        type: 'text',
    })
    public name: string;

    @Column({
        type: 'text',
    })
    public currency: Currency;

    @Column({
        type: 'integer',
    })
    public price: number;

    @Column({
        type: 'boolean',
    })
    public is_taxable: boolean;

    @Column({
        type: 'text',
    })
    public description: string;

    @Column({
        type: 'text',
        transformer: {
            to: (value: string) => JSON.stringify(value),
            from: (value: string) => JSON.parse(value),
          },
    })
    public per_min_pricing: string;

    @OneToMany(() => Vehicle, Vehicle => Vehicle.price)
    public vehicle: Vehicle[];
}