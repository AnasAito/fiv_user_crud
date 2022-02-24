/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Modify from "./Modify";
export default function View({
  node,
  refQuery,
  typesQuery,
  NodeCreate,
  EdgeCreate,
  tagsQuery,
  TagCreate,
  NodeTagCreate,
  NodeNeighbors,
  NodeUpdate,
}) {
  const [isModify, setIsModify] = useState(false);
  console.log("from sidebar", node);

  return (
    <>
      {node == null ? (
        <div class="flex w-full  justify-center items-center">
          <div className="bg-gray-200  p-4 flex  flex-col items-center overflow-hidden shadow rounded-lg">
            <svg class="h-20 w-20 " viewBox="0 0 24 24">
              <path d="m21.5 22h-19c-1.378 0-2.5-1.121-2.5-2.5v-7c0-.07.015-.141.044-.205l3.969-8.82c.404-.896 1.299-1.475 2.28-1.475h11.414c.981 0 1.876.579 2.28 1.475l3.969 8.82c.029.064.044.135.044.205v7c0 1.379-1.122 2.5-2.5 2.5zm-20.5-9.393v6.893c0 .827.673 1.5 1.5 1.5h19c.827 0 1.5-.673 1.5-1.5v-6.893l-3.925-8.723c-.242-.536-.779-.884-1.368-.884h-11.414c-.589 0-1.126.348-1.368.885z" />
              <path d="m16.807 17h-9.614c-.622 0-1.186-.391-1.404-.973l-1.014-2.703c-.072-.194-.26-.324-.468-.324h-3.557c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.557c.622 0 1.186.391 1.405.973l1.013 2.703c.073.194.261.324.468.324h9.613c.208 0 .396-.13.468-.324l1.013-2.703c.22-.582.784-.973 1.406-.973h3.807c.276 0 .5.224.5.5s-.224.5-.5.5h-3.807c-.208 0-.396.13-.468.324l-1.013 2.703c-.219.582-.784.973-1.405.973z" />
            </svg>
            <div className=" text-xl font-black  ">No node was selected</div>
          </div>
        </div>
      ) : isModify ? (
        <div className="  w-full  flex flex-col justify-between ">
          <Modify
            setIsModify={setIsModify}
            NodeNeighbors={NodeNeighbors}
            node={node}
            refQuery={refQuery}
            typesQuery={typesQuery}
            NodeCreate={NodeCreate}
            EdgeCreate={EdgeCreate}
            tagsQuery={tagsQuery}
            TagCreate={TagCreate}
            NodeTagCreate={NodeTagCreate}
            NodeUpdate={NodeUpdate}
          />
        </div>
      ) : (
        <div className="  w-full  flex flex-col justify-between ">
          {/*title */}
          <div>
            <h2 className="text-lg font-medium text-gray-900">{node.name}</h2>
            <p className="text-sm font-medium text-gray-500">{node.type}</p>
            <div class="flex flex-row flex-wrap mt-2 space-x-1 ">
              {node.tags.map((tag) => (
                <span
                  className={
                    " bg-green-200 my-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div class="">
            <h3 className="font-medium text-gray-900">Description</h3>
            <p class="   mt-3 bg-gray-100 rounded-md  cursor-pointer border-black  hover:bg-gray-200 p-2 overflow-ellipsis overflow-hidden ">
              {node.description}
            </p>
          </div>
          {/*information*/}
          <div class="">
            <h3 className="font-medium text-gray-900">Information</h3>
            <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Uploaded by</dt>
                <dd className="text-gray-900">Marie Culver</dd>
              </div>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-900">
                  {node.createdAt.split("T")[0]}
                </dd>
              </div>

              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Score</dt>
                <dd className="text-gray-900">{node.score * 100}%</dd>
              </div>
            </dl>
          </div>
          {/*actions */}
          <div className="flex ">
            {node.link ? (
              <button
                type="button"
                href={node.link}
                onClick={() => window.open(node.link, "_blank")}
                className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Visit
              </button>
            ) : (
              <></>
            )}

            <button
              type="button"
              className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setIsModify(true)}
            >
              Modify
            </button>
          </div>
        </div>
      )}
    </>
  );
}
