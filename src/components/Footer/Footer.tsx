import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-gray-100 border-t border-t-gray-300">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-between text-gray-600">
        <div>
          <div className="text-sm">
            <div>
              <div className=" text-2xl"><b>CNG</b> Store</div>
              <div className="mt-4">
                <div className="mt-1">
                  Address: 29 Lorem ipsum Dolor Sit Amet
                </div>
                <div className="mt-1">
                  Phone: <a href="tel:0903123456"> 0903 123 456</a>
                </div>
                <div className="mt-1">
                  Email:{" "}
                  <a href="mailto:info@storesearch.com">info@cngstore.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-wrap lg:items-end">
          <div className="mt-6 lg:mt-[50px] flex items-center gap-x-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="cursor-pointer"
              aria-label="Facebook"
            >
              <div className="bg-white inline-flex justify-center items-center rounded-full w-[36px] h-[36px] transform hover:scale-105 transition duration-200">
                <svg
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.90122 14.8953V7.90601H0V5.38952H1.90122V3.24011C1.90122 1.55108 3.02427 0 5.61203 0C6.65978 0 7.43453 0.0976389 7.43453 0.0976389L7.37349 2.44762C7.37349 2.44762 6.58336 2.44014 5.72113 2.44014C4.78795 2.44014 4.63844 2.85818 4.63844 3.55201V5.38952H7.44767L7.32543 7.90601H4.63844V14.8953H1.90122Z"
                    fill="#192031"
                  />
                </svg>
              </div>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="cursor-pointer"
              aria-label="instagram"
            >
              <div className="bg-white inline-flex justify-center items-center rounded-full w-[36px] h-[36px] transform hover:scale-105 transition duration-200">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.51515 4.08364C6.09846 4.08364 4.14915 6.00249 4.14915 8.38142C4.14915 10.7604 6.09846 12.6792 8.51515 12.6792C10.9318 12.6792 12.8811 10.7604 12.8811 8.38142C12.8811 6.00249 10.9318 4.08364 8.51515 4.08364ZM8.51515 11.1755C6.95342 11.1755 5.67668 9.92249 5.67668 8.38142C5.67668 6.84036 6.94962 5.5873 8.51515 5.5873C10.0807 5.5873 11.3536 6.84036 11.3536 8.38142C11.3536 9.92249 10.0769 11.1755 8.51515 11.1755ZM14.0781 3.90784C14.0781 4.46517 13.6221 4.91028 13.0597 4.91028C12.4936 4.91028 12.0414 4.46143 12.0414 3.90784C12.0414 3.35425 12.4974 2.9054 13.0597 2.9054C13.6221 2.9054 14.0781 3.35425 14.0781 3.90784ZM16.9698 4.92524C16.9052 3.58242 16.5936 2.39296 15.5942 1.41296C14.5987 0.432958 13.3903 0.12624 12.0262 0.0589122C10.6203 -0.0196374 6.40624 -0.0196374 5.00031 0.0589122C3.63997 0.1225 2.43163 0.429217 1.43227 1.40922C0.432917 2.38922 0.125131 3.57868 0.0567345 4.9215C-0.0230619 6.30547 -0.0230619 10.4536 0.0567345 11.8376C0.121332 13.1804 0.432917 14.3699 1.43227 15.3499C2.43163 16.3299 3.63617 16.6366 5.00031 16.7039C6.40624 16.7825 10.6203 16.7825 12.0262 16.7039C13.3903 16.6403 14.5987 16.3336 15.5942 15.3499C16.5898 14.3699 16.9014 13.1804 16.9698 11.8376C17.0496 10.4536 17.0496 6.30921 16.9698 4.92524ZM15.1534 13.3226C14.8571 14.0557 14.2833 14.6205 13.5347 14.916C12.4138 15.3536 9.75389 15.2526 8.51515 15.2526C7.2764 15.2526 4.61273 15.3499 3.49558 14.916C2.75081 14.6242 2.17704 14.0594 1.87685 13.3226C1.43227 12.2191 1.53487 9.60081 1.53487 8.38142C1.53487 7.16204 1.43607 4.53998 1.87685 3.44028C2.17324 2.70715 2.74701 2.14235 3.49558 1.84685C4.61653 1.40922 7.2764 1.51021 8.51515 1.51021C9.75389 1.51021 12.4176 1.41296 13.5347 1.84685C14.2795 2.1386 14.8533 2.70341 15.1534 3.44028C15.598 4.54372 15.4954 7.16204 15.4954 8.38142C15.4954 9.60081 15.598 12.2229 15.1534 13.3226Z"
                    fill="#192031"
                  />
                </svg>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className="cursor-pointer"
              aria-label="linkedin"
            >
              <div className="bg-white inline-flex justify-center items-center rounded-full w-[36px] h-[36px] transform hover:scale-105 transition duration-200">
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.86501 15.9593V5.19159H0.215329V15.9593H3.86501ZM2.04064 3.72056C3.31335 3.72056 4.10554 2.89372 4.10554 1.86045C4.08183 0.803885 3.3134 0 2.06479 0C0.816383 0 0 0.803901 0 1.86045C0 2.89377 0.792004 3.72056 2.01681 3.72056H2.04053H2.04064ZM5.88509 15.9593H9.53477V9.94608C9.53477 9.62426 9.55848 9.30278 9.65486 9.07273C9.9187 8.42974 10.5192 7.76379 11.5274 7.76379C12.8481 7.76379 13.3764 8.75123 13.3764 10.1987V15.9592H17.0259V9.78512C17.0259 6.4777 15.2253 4.93879 12.824 4.93879C10.8552 4.93879 9.99073 6.01799 9.51049 6.75303H9.53485V5.19136H5.88517C5.93307 6.20175 5.88517 15.9591 5.88517 15.9591L5.88509 15.9593Z"
                    fill="#192031"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
