import { Currency } from "@utils/enums";
import { ApiResult } from "@utils/interfaces"

export interface PricePerMinute {
    rate: number;
    start: number;
    interval: number;
}

export interface PricePlan {
    name: string;
    price: number;
    plan_id: string;
    currency: Currency;
    description: string;
    is_taxable: boolean;
    per_min_pricing: string;
}

export interface PriceApiResult extends ApiResult {
    data: {
        plans: PricePlan[];
    };
}