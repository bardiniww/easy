import React, {useEffect, useState} from "react";
import {
    Avatar,
    Badge,
    Breadcrumb,
    Button,
    Divider,
    Empty,
    Layout,
    Menu,
    Popconfirm,
    Space,
    Spin,
    Table,
    Tag,
    theme
} from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    PlusOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import {deleteUser, getAllUsers} from "./client";
import UserDrawerForm from "./UserDrawerForm";
import './App.css';
import {errorNotification, successNotification} from "./Notification";

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

const TheAvatar = ({login}) => {
    let trim = login.trim()
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    return <Avatar>{login.charAt(0)}</Avatar>

}

const removeUser = (userId, callback) => {
    deleteUser(userId)
        .then(
            () => {
                successNotification(
                    "Success!",
                    `${userId} was deleted from the system`
                );
                callback();
            }
        )
        .catch(err => {
                console.log(err.response)
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification(
                        "There was an issue...",
                        `${res.message} [${res.status}] [${res.error}]`
                    )
                })
            }
        )
}

const columns = fetchUsers => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, user) => <TheAvatar login={user.login}/>
    },
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
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, user) =>
            <Space className="site-button-ghost-wrapper" wrap>
                <Button type="primary" ghost>
                    Edit
                </Button>
                <Popconfirm
                    title="Delete user?"
                    description="Are you sure chuvak?"
                    onConfirm={() => removeUser(user.id, fetchUsers)}
                    onOpenChange={() => console.log('user delete request sent')}
                >
                    <Button type="primary" danger ghost>
                        Delete
                    </Button>
                </Popconfirm>
            </Space>

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
            })
            .catch(err => {
                console.log(err.response)
                err.response.json().then(res => {
                    console.log(res)
                    errorNotification(
                        "There was an issue...",
                        `${res.message} [${res.status}] [${res.error}]`
                    )
                })
            })
            .finally(() => setFetching(false));

    useEffect(() => {
        console.log("component is mounted");
        fetchUsers();
    }, []);

    const renderUsers = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>;
        }
        if (users.length <= 0) {
            return <>
                <UserDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchUsers={fetchUsers}
                />
                <Button type="primary" size={"small"} icon={<PlusOutlined/>}
                        onClick={() => setShowDrawer(!showDrawer)}>
                    Add user
                </Button>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>;
            </>
        }
        return <>
            <UserDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchUsers={fetchUsers}
            />
            <Table
                dataSource={users}
                columns={columns(fetchUsers)}
                bordered
                title={() =>
                    <>
                        <Tag>Number of users:</Tag>
                        <Badge
                            className="site-badge-count-4"
                            count={users.length}
                        />
                        <br/><br/>
                        <Button type="primary" size={"small"} icon={<PlusOutlined/>}
                                onClick={() => setShowDrawer(!showDrawer)}>
                            Add user
                        </Button>
                    </>
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
            <Divider>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/ibardin/">
                    Linkedin link here
                </a>
            </Divider>
        </Layout>
    </Layout>
}

export default App;
