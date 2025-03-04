import React, {useCallback, useMemo, useState} from 'react';
import {Layout, Menu, Typography, theme} from 'antd';
import {useNavigate} from 'react-router-dom';
import {
    EnvironmentOutlined,
    CarOutlined,
    LogoutOutlined,
    ShareAltOutlined
} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {logout, selectAuth} from '@/features/authSlice';
import {MenuInfo} from "rc-menu/lib/interface";
import { Outlet } from 'react-router-dom';
import {useAuthNavigate} from "@/hooks/useAuthNavigate.ts";

const {Header, Sider, Content} = Layout;
const {Title} = Typography;

const getMenuItems = (role: string | null) => {
    const menuItems = [];

    if (role === 'ROLE_ADMIN') {
        menuItems.push({
            key: '/locations',
            icon: <EnvironmentOutlined/>,
            label: 'Locations',
        });

        menuItems.push({
            key: '/transportations',
            icon: <CarOutlined/>,
            label: 'Transportations',
        });
    }

    menuItems.push({
        key: '/routes',
        icon: <ShareAltOutlined/>,
        label: 'Routes',
    });

    menuItems.push({
        key: 'logout',
        icon: <LogoutOutlined/>,
        label: 'Logout',
    });

    return menuItems;
}

const AppLayout: React.FC = () => {
    useAuthNavigate();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {role} = useSelector(selectAuth);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const handleMenuClick = useCallback((info: MenuInfo) => {
        const {key} = info;
        if (key === 'logout') {
            dispatch(logout());
            navigate('/login');
        } else {
            navigate(key);
        }
    }, [dispatch, navigate]);

    const menuItems = useMemo(() => {
        return getMenuItems(role);
    }, [role])

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark"
                      defaultSelectedKeys={[role === 'ROLE_ADMIN' ? '/locations' : '/routes']}
                      mode="inline" items={menuItems}
                      onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
                <Header style={{background: colorBgContainer}}>
                    <Title style={{marginTop: 12}} level={2}>THY App</Title>
                </Header>
                <Content style={{margin: '16px 16px'}}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout; 