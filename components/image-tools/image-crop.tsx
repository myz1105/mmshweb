import React, {
  useRef,
  useState,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  PercentCrop,
  PixelCrop,
} from "react-image-crop";
import setCanvasPreview from "../../types/canvas-data";
import "react-image-crop/dist/ReactCrop.css";
import { Input } from "@heroui/input";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

interface ImageCropperProps {
  closeModal: () => void;
  updateAvatar: (dataUrl: string) => void;
}

export interface ImageCropperRef {
  cropImage: () => void; // Expose cropImage function
}

const ImageCropper = forwardRef<ImageCropperRef, ImageCropperProps>(
  ({ closeModal, updateAvatar }, ref) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imgSrc, setImgSrc] = useState<string>("");
    const [crop, setCrop] = useState<PercentCrop | undefined>();
    const [error, setError] = useState<string>("");

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        imageElement.addEventListener("load", (e) => {
          if (error) setError("");
          const { naturalWidth, naturalHeight } =
            e.currentTarget as HTMLImageElement; // Type assertion
          if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
            setError("Image must be at least 150 x 150 pixels.");
            return setImgSrc("");
          }
        });
        setImgSrc(imageUrl);
      });
      reader.readAsDataURL(file);
    };

    const cropImage = () => {
      if (imgRef.current && previewCanvasRef.current && crop) {
        setCanvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
        );
        const dataUrl = previewCanvasRef.current.toDataURL();
        updateAvatar(dataUrl);
        closeModal();
      }
    };

    useImperativeHandle(ref, () => ({
      cropImage, // Expose cropImage function
    }));

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.currentTarget; // Type assertion
      const { width, height } = target;
      const cropWidthInPercent =
        ((MIN_DIMENSION * 2 < width ? MIN_DIMENSION * 2 : MIN_DIMENSION) /
          width) *
        100;

      const crop = makeAspectCrop(
        {
          unit: "%",
          width: cropWidthInPercent,
        },
        ASPECT_RATIO,
        width,
        height
      );
      const centeredCrop = centerCrop(crop, width, height);
      setCrop(centeredCrop);
    };

    return (
      <>
        <label className="block mb-3 w-fit">
          <span className="sr-only">Choose profile photo</span>
          <Input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            variant="underlined"
          />
        </label>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        {imgSrc && (
          <div className="flex flex-col items-center">
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Upload"
                style={{ maxHeight: "50vh" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        )}
        {crop && (
          <canvas
            ref={previewCanvasRef}
            className="mt-4"
            style={{
              display: "none",
              border: "1px solid black",
              objectFit: "contain",
              width: 150,
              height: 150,
            }}
          />
        )}
      </>
    );
  }
);

export default ImageCropper;
