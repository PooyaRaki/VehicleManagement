export interface ApiResult {
    ttl: number;
    version: string;
    last_updated: number;
}

export interface Feedable {
    parseFeed(): Promise<boolean>
}