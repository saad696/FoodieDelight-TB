import { useEffect } from 'react';
import { apiService } from '../utils/apis/apis';
import { useSignal } from '@preact/signals-react';
import {
    Restaurants as IRestaurants,
    SearchOptions,
} from '../interface/main.interface';
import { Col, Row, message } from 'antd';
import RestaurantCard from '../components/common/RestaurantCard';
import { SearchBox } from '../';
import { constants } from '../utils/constants';

const Restaurants = () => {
    const restaurants = useSignal<IRestaurants[]>([]);

    const fetchRestaurants = async () => {
        try {
            const res = await apiService.fetchRestaurants();

            if (res instanceof Error) {
                throw res;
            }

            restaurants.value = res;
        } catch (error) {
            message.error('Something went wrong!');
        }
    };

    const fetchData = async (query: string) => {
        let restaurants: SearchOptions[] = [];
        try {
            const res = await apiService.fetchRestaurants(
                `?name_like=${query.trim()}`
            );

            if (res) {
                restaurants = res.map((item) => ({
                    value: item.id,
                    text: item.name,
                    address: item.address,
                    rating: item.overall_rating,
                    image: item.pictures[1],
                }));
            }
        } catch (error) {
            message.error('Something went wrong!');
        }

        return restaurants;
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <main className='container'>
            <div className='px-6 md:px-0'>
                <section className='my-8'>
                    <SearchBox<SearchOptions>
                        customOptions
                        searchFor={constants.RESTAURANTS}
                        placeholder='Search for restaurants you like'
                        className='block mx-auto w-[350px] md:w-[500px]'
                        fetchData={fetchData}
                    />
                </section>
                <section className='pb-12'>
                    <Row gutter={[16, 16]}>
                        {restaurants.value.map((restaurant) => (
                            <Col xs={24} md={12} lg={6}>
                                <RestaurantCard
                                    key={restaurant.id}
                                    data={restaurant}
                                />
                            </Col>
                        ))}
                    </Row>
                </section>
            </div>
        </main>
    );
};

export default Restaurants;
