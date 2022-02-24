import React from "react";

import { get } from "lodash";
import { useQuery } from "@apollo/client";
import Queries from "../api/queries/index";

export default function Index() {
  const [inputId, setInputId] = React.useState("");
  const [inputId_, setInputId_] = React.useState("");
  const handleClick = () => {
    setInputId_(inputId);
  };
  const onChangeHandler = (event) => {
    setInputId(event.target.value);
  };

  const { data: user_fn } = useQuery(Queries["user.get.first_name"], {
    variables: { id: inputId_ },
  });
  const { data: user_ln } = useQuery(Queries["user.get.last_name"], {
    variables: { id: inputId_ },
  });
  const { data: user_mail } = useQuery(Queries["user.get.email"], {
    variables: { id: inputId_ },
  });
  const { data: id } = useQuery(Queries["user.get.id"], {
    variables: { id: inputId_ },
  });

  const user_first_name = get(user_fn, "user_by_pk.firstName", "");
  const user_flast_name = get(user_ln, "user_by_pk.lastName", "");
  const user_email = get(user_mail, "user_by_pk.email", "");
  const user_id = get(id, "user_by_pk.userId", "");

  return (
    <div className="bg-red-50  p-5 ">
      <h1>User CRUD (search user by id)</h1>
      <div class="flex flex-row justify-between">
        <input
          type="text"
          name="name"
          onChange={onChangeHandler}
          value={inputId}
        />
        <button
          class="bg-green-100 rounded-md px-4 py-2 text-green-700"
          onClick={() => {
            handleClick();
          }}
        >
          search
        </button>
      </div>
      <div class="pt-4">
        <div>
          {" "}
          user Id : <span class="font-bold">{user_id}</span>
        </div>

        <div>
          {" "}
          user first name : <span class="font-bold">{user_first_name}</span>
        </div>
        <div>
          {" "}
          user last name : <span class="font-bold">{user_flast_name}</span>
        </div>
        <div>
          {" "}
          user email : <span class="font-bold">{user_email}</span>
        </div>
      </div>
    </div>
  );
}
