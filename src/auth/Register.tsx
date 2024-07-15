import { GoogleCircleFilled } from '@ant-design/icons';
import {
    Button,
    Divider,
    Form,
    FormProps,
    Input,
    Modal,
    Select,
    Typography,
    message,
} from 'antd';
import React from 'react';
import { apiService } from '../utils/apis/apis';
import { helperService } from '../utils/helper';

const { Title } = Typography;

interface RegisterInterface {
    open: boolean;
    close: () => boolean;
}

type FieldType = {
    fullname: string;
    email: string;
    password: string;
    phoneNumber: string;
    confirmPassword?: string;
};

const prefixSelector = (
    <Form.Item name='countryCode' noStyle>
        <Select
            style={{
                width: 70,
            }}
        >
            <Select.Option value='91'>+91</Select.Option>
        </Select>
    </Form.Item>
);

const Register: React.FC<RegisterInterface> = ({ open, close }) => {
    const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            delete values.confirmPassword;
            await apiService.registerUser({
                ...values,
                id: helperService.generateUniqueId(),
                gender: ['male', 'female'][Math.floor(Math.random() * 2)],
                avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/473.jpg',
                joined_at: '2021-02-17T22:12:08.400Z',
                address: 'Apt. 241, 563 Dibbert Plain',
                state: 'Maharashtra',
                city: 'Dhule',
                pincode: '500439',
                restaurants: [],
                orders: [],
            });
        } catch (error) {
            message.error('Something went wrong while registration in');
        }
    };

    return (
        <Modal title={<></>} footer={<></>} open={open} onCancel={close}>
            <Title className='text-center !font-bold' level={2}>
                Register
            </Title>
            <Form
                initialValues={{ countryCode: '91' }}
                layout='vertical'
                name='register'
                onFinish={onSubmit}
                autoComplete='off'
            >
                <Form.Item<FieldType>
                    label='Fullname'
                    name='fullname'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Fullname!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label='Email'
                    name='email'
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        {
                            type: 'email',
                            message: 'Please input a valid Email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='phoneNumber'
                    label='Phone Number'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                        {
                            pattern: /^\d{10,12}$/,
                            message: 'Please enter valid phone number!',
                        },
                    ]}
                >
                    <Input addonBefore={prefixSelector} />
                </Form.Item>

                <Form.Item<FieldType>
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item<FieldType>
                    label='Confirm Password'
                    name='confirmPassword'
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('The two passwords do not match!')
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Button htmlType='submit' type='primary' className='w-full'>
                    Create account
                </Button>
            </Form>

            <Divider plain>Or</Divider>
            <Button
                icon={<GoogleCircleFilled />}
                htmlType='submit'
                className='w-full'
            >
                Sign in with Google
            </Button>
        </Modal>
    );
};

export default Register;
