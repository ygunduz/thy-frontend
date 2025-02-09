import React from "react";
import {Route} from "@/model/Route.ts";
import {Drawer, StepProps, Steps} from "antd";
import {Transportation} from "@/model/Transportation.ts";

interface RouteDrawerProps {
    route: Route,
    open: boolean,
    onClose: () => void
}

const getSubTitle = (transport: Transportation, prop: 'originLocation' | 'destinationLocation') : string | undefined => {
    return transport.transportationType === 'FLIGHT' ? `(${transport[prop].locationCode})` : undefined
}

const buildSteps = (route: Route) : StepProps[] => {
    const steps = [] as StepProps[];
    if(route && route.transportations?.length > 0) {
        const transport = route.transportations[0];
        steps.push({
            title: transport.originLocation.name,
            description: transport.transportationType,
            subTitle: getSubTitle(transport, 'originLocation'),
            status: 'process'
        },{
            title: transport.destinationLocation.name,
            subTitle: getSubTitle(transport, 'destinationLocation'),
            status: 'process'
        })
        for (let i = 1; i < route.transportations.length; i++) {
            const transportation = route.transportations[i];
            steps[steps.length - 1].description = transportation.transportationType;
            if(transportation.transportationType === 'FLIGHT') {
                steps[steps.length - 1].subTitle = `(${transportation.originLocation.locationCode})`
            }
            steps.push({
                title: transportation.destinationLocation.name,
                subTitle: getSubTitle(transportation, 'destinationLocation'),
                status: 'process'
            })
        }
    }

    return steps;
}

const RouteDrawer: React.FC<RouteDrawerProps> = ({route, open, onClose}) => {
    return <Drawer
        width={400}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
    >
        <Steps
            progressDot
            direction="vertical"
            items={buildSteps(route)}
        />
    </Drawer>
}

export default RouteDrawer;