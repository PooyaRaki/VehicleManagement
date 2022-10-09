import { ApiResult } from "@utils/interfaces";

export interface FeedAddress {
    name: string,
    url: string;
}

export interface FeedApiResult extends ApiResult {
    data: {
        en: {
            feeds: FeedAddress[],
        }
    };
}

export interface FeedOutput {
    gbfs_versions: string;
    vehicle_types: string;
    station_status: string;
    geofencing_zones: string;
    free_bike_status: string;
    system_information: string;
    station_information: string;
    system_pricing_plans: string;
}