import React, { useState } from 'react';
import { Table, Button, Space, message } from 'antd';
import {
  useGetTransportationsQuery,
  useDeleteTransportationMutation
} from '@/services/transportationsApi';
import TransportationForm from './TransportationForm';
import {Transportation} from "@/model/Transportation";

const daysAbbr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Transportations: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Transportation | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useGetTransportationsQuery({
    page: page - 1,
    size: pageSize,
  });

  const [deleteTransportation] = useDeleteTransportationMutation();

  const columns = [
    {
      title: 'Origin',
      dataIndex: ['originLocation', 'name'],
      key: 'originLocation',
    },
    {
      title: 'Destination',
      dataIndex: ['destinationLocation', 'name'],
      key: 'destinationLocation',
    },
    {
      title: 'Type',
      dataIndex: 'transportationType',
      key: 'transportationType',
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
          <Button 
            danger 
            onClick={() => {
              deleteTransportation(record.id)
                .unwrap()
                .then(() => message.success('Transportation deleted successfully'))
                .catch(() => message.error('Delete failed'));
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (error) {
    return <div>Error loading transportations. Please try again later.</div>;
  }

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setEditingRecord(null);
          setIsModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
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
          pageSize,
          current: page,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />

      <TransportationForm
        isVisible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingRecord(null);
        }}
        editingRecord={editingRecord}
      />
    </>
  );
};

export default Transportations; 