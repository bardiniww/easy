import {Button, Col, Drawer, Form, Input, Row, Select} from 'antd';
import {addNewUser} from "./client";
import {successNotification} from "./Notification";

const {Option} = Select;

function UserDrawerForm({showDrawer, setShowDrawer, fetchUsers}) {
    // const onCLose = () => setShowDrawer(false);
    // const [submitting, setSubmitting] = useState(false);
    //
    // const onFinish = user => {
    //     setSubmitting(true)
    //     console.log(JSON.stringify(user, null, 2))
    //     addNewUser(user)
    //         .then(() => {
    //             console.log("user added")
    //             onCLose();
    //             successNotification(
    //                 "User successfully added",
    //                 `${user.name} was added to the system`
    //             )
    //             fetchUsers();
    //         }).catch(err => {
    //         console.log(err);
    //         err.response.json().then(res => {
    //             console.log(res);
    //             errorNotification(
    //                 "There was an issue",
    //                 `${res.message} [${res.status}] [${res.error}]`,
    //                 "bottomLeft"
    //             )
    //         });
    //     }).finally(() => {
    //         setSubmitting(false);
    //     })
    // };
    //
    // const onFinishFailed = errorInfo => {
    //     alert(JSON.stringify(errorInfo, null, 2));
    // };

    const onCLose = () => {
        setShowDrawer(false)
    }

    const onFinish = user => {
        console.log(JSON.stringify(user, null, 2))
        addNewUser(user)
            .then(() => {
                console.log("user creation request sent")
                onCLose()
                successNotification(
                    "Success!",
                    `${user.login} was added to the system`
                )
                fetchUsers()
            })
            .catch(error => {
                console.log(error)
                // errorNotification(
                //     "Error!",
                //     `${user.login} was interrupted by error`
                // )
            })
    }

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2))
    }

    return <Drawer
        title="Create new user"
        width={720}
        onClose={onCLose}
        open={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="login"
                        label="Login"
                        rules={[{required: true, message: 'Please enter user login'}]}
                    >
                        <Input placeholder="Please enter user login"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter user email'}]}
                    >
                        <Input placeholder="Please enter user email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{required: true, message: 'Please select a type'}]}
                    >
                        <Select placeholder="Please select a type">
                            <Option value="ADMIN">MALE</Option>
                            <Option value="COMMON">FEMALE</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            {/*<Row>*/}
            {/*    {submitting && <Spin indicator={antIcon} />}*/}
            {/*</Row>*/}
        </Form>
    </Drawer>
}

export default UserDrawerForm;
