import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-4 flex flex-col space-y-3">
      <p className="text-sm">
        <span className="font-semibold px-2 py-1 mr-1 rounded-md bg-gray-100">
          Status:
        </span>
        {outputDetails?.status?.description}
      </p>
      <p className="text-sm">
        <span className="font-semibold px-2 py-1 mr-1 rounded-md bg-gray-100">
          Memory:
        </span>
        {outputDetails?.memory}
      </p>
      <p className="text-sm">
        <span className="font-semibold px-2 py-1 mr-1 rounded-md bg-gray-100">
          Time:
        </span>
        {outputDetails?.time}
      </p>
    </div>
  );
};

export default OutputDetails;
