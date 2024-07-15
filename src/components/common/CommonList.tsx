// CommonList.tsx
import React from 'react';
import { List, Avatar, Button, Image, Tag, Row, Col } from 'antd';
import {
    DollarCircleOutlined,
    ClockCircleOutlined,
    ShoppingCartOutlined,
    StarFilled,
} from '@ant-design/icons';
import { MenuItem, Review } from '../../interface/main.interface';
import moment from 'moment';

type Item = MenuItem | Review;

interface CommonListProps {
    data: Item[];
    type: 'menu' | 'review';
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <span>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
    </span>
);

const CommonList: React.FC<CommonListProps> = ({ data, type }) => {
    return (
        <List
            className='overflow-hidden py-6'
            itemLayout='vertical'
            size='large'
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={data}
            renderItem={(item: Item) => (
                <List.Item
                    key={
                        type === 'menu'
                            ? (item as MenuItem).id
                            : (item as Review).id
                    }
                    actions={
                        type === 'menu'
                            ? [
                                  <IconText
                                      icon={DollarCircleOutlined}
                                      text={(item as MenuItem).price}
                                      key='list-vertical-star-o'
                                  />,

                                  <IconText
                                      icon={ClockCircleOutlined}
                                      text={`${(
                                          item as MenuItem
                                      ).prepTimeMinutes.toString()} Minutes`}
                                      key='list-vertical-like-o'
                                  />,
                                  <Button
                                      icon={<ShoppingCartOutlined />}
                                      type='link'
                                      key='add-to-cart'
                                  >
                                      Add to Cart
                                  </Button>,
                              ]
                            : []
                    }
                    extra={
                        type === 'menu' && (
                            <Row>
                                <Col xs={0} md={4}>
                                    <Image
                                        className='rounded'
                                        width={100}
                                        alt='logo'
                                        src={(item as MenuItem).image}
                                    />
                                </Col>
                            </Row>
                        )
                    }
                >
                    <List.Item.Meta
                        avatar={
                            type === 'review' && (
                                <Avatar src='https://via.placeholder.com/150' />
                            )
                        }
                        title={
                            <Row>
                                {type === 'menu' && (
                                    <Col xs={24} md={0}>
                                        {' '}
                                        <Image
                                            className='rounded'
                                            width={100}
                                            alt='logo'
                                            src={(item as MenuItem).image}
                                        />
                                    </Col>
                                )}

                                <Col xs={24}>
                                    <a href='#'>
                                        {type === 'menu' ? (
                                            <div className='flex justify-between items-center'>
                                                <p className='mr-2'>
                                                    {(item as MenuItem).name}
                                                </p>
                                                <div>
                                                    <Tag
                                                        color='geekblue'
                                                        className='text-[10px] md:text-xs'
                                                    >
                                                        Serves:{' '}
                                                        {
                                                            (item as MenuItem)
                                                                .servings
                                                        }{' '}
                                                        person(s)
                                                    </Tag>
                                                    <Tag
                                                        color='success'
                                                        className='text-[10px] md:text-xs'
                                                    >
                                                        {
                                                            (item as MenuItem)
                                                                .rating
                                                        }{' '}
                                                        <StarFilled />
                                                    </Tag>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='flex justify-between items-center'>
                                                <p>{(item as Review).author}</p>
                                                <div>
                                                    <Tag color='success'>
                                                        Review Rating:{' '}
                                                        {
                                                            (item as Review)
                                                                .rating
                                                        }
                                                        <StarFilled />
                                                    </Tag>
                                                </div>
                                            </div>
                                        )}
                                    </a>
                                </Col>
                            </Row>
                        }
                        description={
                            type === 'menu' ? (
                                <>
                                    <p className='mb-2'>
                                        {(item as MenuItem).cuisine}
                                    </p>

                                    {(item as MenuItem).tags.map((tag) => (
                                        <Tag color='cyan' key={tag}>
                                            {tag}
                                        </Tag>
                                    ))}
                                </>
                            ) : (
                                <p>
                                    {moment((item as Review).created).format(
                                        'MMMM Do YYYY'
                                    )}
                                </p>
                            )
                        }
                    />
                    {type === 'menu'
                        ? (item as MenuItem).ingredients.join(', ')
                        : (item as Review).text}
                </List.Item>
            )}
        />
    );
};

export default CommonList;


