import {useState} from "react";

export type PaginationState = {
    page: number,
    pageSize: number,
    sort?: string,
    order?: string
}

interface PaginationProps {
    defaultSort?: string;
    defaultOrder?: string;
}

export const getSort = (pagination?: PaginationState) => {
    if(pagination?.sort) {
        if(Array.isArray(pagination.sort)) {
            return `${pagination.sort.join('.')},${pagination.order === 'ascend' ? 'asc' : 'desc'}`;
        } else {
            return `${pagination.sort},${pagination.order === 'ascend' ? 'asc' : 'desc'}`
        }
    }
    return undefined;
}

export const usePagination = ({
    defaultSort = 'id',
    defaultOrder = 'ascend'
}: PaginationProps) => {

    const [pagination, setPaginationState] = useState<PaginationState>({
        page: 1,
        pageSize: 10,
        sort: defaultSort,
        order: defaultOrder
    })

    const handleTableChange = (
        pag: any,
        _: any,
        sorter: any
    ) => {
        const params: any = {
            page: pag.current,
            pageSize: pag.pageSize,
        };

        if (sorter.field) {
            console.log(sorter.field);
            params['sort'] = sorter.field;
            params['order'] = sorter.order;
        }

        setPaginationState(params);
    };

    return {
        pagination,
        handleTableChange
    }
}