import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';
import {
  useGetLocationsQuery,
  useDeleteLocationMutation,
} from '@/services/locationsApi.ts';
import LocationForm from './LocationForm.tsx';
import { Location as LocationEntity } from '@/model/Location.ts';

const Locations: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<LocationEntity | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useGetLocationsQuery({
    page: page - 1,
    size: pageSize,
  });

  const [deleteLocation] = useDeleteLocationMutation();

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'Code', dataIndex: 'locationCode', key: 'locationCode' },
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
          <Button danger onClick={() => deleteLocation(record.id)}>
            Delete
          </Button>
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
        style={{ marginBottom: 16 }}
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
          pageSize,
          current: page,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />

      <LocationForm
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

export default Locations; 