import { Avatar, Button, Col, Dropdown, Menu, Row } from 'antd';
import { LoginModal, Logo, RegisterModal } from '../../';
import { authSignals } from '../../signals/signals';
import { Link, useNavigate } from 'react-router-dom';
import { constants } from '../../utils/constants';
import {
    LogoutOutlined,
    PlusCircleOutlined,
    UserOutlined,
} from '@ant-design/icons';

const CustomHeader = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem(constants.USER);
        authSignals.loggedInUser.value = null;
        navigate('/');
    };

    return (
        <>
            <header className='bg-[#f5f5f5] px-4 md:px-32 lg:px-44 py-2'>
                <Row gutter={[32, 32]} align={'middle'}>
                    <Col xs={authSignals.loggedInUser.value ? 18 : 24} md={12}>
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                    </Col>
                    <Col xs={authSignals.loggedInUser.value ? 6 : 24} md={12}>
                        <div className='space-x-4 text-center md:text-right'>
                            {!authSignals.loggedInUser.value && (
                                <Button type={'text'}>Add Restaurant</Button>
                            )}
                            {authSignals.loggedInUser.value ? (
                                <>
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item
                                                    key='1'
                                                    icon={<UserOutlined />}
                                                >
                                                    Profile
                                                </Menu.Item>
                                                <Menu.Item
                                                    key='2'
                                                    icon={
                                                        <PlusCircleOutlined />
                                                    }
                                                >
                                                    Add Restaurant
                                                </Menu.Item>
                                                <Menu.Item
                                                    key='3'
                                                    icon={<LogoutOutlined />}
                                                    onClick={logout}
                                                >
                                                    Logout
                                                </Menu.Item>
                                            </Menu>
                                        }
                                        trigger={['click']}
                                    >
                                        <Avatar
                                            src={
                                                authSignals.loggedInUser.value
                                                    .avatar
                                            }
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Dropdown>
                                </>
                            ) : (
                                <>
                                    <Button
                                        type={'text'}
                                        onClick={() =>
                                            (authSignals.loginModal.value =
                                                true)
                                        }
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        type={'text'}
                                        danger
                                        onClick={() =>
                                            (authSignals.registerModal.value =
                                                true)
                                        }
                                    >
                                        Sign up
                                    </Button>
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </header>

            <RegisterModal
                open={authSignals.registerModal.value}
                close={() => (authSignals.registerModal.value = false)}
            />
            <LoginModal
                open={authSignals.loginModal.value}
                close={() => (authSignals.loginModal.value = false)}
            />
        </>
    );
};

export default CustomHeader;
