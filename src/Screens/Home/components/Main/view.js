import React, { Fragment } from "react";

import { SearchIcon } from "@heroicons/react/solid";
import Create from "../Create/index";
import { useHistory } from "react-router-dom";
export default function View({
  create,
  setCreate,
  refQuery,
  typesQuery,
  NodeCreate,
  EdgeCreate,
  tagsQuery,
  TagCreate,
  NodeTagCreate,
}) {
  const history = useHistory();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      //  setSearch(event.target.value);
      history.push(`/explorer?query=${event.target.value}`);
    }
  };
  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-2">
      {/* Welcome panel */}
      <section aria-labelledby="profile-overview-title">
        <div className="rounded-lg bg-white overflow-hidden shadow  ">
          <div className=" p-6">
            {create ? (
              <Create
                setCreate={setCreate}
                refQuery={refQuery}
                typesQuery={typesQuery}
                NodeCreate={NodeCreate}
                EdgeCreate={EdgeCreate}
                tagsQuery={tagsQuery}
                TagCreate={TagCreate}
                NodeTagCreate={NodeTagCreate}
              />
            ) : (
              <>
                {" "}
                <div className="lg:text-center">
                  <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
                    AgriEdge Graph
                  </h2>
                  <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    A better way to explore ressources
                  </p>
                  <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    AgriGraph is a graph based search engine designed to ease
                    internal ressources{" "}
                    <span class="font-semibold text-black">accessibility</span>{" "}
                    in a <span class="font-semibold text-black"> Smart</span>{" "}
                    and{" "}
                    <span class="font-semibold text-black"> Simplified </span>
                    way .
                  </p>
                </div>
                <div className="px-12 mt-4 lg:px-0">
                  {/* Search */}
                  <div className="max-w-xs mx-auto w-full lg:max-w-md">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative text-gray-200 focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        className="block w-full text-green-200 bg-green-200 bg-opa py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 focus:text-gray-900 placeholder-gary-200 focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Tape anything (tag , paper name , project name ...)"
                        type="search"
                        name="search"
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                  </div>
                </div>
                <p class="mt-5 text-black  font-black text-xl text-center ">
                  Or add new nodes
                </p>
                <div class=" mt-4  mb-10 flex items-center justify-center">
                  {" "}
                  <div
                    onClick={() => setCreate(true)}
                    class="  flex cursor-pointer transform  ease-in-out duration-200 hover:scale-105   self-center  h-72 w-72  items-center justify-center bg-green-200 hover:shadow-md border-gray-100 border-dashed border-2 rounded-md"
                  >
                    <p class=" text-6xl    ">+</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
