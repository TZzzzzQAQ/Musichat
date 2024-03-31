import React, {useState} from 'react';
import {Button, Card, Form, Input, Select, Space} from 'antd';
import Checkbox from "antd/es/checkbox/Checkbox";
import '../Account/index.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const {Option} = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const Account = () => {
    const [form] = Form.useForm();
    const [isLogin, setIsLogin] = useState(true);
    const onFinish = (values) => {
        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
    };
    const toggleLogin = () => {
        setIsLogin(prevState => !prevState);
    };
    return (
        <>
            <div className={'login-container'}>
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{
                        // minWidth: 500,
                    }}
                >
                    <Form.Item
                        name="Username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        className={'user-input'}
                    >
                        <Input.Password placeholder="Password"/>
                    </Form.Item>

                    {!isLogin && <Form.Item
                        label="Comfirm Password"
                        name="Comfirm Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        className={'user-input'}
                    >
                        <Input.Password placeholder="Password"/>
                    </Form.Item>}
                    {isLogin && <Form.Item
                        name="remember"
                        valuePropName="checked"
                        className={'user-input'}
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>}
                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                            <Button htmlType="button" onClick={toggleLogin}>
                                {isLogin ? 'Register' : 'Login'}
                            </Button>
                            <FontAwesomeIcon icon="fa-brands fa-google" style={{color: "#74C0FC",}}/>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <Card title="After Login">
                <ul>
                    <li>
                        你可以修改背景颜色.
                    </li>
                    <li>
                        可以保存你喜欢的歌曲.
                    </li>
                    <li>
                        可以访问最近听歌的记录.
                    </li>
                </ul>
            </Card>
        </>
    )
        ;
};
export default Account;