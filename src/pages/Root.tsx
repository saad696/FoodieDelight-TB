import { Outlet } from 'react-router-dom';
import { CustomLayout } from '../';

const Root = () => {
    return (
        <CustomLayout>
            <Outlet />
        </CustomLayout>
    );
};

export default Root;
