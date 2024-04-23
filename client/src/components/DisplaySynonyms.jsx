import React from "react";
import Loader from "./Loader";

const DisplaySynonyms = ({ data, loading }) => {
  return (
    <div className=" min-h-[320px] h-auto p-8 pb-28 md:pb-16 w-full bg-gray-950  text-gray-100  ">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col  w-[70%] mx-auto">
          <h1 className="mb-6 mt-6  font-bold tracking-tight leading-none text-white text-xl lg:text-2xl">
            {data?.length == 0 ? (
              <> No synonyms found in our dictionary!</>
            ) : (
              <>
                Synonyms for the word
                <span className="italic text-blue-500 "> {data?.word} </span>
              </>
            )}
          </h1>

          <div className="flex mt-6 flex-col md:flex-row flex-wrap w-full ">
            {data?.synonyms?.map((el, i) => (
              <span
                key={i}
                className="bg-blue-100 mt-4 text-slate-800 text-sm font-medium me-2 px-5 py-2.5 mr-4 rounded"
              >
                # {el}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplaySynonyms;