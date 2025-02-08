import React, {useState} from 'react';
import {Table, Button, Space, message, Popconfirm} from 'antd';
import {
    useGetTransportationsQuery,
    useDeleteTransportationMutation
} from '@/services/transportationsApi';
import TransportationForm from './TransportationForm';
import {Transportation} from "@/model/Transportation";
import {getSort, usePagination} from "@/hooks/usePagination";

const daysAbbr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Transportations: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<Transportation | null>(null);
    const {pagination, handleTableChange} = usePagination({});

    const {data, isLoading, refetch} = useGetTransportationsQuery({
        page: pagination.page - 1,
        size: pagination.pageSize,
        sort: getSort(pagination),
    });

    const [deleteTransportation] = useDeleteTransportationMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteTransportation(id);
            refetch();
            message.success('Transportation deleted successfully');
        } catch (error) {
            message.error('Operation failed');
        }
    };

    const columns = [
        {
            title: 'Origin',
            dataIndex: ['originLocation', 'name'],
            key: 'originLocation',
            sorter: true,
        },
        {
            title: 'Destination',
            dataIndex: ['destinationLocation', 'name'],
            key: 'destinationLocation',
            sorter: true,
        },
        {
            title: 'Type',
            dataIndex: 'transportationType',
            key: 'transportationType',
            sorter: true
        },
        {
            title: 'Operating Days',
            dataIndex: 'operatingDays',
            key: 'operatingDays',
            render: (days: number[]) => days.map(day =>
                daysAbbr[day - 1]
            ).join(', '),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: Transportation) => (
                <Space>
                    <Button onClick={() => {
                        setEditingRecord(record);
                        setIsModalVisible(true);
                    }}>
                        Edit
                    </Button>
                    <Popconfirm
                        placement="top"
                        title={"Are you sure to delete this transportation?"}
                        description={"Delete the transportation"}
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
                Add Transportation
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
            />

            <TransportationForm
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

export default Transportations; 