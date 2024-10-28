"use client";
import Image from "next/image";
import ModalComponent from "../modal";
import { MotionButton } from "../motion";
import { useState } from "react";
import Loader from "../loading";

export default function ImageModal({
  images = null,

  loading = false,
}) {
  const [index, setIndex] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleIndex = (isNext) => {
    if (isNext) {
      if (index == images.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    } else {
      if (index == 0) {
        setIndex(images.length - 1);
      } else {
        setIndex(index - 1);
      }
    }
  };

  return (
    <>
      <MotionButton
        whileHover={{ scale: 2 }}
        whileTap={{ scale: 1.5 }}
        transition={{ duration: 0.2 }}
        className="w-24 h-24 "
        onClick={() => {
          setIsOpenModal(true);
        }}
      >
        {images[0] && (
          <Image
            className="w-24 h-auto max-h-24"
            src={images[0]}
            width={100}
            height={100}
            alt=""
          />
        )}
      </MotionButton>
      <ModalComponent
        classname={"!px-0"}
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
      >
        {loading && (
          <div className="text-center">
            <p className="mb-5">Tüm Resimler Yükleniyor...</p>
            <Loader loading={loading} />
          </div>
        )}
        {!loading && (
          <div className="px-2 flex items-center gap-2">
            {images.length > 1 && (
              <MotionButton
                onClick={() => {
                  handleIndex(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowSvg />
              </MotionButton>
            )}
            <Image
              className="w-full max-h-full h-auto "
              src={images[index]}
              width={100}
              height={100}
              alt=""
            />
            {images.length > 1 && (
              <MotionButton
                onClick={() => {
                  handleIndex(true);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowSvg className={"!rotate-180"} />
              </MotionButton>
            )}
          </div>
        )}
      </ModalComponent>
    </>
  );
}

const ArrowSvg = ({ className }) => {
  return (
    <svg
      className={className}
      height="36px"
      width="36px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-51.2 -51.2 614.40 614.40"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0">
        <rect
          x="-51.2"
          y="-51.2"
          width="614.40"
          height="614.40"
          rx="307.2"
          fill="#d7dada"
          strokeWidth="0"
        ></rect>
      </g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          style={{ fill: "#8AE9FF" }}
          d="M261.762,39.428c13.664,13.664,13.664,35.818,0,49.482L129.66,221.011h337.151 c19.324,0,34.989,15.665,34.989,34.989c0,19.324-15.665,34.989-34.989,34.989H129.66l132.101,132.101 c13.664,13.664,13.664,35.818,0,49.482c-13.664,13.664-35.819,13.664-49.482,0L20.447,280.742 c-6.832-6.832-10.248-15.786-10.248-24.741s3.416-17.909,10.248-24.741L212.279,39.428 C225.943,25.763,248.098,25.763,261.762,39.428z"
        ></path>{" "}
        <g>
          {" "}
          <path
            style={{ fill: "#248A9C" }}
            d="M237.02,493.021c-12.07,0-23.418-4.7-31.953-13.235L13.236,287.954C4.7,279.418,0,268.07,0,256.001 c0-12.07,4.7-23.417,13.236-31.953L205.067,32.215c8.535-8.535,19.883-13.236,31.953-13.236c12.071,0,23.418,4.7,31.954,13.236 c17.618,17.619,17.618,46.288,0,63.907l-114.691,114.69h312.528c24.918,0,45.189,20.271,45.189,45.189 s-20.271,45.189-45.189,45.189H154.283l114.691,114.69c17.618,17.619,17.618,46.288,0,63.907 C260.44,488.321,249.091,493.021,237.02,493.021z M237.02,39.379c-6.621,0-12.847,2.578-17.529,7.261L27.659,238.471 c-4.682,4.682-7.261,10.908-7.261,17.529c0,6.621,2.578,12.847,7.261,17.529l191.832,191.832 c4.682,4.682,10.908,7.261,17.529,7.261c6.622,0,12.847-2.578,17.529-7.261c9.667-9.666,9.667-25.393,0-35.059L122.449,298.202 c-2.917-2.917-3.79-7.304-2.211-11.115c1.579-3.811,5.297-6.296,9.423-6.296h337.151c13.67,0,24.79-11.121,24.79-24.79 s-11.12-24.79-24.79-24.79H129.66c-4.125,0-7.844-2.486-9.423-6.296s-0.706-8.198,2.211-11.115L254.55,81.698 c9.667-9.666,9.667-25.393,0-35.059C249.867,41.957,243.643,39.379,237.02,39.379z"
          ></path>{" "}
          <path
            style={{ fill: "#248A9C" }}
            d="M141.769,160.638c-2.61,0-5.221-0.995-7.212-2.987c-3.983-3.983-3.983-10.441,0-14.425l3.06-3.06 c3.983-3.983,10.441-3.983,14.425,0c3.983,3.983,3.983,10.441,0,14.425l-3.06,3.06C146.99,159.643,144.379,160.638,141.769,160.638 z"
          ></path>{" "}
          <path
            style={{ fill: "#248A9C" }}
            d="M38.247,264.16c-2.61,0-5.221-0.995-7.212-2.987c-3.983-3.983-3.983-10.441,0-14.425l80.574-80.574 c3.983-3.983,10.441-3.983,14.425,0c3.984,3.983,3.983,10.441,0,14.425L45.46,261.173C43.468,263.164,40.857,264.16,38.247,264.16z "
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};
