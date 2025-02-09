import React, {useCallback} from 'react';
import {Button, DatePicker, Divider, Form, Select, Typography} from "antd";
import {useGetLocationsQuery} from "@/services/locationsApi.ts";
import {Location as LocationEntity} from "@/model/Location.ts";
import {useLazyGetRoutesQuery} from "@/services/routesApi.ts";
import dayjs from "dayjs";
import RouteList from "@/pages/routes/RouteList.tsx";

const {Option} = Select;
const {Title} = Typography;

const Routes: React.FC = () => {

    const {data: locationsData} = useGetLocationsQuery({size: 100});
    const [fetchRoutes, {isLoading, data}] = useLazyGetRoutesQuery();
    const {routes} = data ?? {};

    const onFinish = useCallback((values: any) => {
        fetchRoutes({
            origin: values.origin,
            destination: values.destination,
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
                    name="origin"
                    label="Origin"
                    rules={[{required: true, message: 'Please select origin location!'}]}
                >
                    <Select placeholder="Origin">
                        {locationsData?.content?.map((location: LocationEntity) => (
                            <Option key={location.id} value={location.id}>
                                {location.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="destination"
                    label="Destination"
                    rules={[{required: true, message: 'Please select destination location!'}]}
                >
                    <Select placeholder="Destination">
                        {locationsData?.content?.map((location: LocationEntity) => (
                            <Option key={location.id} value={location.id}>
                                {location.name}
                            </Option>
                        ))}
                    </Select>
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