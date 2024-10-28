import Image from "next/image";
import Resizer from "react-image-file-resizer";

export default function ImageInputComponent({
  width = 200,
  height = 200,
  image,
  setImage,
  labeltext = "",
  imageIndex = null, // bazı senaryolarda birden fazla image almamız gerekebilir. onun için slot indexini veriyoruz. kullanımı /products/createProductPAge/createProductForm/panels/imagePanel içinde mevcut.
}) {
  function fileHandler(e) {
    var fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        // Image boyutunu düşürme
        // bkz. https://www.npmjs.com/package/react-image-file-resizer
        Resizer.imageFileResizer(
          e.target.files[0],
          800,
          800,
          "WEBP",
          80,
          0,
          (uri) => {
            if (imageIndex != null) {
              setImage(imageIndex, uri);
            } else {
              setImage(uri);
            }
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div
      style={{ width: width, height: height }}
      className="relative  w-full overflow-hidden  border border-dashed rounded-xl border-black"
    >
      <div
        onClick={() => {
          if (imageIndex) setImage(imageIndex, null);
          else setImage(null);
        }}
        className="!w-[36px] hover:scale-110 hover:bg-red-200 transition-all duration-200 cursor-pointer !h-[36px] flex items-center justify-center absolute right-0 top-0 bg-white rounded-bl-xl"
      >
        <Image
          src="/assets/icons/trashIcon.svg"
          alt=""
          width={24}
          height={24}
        />
      </div>
      <label
        className="!w-full !h-full cursor-pointer flex items-center justify-center   "
        htmlFor={`picture__input${imageIndex == null ? 0 : imageIndex}`}
      >
        <span className=" w-full flex items-center ">
          {image && (
            <Image
              className="max-w-full aspect-square w-full "
              src={image}
              alt=""
              width={90}
              height={90}
            />
          )}
          {!image && (
            <span className="ml-auto mr-auto max-w-[50%] text-center">
              {labeltext != "" ? labeltext : "Resim Yüklemek için Tıklayın"}
            </span>
          )}
        </span>
      </label>

      <input
        onChange={(e) => {
          fileHandler(e);
        }}
        type="file"
        className="hidden w-full h-full "
        name="picture__input"
        id={`picture__input${imageIndex == null ? 0 : imageIndex}`}
      />
    </div>
  );
}
