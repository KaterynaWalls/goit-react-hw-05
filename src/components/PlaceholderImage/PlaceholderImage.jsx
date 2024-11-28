import placeholderImage from "../../assets/placeholder.png";

const PlaceholderImage = ({ src, alt, className }) => {
    // const placeholder = "https://via.placeholder.com/500";
    return <img src={src || placeholderImage} alt={alt || "Image is not available"} className={className} />;
  };
  
  export default PlaceholderImage;
  