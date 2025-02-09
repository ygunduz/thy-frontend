import React, {useCallback} from 'react';
import {Button, DatePicker, Divider, Form, Typography} from "antd";
import {useLazyGetRoutesQuery} from "@/services/routesApi";
import dayjs from "dayjs";
import RouteList from "@/pages/routes/RouteList";
import {LocationSelect} from "@/components/LocationSelect.tsx";

const {Title} = Typography;

const Routes: React.FC = () => {
    const [fetchRoutes, {isLoading, data}] = useLazyGetRoutesQuery();
    const {routes} = data ?? {};

    const onFinish = useCallback((values: any) => {
        fetchRoutes({
            origin: values.origin.value,
            destination: values.destination.value,
            date: dayjs(values.date).local().format('YYYY-MM-DD')
        })
    }, [fetchRoutes]);

    return (
        <>
            <Form
                layout='inline'
                onFinish={onFinish}
                disabled={isLoading}
            >
                <Form.Item
                    label="Origin"
                    name="origin"
                    rules={[{required: true, message: 'Please select origin location!'}]}
                >
                    <LocationSelect
                        placeholder="Origin"
                        style={{width: 200}}
                    />
                </Form.Item>
                <Form.Item
                    label="Destination"
                    name="destination"
                    rules={[{required: true, message: 'Please select destination location!'}]}
                >
                    <LocationSelect
                        placeholder="Destination"
                        style={{width: 200}}
                    />
                </Form.Item>
                <Form.Item label="Date" name="date" rules={[{required: true, message: 'Please select date!'}]}>
                    <DatePicker/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Search
                    </Button>
                </Form.Item>
            </Form>
            <Divider/>
            {!routes ?
                <Title level={4}>Please Search Routes</Title> :
                <RouteList routes={routes} />
            }
        </>
    );
};

export default Routes; 