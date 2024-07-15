import { Button, Card, Col, Row, Typography, message } from 'antd';
import { ExploreOptions, GetAppBanner, Logo, RestaurantCard, SearchBox } from '../';
import { apiService } from '../utils/apis/apis';
import { constants, homeCards } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { Restaurants, SearchOptions } from '../interface/main.interface';
import { useEffect } from 'react';

const { Title, Paragraph } = Typography;

const Home = () => {
    const navigate = useNavigate();
    const trendingPlaces = useSignal<Restaurants[]>([]);

    const fetchData = async (query: string) => {
        let restaurants: SearchOptions[] = [];
        try {
            const res = await apiService.fetchRestaurants(`?name_like=${query.trim()}`);

            if (res instanceof Error) {
                throw res;
            }

            restaurants = res.map((item) => ({
                value: item.id,
                text: item.name,
                address: item.address,
                rating: item.overall_rating,
                image: item.pictures[1],
            }));
        } catch (error) {
            message.error('Something went wrong!');
        }

        return restaurants;
    };

    const fetchTrendingPlaces = async () => {
        try {
            const res = await apiService.fetchRestaurants(`?isTrending=true&_limit=4`);

            if (res instanceof Error) {
                throw res;
            }

            trendingPlaces.value = res;
        } catch (error) {
            message.error('Something went wrong!');
        }
    };

    useEffect(() => {
        fetchTrendingPlaces();
    }, []);

    return (
        <main className='space-y-16 overflow-x-hidden'>
            <section className='home-bg h-[450px] flex justify-center items-center'>
                <div className='space-y-6'>
                    <div className='text-center'>
                        <Logo center white />
                        <Title level={4} className='!m-0 !text-white'>
                            Discover the best food & drinks in Mumbai
                        </Title>
                    </div>

                    <SearchBox<SearchOptions>
                        customOptions
                        searchFor={constants.RESTAURANTS}
                        placeholder='Search for restaurants you like'
                        className='block mx-auto w-[350px] md:w-[500px]'
                        fetchData={fetchData}
                    />
                </div>
            </section>

            <section className='container'>
                <Row
                    justify={'center'}
                    gutter={[16, 16]}
                    className='px-6 md:px-0'
                >
                    {homeCards.map((data) => (
                        <Col xs={24} md={12} lg={6}>
                            <Card
                                key={data.title}
                                className='lg:!w-[300px] md:h-full lg:h-auto'
                                hoverable
                                cover={
                                    <img src={data.image} alt={data.title} />
                                }
                                styles={{ body: { padding: '6px 12px' } }}
                                onClick={() => navigate(data.link)}
                            >
                                <Title level={4} className='!m-0 !font-bold'>
                                    {data.title}
                                </Title>
                                <Paragraph className='!m-0 text-base'>
                                    {data.description}
                                </Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            <section className='container'>
                <Row
                    align={'middle'}
                    justify={'space-between'}
                    className='px-6 md:px-0'
                >
                    <Col xs={24} md={12}>
                        <Title level={1} className='!m-0'>
                            Collections
                        </Title>
                        <Paragraph className='text-xl'>
                            Explore the curated top trending place around
                        </Paragraph>
                    </Col>
                    <Col xs={0} md={12} className='text-end mb-6 md:mb-0'>
                        <Button
                            danger
                            onClick={() =>
                                navigate('/restaurants?trending=true')
                            }
                        >
                            View all trending places
                        </Button>
                    </Col>
                </Row>
                <Row justify={'center'} gutter={[16, 16]}>
                    {trendingPlaces.value.map((data) => (
                        <Col xs={24} md={12} lg={6}>
                            <RestaurantCard key={data.id} data={data} />
                        </Col>
                    ))}
                </Row>
                <Row justify={'center'}>
                    <Col md={0} className='mt-6'>
                        <Button
                            danger
                            onClick={() =>
                                navigate('/restaurants?trending=true')
                            }
                        >
                            View all trending places
                        </Button>
                    </Col>
                </Row>
            </section>

            <section className='bg-amber-50'>
                <GetAppBanner />
            </section>

            <section className='container pb-16'>
                <ExploreOptions />
            </section>
        </main>
    );
};

export default Home;
