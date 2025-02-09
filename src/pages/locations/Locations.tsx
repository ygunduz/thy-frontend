import React, {useState} from 'react';
import {Table, Button, Space, Popconfirm, message} from 'antd';
import {
    useGetLocationsQuery,
    useDeleteLocationMutation,
} from '@/services/locationsApi';
import LocationForm from './LocationForm';
import {Location as LocationEntity} from '@/model/Location';
import {getSort, usePagination} from "@/hooks/usePagination";

const Locations: React.FC = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<LocationEntity | null>(null);
    const {pagination, handleTableChange} = usePagination({});

    const {data, isLoading, refetch} = useGetLocationsQuery({
        page: pagination.page - 1,
        size: pagination.pageSize,
        sort: getSort(pagination),
    });

    const [deleteLocation] = useDeleteLocationMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteLocation(id).unwrap();
            refetch();
            message.success('Location deleted successfully');
        } catch (error) {
            message.error('Operation failed');
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: true
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            sorter: true
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            sorter: true
        },
        {
            title: 'Code',
            dataIndex: 'locationCode',
            key: 'locationCode',
            sorter: true
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: LocationEntity) => (
                <Space>
                    <Button onClick={() => {
                        setEditingRecord(record);
                        setIsModalVisible(true);
                    }}>
                        Edit
                    </Button>
                    <Popconfirm
                        placement="top"
                        title={"Are you sure to delete this location?"}
                        description={"Delete the location"}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setEditingRecord(null);
                    setIsModalVisible(true);
                }}
                style={{marginBottom: 16}}
            >
                Add Location
            </Button>

            <Table
                columns={columns}
                dataSource={data?.content}
                loading={isLoading}
                rowKey="id"
                pagination={{
                    total: data?.totalElements,
                    pageSize: pagination.pageSize,
                    current: pagination.page,
                    showSizeChanger: true,
                }}
                onChange={handleTableChange}
                sortDirections={['ascend', 'descend']}
            />

            <LocationForm
                isVisible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingRecord(null);
                }}
                onOk={() => {
                    setIsModalVisible(false);
                    setEditingRecord(null);
                    refetch();
                }}
                editingRecord={editingRecord}
            />
        </>
    );
};

export default Locations; 