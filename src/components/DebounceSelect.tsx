import React, {useMemo, useRef, useState} from 'react';
import {Select, Spin} from 'antd';
import type {SelectProps} from 'antd/es/select';
import debounce from 'lodash/debounce';

export interface DebounceSelectProps<ValueType = any> extends Omit<SelectProps, 'options' | 'children'> {
    fetchOptions: (search: string) => Promise<ValueType[]>;
    debounceTimeout?: number;
}

export function DebounceSelect<ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number
} = any>({
             fetchOptions,
             debounceTimeout = 800,
             ...props
         }: DebounceSelectProps<ValueType>) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState<ValueType[]>([]);
    const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
            if(value && value.trim().length > 2) {
                fetchRef.current += 1;
                const fetchId = fetchRef.current;
                setOptions([]);
                setFetching(true);

                fetchOptions(value).then((newOptions) => {
                    if (fetchId !== fetchRef.current) {
                        return;
                    }

                    setOptions(newOptions);
                    setFetching(false);
                });
            }
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select
            labelInValue
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"/> : null}
            {...props}
            options={options}
        />
    );
} 