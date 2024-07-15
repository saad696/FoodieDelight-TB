import { GoogleCircleFilled } from '@ant-design/icons';
import {
    Button,
    Divider,
    Form,
    FormProps,
    Input,
    Modal,
    Typography,
    message,
} from 'antd';
import { apiService } from '../utils/apis/apis';

const { Title } = Typography;

interface LoginInterface {
    open: boolean;
    close: () => boolean;
}

type FieldType = {
    email: string;
    password: string;
};

const Login: React.FC<LoginInterface> = ({ open, close }) => {
    const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            await apiService.validateLogin(values);
        } catch (error) {
            message.error('Something went wrong while logging in');
        }
    };

    return (
        <Modal title={<></>} footer={<></>} open={open} onCancel={close}>
            <Title className='text-center !font-bold' level={2}>
                Login
            </Title>
            <Form
                layout='vertical'
                name='login'
                onFinish={onSubmit}
                autoComplete='off'
            >
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

                <Button htmlType='submit' type='primary' className='w-full'>
                    Login
                </Button>
            </Form>
            <Divider plain>Or</Divider>
            <Button
                icon={<GoogleCircleFilled />}
                htmlType='submit'
                className='w-full'
            >
                Login with Google
            </Button>
        </Modal>
    );
};

export default Login;
