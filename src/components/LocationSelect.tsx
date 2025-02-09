import {DebounceSelect} from "@/components/DebounceSelect";
import {useSelector} from "react-redux";
import {selectAuth} from "@/features/authSlice";
import {Location as LocationEntity} from "@/model/Location";
import type {SelectProps} from "antd/es/select";

export interface LocationSelectProps extends Omit<SelectProps, 'options' | 'children' | 'filterOption' | 'showSearch'> {

}

export function LocationSelect({
                                   ...props
                               }: LocationSelectProps) {
    const {token} = useSelector(selectAuth);

    return (
        <DebounceSelect
            filterOption={false}
            showSearch={true}
            fetchOptions={async (search: string) => {
                const response = await fetch(`/api/locations?name=${search}&size=20`, {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                return data.content.map((location: LocationEntity) => ({
                    label: location.name,
                    value: location.id,
                }));
            }}
            {...props}
        />
    );
}