import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Empty, Layout, Menu, Spin, Table, theme} from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    PlusOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import {getAllUsers} from "./client";
import UserDrawerForm from "./UserDrawerForm";
import './App.css';

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Login',
        dataIndex: 'login',
        key: 'login',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    }
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;


function App() {
    const [users, setUsers] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false)

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const fetchUsers = () =>
        getAllUsers()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
                setFetching(false)
            });

    useEffect(() => {
        console.log("component is mounted");
        fetchUsers();
    }, []);

    const renderUsers = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>;
        }
        if (users.length <= 0) {
            return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>;
        }
        return <>
            <UserDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
            />
            <Table
                dataSource={users}
                columns={columns}
                bordered
                title={() =>
                    <Button type="primary" size={"small"} icon={<PlusOutlined/>}
                            onClick={() => setShowDrawer(!showDrawer)}>
                        Add user
                    </Button>
                }
                pagination={{
                    pageSize: 50,
                }}
                scroll={{
                    y: 600,
                }}
                rowKey={(user) => user.id}
            />
        </>;
    }

    return <Layout
        style={{
            minHeight: '100vh',
        }}
    >
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
            />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
        </Sider>
        <Layout className="site-layout">
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            />
            <Content
                style={{
                    margin: '0 16px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                    }}
                >
                    {renderUsers()}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Mda bleat ©2022 Created by ahuennii frontender
            </Footer>
        </Layout>
    </Layout>
}

export default App;
