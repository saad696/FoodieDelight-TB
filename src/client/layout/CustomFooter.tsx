import React from 'react';
import { Layout, Row, Col } from 'antd';
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
} from '@ant-design/icons';
import { Logo } from '../../';

const { Footer } = Layout;

const CustomFooter: React.FC = () => {
    return (
        <Footer className='bg-[#f5f5f5] p-6'>
            <div className='container mx-auto'>
                <Logo />
                <Row
                    gutter={[16, 16]}
                    className='mt-6 text-center md:text-left'
                >
                    <Col xs={24} sm={12} md={6}>
                        <h3 className='font-bold text-gray-600'>
                            ABOUT FOODIEDELIGHT
                        </h3>
                        <ul>
                            <li>Who We Are</li>
                            <li>Blog</li>
                            <li>Work With Us</li>
                            <li>Investor Relations</li>
                            <li>Report Fraud</li>
                            <li>Contact Us</li>
                        </ul>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h3 className='font-bold text-gray-600'>
                            FOODIEDELIGHT VERSE
                        </h3>
                        <ul>
                            <li>FOODIEDELIGHT</li>
                            <li>FOODIEDELIGHT</li>
                            <li>FOODIEDELIGHT</li>
                            <li>FOODIEDELIGHT</li>
                            <li>FOODIEDELIGHT</li>
                        </ul>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h3 className='font-bold text-gray-600'>
                            FOR RESTAURANTS
                        </h3>
                        <ul>
                            <li>Partner With Us</li>
                            <li>Apps For You</li>
                        </ul>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h3 className='font-bold text-gray-600'>LEARN MORE</h3>
                        <ul>
                            <li>Privacy</li>
                            <li>Security</li>
                            <li>Terms</li>
                            <li>Sitemap</li>
                        </ul>
                    </Col>
                </Row>
                <Row className='mt-6'>
                    <Col xs={24} className='text-center'>
                        <h3 className='font-bold text-gray-600'>
                            SOCIAL LINKS
                        </h3>
                        <div className='flex justify-center space-x-4'>
                            <FacebookOutlined className='text-xl' />
                            <TwitterOutlined className='text-xl' />
                            <InstagramOutlined className='text-xl' />
                        </div>
                    </Col>
                </Row>
            </div>
        </Footer>
    );
};

export default CustomFooter;
