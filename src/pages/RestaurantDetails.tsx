import { effect, signal } from '@preact/signals-react';
import { useEffect } from 'react';
import { Restaurants } from '../interface/main.interface';
import { apiService } from '../utils/apis/apis';
import { useParams } from 'react-router-dom';
import {
    Col,
    Empty,
    Row,
    message,
    Typography,
    Tag,
    Button,
    Tabs,
    Table,
    Divider,
} from 'antd';
import { CommonList, Gallery } from '..';
import { PhoneTwoTone, StarFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const resturantDetails = signal<Restaurants>();

const timingTableColumns = [
    {
        title: 'Day',
        dataIndex: 'day',
        key: 'day',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
];

effect(() => {
    if (resturantDetails.value) {
        localStorage.setItem(
            'restDetails',
            JSON.stringify(resturantDetails.value)
        );
    }
});

const RestaurantDetails = () => {
    const { id } = useParams();

    const fetchDetails = async () => {
        try {
            const stringifiedDetails = localStorage.getItem('restDetails');

            const details =
                stringifiedDetails !== 'undefined'
                    ? JSON.parse(stringifiedDetails as string)
                    : null;

            if (details && details.id === id) {
                resturantDetails.value = details;
            } else {
                const data = await apiService.fetchRestaurantById(id as string);

                if (data) {
                    resturantDetails.value = {
                        ...data,
                        timingsObject: Object.keys(data.timings).map((day) => ({
                            day,
                            time: data.timings[day],
                        })),
                    };
                }
            }
        } catch (error) {
            message.error('Something went wrong, while fetching details!');
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <main className='container pt-12 overflow-x-hidden space-y-12'>
            {resturantDetails.value ? (
                <>
                    <section className='space-y-8'>
                        <Row gutter={[64, 64]}>
                            <Col xs={24} md={12}>
                                <Gallery
                                    images={resturantDetails.value.pictures}
                                />
                            </Col>
                            <Col xs={24} md={12}>
                                <div className='px-6 md:px-0'>
                                    <div className='flex justify-between items-center'>
                                        <Title level={2}>
                                            {resturantDetails.value.name}
                                        </Title>
                                        <div className='flex'>
                                            {resturantDetails.value
                                                .isTrending && (
                                                <Tag color='gold'>Trending</Tag>
                                            )}
                                            <Tag
                                                className='hidden md:block'
                                                color='success'
                                            >
                                                {
                                                    resturantDetails.value
                                                        .overall_rating
                                                }{' '}
                                                <StarFilled /> Ratings
                                            </Tag>
                                        </div>
                                    </div>
                                    <div>
                                        <Tag
                                            className='inline-block md:hidden mb-2'
                                            color='success'
                                        >
                                            {
                                                resturantDetails.value
                                                    .overall_rating
                                            }{' '}
                                            <StarFilled /> Ratings
                                        </Tag>
                                        <Paragraph className='text-lg font-semibold !mb-2'>
                                            {resturantDetails.value.city},{' '}
                                            {resturantDetails.value.state}
                                        </Paragraph>
                                        <Paragraph className='text-lg !mb-2'>
                                            <b className='mr-2'>Cusine:</b>
                                            {resturantDetails.value.cuisine.join(
                                                ', '
                                            )}
                                        </Paragraph>
                                        <Paragraph className='text-base !mb-2'>
                                            <b className='mr-2'> About:</b>
                                            {resturantDetails.value.description}
                                        </Paragraph>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className='flex justify-start md:justify-end px-6 md:px-0'>
                            <Button
                                href={`tel:${resturantDetails.value.phoneNumber}`}
                                icon={<PhoneTwoTone />}
                            >
                                Contact Number:{' '}
                                {resturantDetails.value.phoneNumber}
                            </Button>
                        </div>
                    </section>
                    <section>
                        <Tabs
                            type='card'
                            defaultActiveKey='1'
                            items={[
                                {
                                    key: '1',
                                    label: 'Menu',
                                    children: (
                                        <CommonList
                                            data={
                                                resturantDetails.value.menuItems
                                            }
                                            type='menu'
                                        />
                                    ),
                                },
                                {
                                    key: '2',
                                    label: 'Reviews',
                                    children: (
                                        <CommonList
                                            data={
                                                resturantDetails.value.reviews
                                            }
                                            type='review'
                                        />
                                    ),
                                },
                                {
                                    key: '3',
                                    label: 'More Details',
                                    children: (
                                        <>
                                            <Title level={3}>
                                                Other Details
                                            </Title>
                                            <div>
                                                <Paragraph>
                                                    <b>Website:</b>{' '}
                                                    <a
                                                        href={
                                                            resturantDetails
                                                                .value.website
                                                        }
                                                    >
                                                        {
                                                            resturantDetails
                                                                .value.website
                                                        }
                                                    </a>
                                                </Paragraph>
                                                <Paragraph>
                                                    <b>Contact Number:</b>{' '}
                                                    <a
                                                        href={`tel:${resturantDetails.value.phoneNumber}`}
                                                    >
                                                        {
                                                            resturantDetails
                                                                .value
                                                                .phoneNumber
                                                        }
                                                    </a>
                                                </Paragraph>
                                                <Paragraph>
                                                    <b>Address:</b>{' '}
                                                    {
                                                        resturantDetails.value
                                                            .address
                                                    }
                                                    ,{' '}
                                                    {
                                                        resturantDetails.value
                                                            .city
                                                    }
                                                    ,{' '}
                                                    {
                                                        resturantDetails.value
                                                            .state
                                                    }
                                                </Paragraph>
                                            </div>
                                            <Divider />
                                            <Title level={3}>
                                                Restaurant Timings
                                            </Title>
                                            <Table
                                                size='small'
                                                columns={timingTableColumns}
                                                dataSource={
                                                    resturantDetails.value
                                                        .timingsObject
                                                }
                                                rowKey='day'
                                                pagination={false}
                                            />
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </section>
                </>
            ) : (
                <Empty />
            )}
        </main>
    );
};

export default RestaurantDetails;
