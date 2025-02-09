import React from 'react';
import {Form, Select, Modal} from 'antd';
import {useCreateTransportationMutation, useUpdateTransportationMutation} from '@/services/transportationsApi.ts';
import {message} from 'antd';
import {Transportation} from "@/model/Transportation";
import {LocationSelect} from "@/components/LocationSelect";

const {Option} = Select;

const days = [
    {value: 1, label: 'Monday'},
    {value: 2, label: 'Tuesday'},
    {value: 3, label: 'Wednesday'},
    {value: 4, label: 'Thursday'},
    {value: 5, label: 'Friday'},
    {value: 6, label: 'Saturday'},
    {value: 7, label: 'Sunday'}
];

interface TransportationFormProps {
    isVisible: boolean;
    onCancel: () => void;
    onOk: () => void;
    editingRecord?: Transportation | null;
}

const TransportationForm: React.FC<TransportationFormProps> = ({
                                                                   isVisible,
                                                                   onCancel,
                                                                   onOk,
                                                                   editingRecord
                                                               }) => {
    const [form] = Form.useForm();
    const [createTransportation] = useCreateTransportationMutation();
    const [updateTransportation] = useUpdateTransportationMutation();

    const handleSubmit = async (values: any) => {
        try {
            const transportationData = {
                originLocationId: values.originLocation.key,
                destinationLocationId: values.destinationLocation.key,
                transportationType: values.transportationType,
                operatingDays: values.operatingDays.map(Number),
            };

            if (editingRecord?.id) {
                await updateTransportation({id: editingRecord.id, ...transportationData}).unwrap();
                message.success('Transportation updated successfully');
            } else {
                await createTransportation(transportationData).unwrap();
                message.success('Transportation created successfully');
            }
            form.resetFields();
            onOk();
        } catch (error) {
            console.error(error);
            message.error('Operation failed');
        }
    };

    React.useEffect(() => {
        if (editingRecord) {
            form.setFieldsValue({
                ...editingRecord,
                originLocation: {
                    key: editingRecord.originLocation?.id,
                    label: editingRecord.originLocation?.name
                },
                destinationLocation: {
                    key: editingRecord.destinationLocation?.id,
                    label: editingRecord.destinationLocation?.name
                },
            });
        } else {
            form.resetFields();
        }
    }, [editingRecord, form]);

    return (
        <Modal
            title={editingRecord ? 'Edit Transportation' : 'Add Transportation'}
            open={isVisible}
            onOk={form.submit}
            onCancel={onCancel}
        >
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    name="originLocation"
                    rules={[{required: true, message: 'Please select origin location!'}]}
                >
                    <LocationSelect placeholder="Origin" />
                </Form.Item>

                <Form.Item
                    name="destinationLocation"
                    rules={[{required: true, message: 'Please select destination location!'}]}
                >
                    <LocationSelect placeholder="Destination" />
                </Form.Item>

                <Form.Item
                    name="transportationType"
                    rules={[{required: true, message: 'Please select transportation type!'}]}
                >
                    <Select placeholder="Transportation Type">
                        {['FLIGHT', 'BUS', 'SUBWAY', 'UBER'].map(type => (
                            <Option key={type} value={type}>
                                {type}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="operatingDays"
                    rules={[{required: true, message: 'Please select operating days!'}]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Operating Days"
                        optionLabelProp="label"
                    >
                        {days.map(day => (
                            <Option key={day.value} value={day.value} label={day.label}>
                                {day.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TransportationForm; 