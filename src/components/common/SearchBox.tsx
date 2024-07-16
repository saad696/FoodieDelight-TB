import { useEffect } from 'react';
import { Col, Empty, Row, Select } from 'antd';
import { useDebounce } from '@uidotdev/usehooks';
import { useSignal } from '@preact/signals-react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../utils/constants';
import { SearchOutlined, StarTwoTone } from '@ant-design/icons';

interface SearchBoxProps<T> {
    placeholder?: string;
    className?: string;
    fetchData: (query: string) => Promise<T[]>;
    searchFor: string;
    customOptions?: boolean;
}

const SearchBox = <T extends Record<string, string | number>>({
    placeholder,
    className,
    fetchData,
    searchFor,
    customOptions = false,
}: SearchBoxProps<T>) => {
    const value = useSignal<string | undefined>(undefined);
    const data = useSignal<T[]>([]);
    const searchTerm = useSignal<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm.value, 500);
    const navigate = useNavigate();

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchData(debouncedSearchTerm).then((result) => {
                data.value = result;
            });
        } else {
            data.value = [];
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, fetchData]);

    const handleSearch = (searchValue: string) => {
        searchTerm.value = searchValue;
    };

    const handleChange = (selectedValue: string) => {
        value.value = selectedValue;

        switch (searchFor) {
            case constants.RESTAURANTS:
                navigate(`/restaurants/${value.value}`);
                break;

            default:
                break;
        }
    };

    return (
        <Select
            showSearch
            value={value.value}
            placeholder={placeholder}
            className={`${className}`}
            defaultActiveFirstOption={false}
            suffixIcon={<SearchOutlined />}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={
                <Empty description='We could not understand what you mean, try rephrasing the query.' />
            }
            size='large'
            options={data.value.map((d) => ({
                value: d.value,
                label: d.text,
                ...d,
            }))}
            optionRender={(option) =>
                customOptions && searchFor === constants.RESTAURANTS ? (
                    <Row align={'middle'} justify={'space-between'}>
                        <Col xs={18}>
                            <div className='flex items-center'>
                                <img
                                    className='rounded mr-2'
                                    src={option.data.image as string}
                                    alt={option.data.label as string}
                                    width={50}
                                />
                                <div>
                                    <b className='block text-xs md:text-sm'>
                                        {option.data.label}
                                    </b>
                                    <small className='block'>
                                        {option.data.address}
                                    </small>
                                </div>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className='font-semibold text-xs md:text-sm'>
                                Ratings: {option.data.rating} <StarTwoTone />
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <b className='block'>{option.data.label}</b>
                )
            }
        />
    );
};

export default SearchBox;
