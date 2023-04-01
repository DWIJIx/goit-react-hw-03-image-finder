import { Img } from './ImageGalleryItem.Styled';

export const ImageGalleryItem = ({ image }) => {
  return <Img src={image.webformatURL} alt={image.tags} />;
};
