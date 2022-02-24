import React from "react";
import { Fragment, useState, useEffect } from "react";
import { get } from "lodash";
import Menu from "../Menu";
import HashLoader from "react-spinners/ClipLoader";
export default function View({
  node,
  setIsModify,
  setSearch,
  nodesSearch,
  onSubmit,
  types,
  loading,
  getAutoTags,
  links,
  loading_neighbors,
}) {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const onCancel = () => setIsModify(false);
  const submit = () => {
    const node = {
      id: id,
      label: name,
      link: link,
      description: description,
      refs: refs.map((node) => node.id).filter(onlyUnique),
      tags: tags
        .concat(tagsM)
        .map((tag) => tag.trim())
        .filter((tag) => tag != "")
        .filter(onlyUnique),
      type: type,
    };
    onSubmit(node);
    console.log(node);
  };
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [refs, setRefs] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsM, setTagsM] = useState([]);
  const [type, setType] = useState("dataset");
  const [loadingTags, setLoadingTags] = useState(false);

  useEffect(() => {
    if (get(node, "id", false)) {
      console.log("to modify ", node);
      setId(node.id);
      setName(node.name);
      setLink(node.link);
      //setType(node.type);
      setDescription(node.description);
      setTags(node.tags);
      setType(node.type);
      setRefs(links);
    }
  }, [node, links]);
  {
    /*  useEffect(() => {
    async function getTags() {
      console.log(loadingTags);
      await getAutoTags(link, setTags, setLoadingTags);

      //console.log("auto tags", newTags);
    }

    getTags();
  }, [link]);*/
  }
  return (
    <div>
      {" "}
      {loading ? (
        <div class="flex flex-col h-96 justify-center items-center">
          <HashLoader color="green" size={200} />
          <p class="mt-4 font-semibold text-xl">
            Please wait while we add your node to the graph
          </p>
        </div>
      ) : (
        <form>
          <div className="space-y-6">
            <div>
              <h1 className="text-lg leading-6 font-medium text-gray-900">
                Node Attributes
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Let’s get started by filling in the information below to create
                your new node.
              </p>
            </div>
            <Menu type={type} setType={setType} types={types} />
            <div class="">
              <label
                htmlFor="project_name"
                className="block text-sm font-medium text-gray-700"
              >
                Node Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="project_name"
                  id="project_name"
                  className="block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Example: CNN original paper"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="node_link"
                className="block text-sm font-medium text-gray-700"
              >
                Node url
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="node_link"
                  id="node_link"
                  className="block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Example: www.arxiv.com/123"
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border border-gray-300 rounded-md"
                  //  defaultValue={""}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="space-y-1">
                <label
                  htmlFor="add_team_members"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Node references
                </label>
                <p id="add_team_members_helper" className="sr-only">
                  Search by node name
                </p>
                <div className="flex">
                  <div className="flex-grow">
                    <input
                      type="text"
                      name="add_team_members"
                      id="add_team_members"
                      className="block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
                      placeholder="tap a node name ..."
                      aria-describedby="add_team_members_helper"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div class="flex justify-center bg-gray-100 m-4 rounded-md p-4 space-x-2 flex-wrap  ">
                {loading_neighbors ? (
                  <HashLoader color="green" size={100} />
                ) : (
                  refs.map((node) => (
                    <span className=" my-1 inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
                      {node.label}
                      <button
                        onClick={() =>
                          setRefs((refs) =>
                            refs.filter((ref) => ref.id != node.id)
                          )
                        }
                        type="button"
                        className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                      >
                        <span className="sr-only">Remove large option</span>
                        <svg
                          className="h-2 w-2"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 8 8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeWidth="1.5"
                            d="M1 1l6 6m0-6L1 7"
                          />
                        </svg>
                      </button>
                    </span>
                  ))
                )}
              </div>
              {nodesSearch.length != 0 ? (
                <div className="border-b border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {nodesSearch.map((node) => (
                      <li
                        key={node.id}
                        onClick={() => setRefs([...refs, node])}
                        className="py-4 px-1 flex cursor-pointer hover:bg-gray-100"
                      >
                        <span className="h-10 w-10  bg-green-200 rounded-full" />

                        <div className="ml-3 flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {node.label}
                          </span>
                          <span className="text-sm text-gray-500">
                            {node.type}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                className="mt-1 block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
                placeholder="add tags separated by a comma"
                onChange={(e) => {
                  setTagsM(e.target.value.split(","));
                  // console.log(tags);
                }}
              />
            </div>
            <div class="flex justify-center bg-gray-100 m-4 rounded-md p-4 space-x-2 flex-wrap  ">
              {loadingTags ? (
                <HashLoader color="green" size={100} />
              ) : (
                tagsM.concat(tags).map((tag) => (
                  <span
                    key={tag}
                    className=" my-1 inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700"
                  >
                    {tag}
                    <button
                      type="button"
                      className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                      onClick={() => {
                        if (tags.includes(tag)) {
                          setTags((tags) => tags.filter((tag_) => tag_ != tag));
                        }
                        if (tagsM.includes(tag)) {
                          setTagsM((tags) =>
                            tags.filter((tag_) => tag_ != tag)
                          );
                        }
                      }}
                    >
                      <span className="sr-only">Remove large option</span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </span>
                ))
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={onCancel}
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                type="button"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Modify this Node
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
