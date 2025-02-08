import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import { useCreateLocationMutation, useUpdateLocationMutation } from '@/services/locationsApi';
import { Location as LocationEntity } from "@/model/Location";

interface LocationFormProps {
  isVisible: boolean;
  onCancel: () => void;
  onOk: () => void;
  editingRecord?: LocationEntity | null;
}

const LocationForm: React.FC<LocationFormProps> = ({
  isVisible,
  onCancel,
  onOk,
  editingRecord
}) => {
  const [form] = Form.useForm();
  const [createLocation] = useCreateLocationMutation();
  const [updateLocation] = useUpdateLocationMutation();

  const handleSubmit = async (values: LocationEntity) => {
    try {
      if (editingRecord?.id) {
        await updateLocation({ ...values, id: editingRecord.id }).unwrap();
        message.success('Location updated successfully');
      } else {
        await createLocation(values).unwrap();
        message.success('Location created successfully');
      }
      form.resetFields();
      onOk();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  React.useEffect(() => {
    if (editingRecord) {
      form.setFieldsValue(editingRecord);
    } else {
      form.resetFields();
    }
  }, [editingRecord, form]);

  return (
    <Modal
      title={editingRecord ? 'Edit Location' : 'Add Location'}
      open={isVisible}
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          rules={[{ required: true }, { max: 255 }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="city"
          rules={[{ required: true }, { max: 100 }]}
        >
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item
          name="country"
          rules={[{ required: true }, { max: 100 }]}
        >
          <Input placeholder="Country" />
        </Form.Item>
        <Form.Item
          name="locationCode"
          rules={[{ required: true }, { max: 10 }]}
        >
          <Input placeholder="Location Code" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LocationForm; 