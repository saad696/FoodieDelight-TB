import { useSignal } from '@preact/signals-react';
import {
    Col,
    Row,
    Typography,
    Form,
    FormProps,
    Radio,
    RadioChangeEvent,
    Input,
    Select,
    Button,
} from 'antd';
import { constants } from '../utils/constants';

const { Title, Paragraph } = Typography;

type FieldType = {
    email: string;
    phoneNumber: string;
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

const GetAppBanner = () => {
    const selectedMedium = useSignal<'email' | 'phone'>('email');
    const [form] = Form.useForm();

    const onMediumChange = ({ target: { value } }: RadioChangeEvent) => {
        selectedMedium.value = value;
        form.resetFields();
    };

    const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log(values);
    };

    return (
        <Row className='container py-12' align={'middle'}>
            <Col xs={24} md={12}>
                <img
                    src='https://b.zmtcdn.com/data/o2_assets/f773629053b24263e69f601925790f301680693809.png'
                    alt='get-app-image'
                    width={250}
                    className='mx-auto md:ml-auto'
                />
            </Col>
            <Col xs={24} md={12} className='px-4'>
                <Title level={1}>Get the FoodieDelight App</Title>
                <Paragraph className='text-lg'>
                    We will send you a link, open it on your phone to download
                    the app
                </Paragraph>

                <Radio.Group
                    options={constants.MEDIUM}
                    onChange={onMediumChange}
                    value={selectedMedium.value}
                />

                <Form
                    initialValues={{ countryCode: '91' }}
                    layout='vertical'
                    name='getapp'
                    onFinish={onSubmit}
                    autoComplete='off'
                    className='mt-4'
                    form={form}
                >
                    <Row align={'middle'} gutter={16}>
                        <Col xs={18}>
                            {selectedMedium.value === 'email' && (
                                <Form.Item<FieldType>
                                    className='mb-0'
                                    name='email'
                                    rules={[
                                        {
                                            type: 'email',
                                            message:
                                                'Please input a valid Email!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder='jhon.doe@email.com'
                                        suffix={
                                            <Button
                                                htmlType='submit'
                                                danger
                                                type='primary'
                                            >
                                                Get Link
                                            </Button>
                                        }
                                    />
                                </Form.Item>
                            )}
                            {selectedMedium.value === 'phone' && (
                                <Form.Item
                                    className='mb-0'
                                    name='phoneNumber'
                                    rules={[
                                        {
                                            pattern: /^\d{10,12}$/,
                                            message:
                                                'Please enter valid phone number!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder='type here...'
                                        addonBefore={prefixSelector}
                                        suffix={
                                            <Button
                                                htmlType='submit'
                                                danger
                                                type='primary'
                                            >
                                                Get Link
                                            </Button>
                                        }
                                    />
                                </Form.Item>
                            )}
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};

export default GetAppBanner;
