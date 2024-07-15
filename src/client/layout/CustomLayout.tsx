import React from 'react';
import { CustomFooter, CustomHeader } from '../../';
import { Layout } from 'antd';

const CustomLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <>
            <CustomHeader />
            <Layout className='min-h-screen bg-white'>{children}</Layout>
            <CustomFooter />
        </>
    );
};

export default CustomLayout;
