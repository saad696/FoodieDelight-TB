import { Image } from 'antd';
import React from 'react';

interface ImageGalleryProps {
    images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    return (
        <>
            <Image.PreviewGroup items={[...images]}>
                <Image src={images[0]} />
            </Image.PreviewGroup>
        </>
    );
};

export default ImageGallery;
