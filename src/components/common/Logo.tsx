import { Typography } from 'antd';

const { Title } = Typography;

const Logo: React.FC<{ white?: boolean; center?: boolean }> = ({
    white = false,
    center = false,
}) => {
    return (
        <Title
            draggable
            level={2}
            className={`!font-extrabold italic !m-0 text-center ${
                !center && 'md:text-left'
            }`}
        >
            <span className={white ? 'text-white' : 'text-slate-900'}>
                Foodie
            </span>
            <span className='!text-red-500'>Delight</span>
        </Title>
    );
};

export default Logo;
