import { Currency } from "@utils/enums";
import { ApiResult } from "@utils/interfaces";

export interface BikeRentalUrls {
  ios: string;
  android: string;
}

export interface BikePricing {
  entry: number;
  perMinute: number;
  currency: Currency;
}

export interface Bike {
  lat: number;
  lon: number;
  bike_id: string;
  is_reserved: boolean;
  is_disabled: boolean;
  pricing_plan_id: string;
  vehicle_type_id: string;
  current_range_meters: number;
  pricing?: BikePricing;
}

export type BikeBriefData = Pick<
  Bike,
  "lat" | "lon" | "bike_id" | "is_disabled" | "is_reserved"
>;

export interface VehicleApiResult extends ApiResult {
  data: {
    bikes: Bike[];
  };
}
