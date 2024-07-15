import { Card, Tag, Typography } from 'antd'
import { Restaurants } from '../../interface/main.interface'
import { useNavigate } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface RestaurantCardProps {
    data: Restaurants
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({data}) => {
    const navigate = useNavigate()
  return (
    <Card
    className='lg:!w-[300px] h-full'
    hoverable
    cover={
        <img src={data.pictures[0]} alt={data.name} />
    }
    styles={{ body: { padding: '6px 12px' } }}
    onClick={() =>
        navigate(`/restaurants/${data.id}`)
    }
>
    <div className='flex items-center justify-between'>
        <Title level={4} className='!m-0 !font-bold'>
            {data.name}
        </Title>
        <Tag color='success'>
            {data.overall_rating} <StarFilled />
        </Tag>
    </div>
    <Paragraph className='!m-0 !truncate text-base'>
        {data.cuisine.slice(0, 3).join(', ')}...
    </Paragraph>
</Card>
  )
}

export default RestaurantCard