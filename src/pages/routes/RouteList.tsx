import React from "react";
import {Route} from "@/model/Route.ts";
import {Divider, List, Typography} from "antd";
import RouteDrawer from "@/pages/routes/RouteDrawer.tsx";

interface RouteListProps {
    routes: Array<Route>
}

const {Title} = Typography;

const RouteList: React.FC<RouteListProps> = ({routes}) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [item, setItem] = React.useState<Route | null>(null);

    const showDrawer = (item: Route) => {
        setItem(item);
        setOpen(true);
    };

    const onClose = () => {
        setItem(null);
        setOpen(false);
    };

    return routes.length > 0 ? (
        <>
            <Title level={4}>Available Routes</Title>
            <Divider />
            <List
                itemLayout="horizontal"
                dataSource={routes}
                renderItem={(item) => (
                    <List.Item actions={[<a onClick={() => showDrawer(item)}>
                        View Route
                    </a>]}>
                        <List.Item.Meta title={item.title}/>
                    </List.Item>
                )}
            />
            <RouteDrawer route={item as Route} open={open} onClose={onClose} />
        </>
    ) : null;
}

export default RouteList;