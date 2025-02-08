import {Location as LocationEntity} from "@/model/Location.ts";

export type Transportation = {
    id: number;
    originLocation: LocationEntity;
    destinationLocation: LocationEntity;
    transportationType: string;
    operatingDays: Array<number>;
}