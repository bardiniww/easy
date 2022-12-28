import React from 'react';
import {Button, Col, Drawer, Form, Input, Row, Select, Space} from 'antd';

const {Option} = Select;

function UserDrawerForm({showDrawer, setShowDrawer}) {
    const onClose = () => {
        setShowDrawer(false);
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return (
        <>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={showDrawer}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" onFinishFailed={onFinishFailed} hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="login"
                                label="Login"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter login',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter login"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter email',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter email"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose the type',
                                    },
                                ]}
                            >
                                <Select placeholder="Please select a type">
                                    <Option value="COMMON">COMMON</Option>
                                    <Option value="ADMIN">ADMIN</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
}

export default UserDrawerForm;