import { Collapse, CollapseProps, Divider } from 'antd';
import { EXPLORE_OPTIONS } from '../utils/constants';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';

const SplitArrayElements = ({ data }: { data: string[] }) => {
    return data.map((x) => (
        <>
            <Link
                to={`restaurants?search=${x
                    .toLowerCase()
                    .split(' ')
                    .join('-')}`}
                key={x}
                className='capitalize'
            >
                {x}
            </Link>
            <Divider type='vertical' />
        </>
    ));
};

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: <Title level={4}>Popular cuisines near me</Title>,
        children: <SplitArrayElements data={EXPLORE_OPTIONS.one} />,
        showArrow: false,
    },
    {
        key: '2',
        label: <Title level={4}>Popular restaurant types near me</Title>,
        children: <SplitArrayElements data={EXPLORE_OPTIONS.two} />,
        showArrow: false,
    },
    {
        key: '3',
        label: <Title level={4}>Cities We Deliver To</Title>,
        children: <SplitArrayElements data={EXPLORE_OPTIONS.three} />,
        showArrow: false,
    },
];

const ExploreOptions = () => {
    return (
        <div className='px-6 md:px-0'>
            <Collapse defaultActiveKey={1} accordion items={items} />
        </div>
    );
};

export default ExploreOptions;
