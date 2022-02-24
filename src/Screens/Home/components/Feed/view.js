import React, { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";

import {
  AcademicCapIcon,
  BadgeCheckIcon,
  BellIcon,
  CashIcon,
  ClockIcon,
  MenuIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";

const user = {
  name: "Chelsea Hagon",
  email: "chelseahagon@example.com",
  role: "Human Resources Manager",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Profile", href: "#", current: false },
  { name: "Resources", href: "#", current: false },
  { name: "Company Directory", href: "#", current: false },
  { name: "Openings", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const stats = [
  { label: "Vacation days left", value: 12 },
  { label: "Sick days left", value: 4 },
  { label: "Personal days left", value: 2 },
];
const actions = [
  {
    icon: ClockIcon,
    name: "Request time off",
    href: "#",
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    icon: BadgeCheckIcon,
    name: "Benefits",
    href: "#",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    icon: UsersIcon,
    name: "Schedule a one-on-one",
    href: "#",
    iconForeground: "text-light-blue-700",
    iconBackground: "bg-light-blue-50",
  },
  {
    icon: CashIcon,
    name: "Payroll",
    href: "#",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    icon: ReceiptRefundIcon,
    name: "Submit an expense",
    href: "#",
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    icon: AcademicCapIcon,
    name: "Training",
    href: "#",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];
const recentHires = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Floyd Miles",
    handle: "floydmiles",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Emily Selman",
    handle: "emilyselman",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Kristin Watson",
    handle: "kristinwatson",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
];
const announcements = [
  {
    id: 1,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.",
  },
  {
    id: 2,
    title: "New password policy",
    href: "#",
    preview:
      "Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.",
  },
  {
    id: 3,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function View({ feedNodes }) {
  const history = useHistory();
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Announcements */}
      <section aria-labelledby="announcements-title">
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <div className="p-6">
            <h2
              className="text-base font-medium text-gray-900"
              id="announcements-title"
            >
              Added recently
            </h2>
            <div className="flow-root mt-6">
              <ul className="-my-5 divide-y divide-gray-200">
                {feedNodes.length != 0 ? (
                  feedNodes.map((node) => (
                    <li key={node.id} className="py-5">
                      <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                        <h3 className="text-sm  font-semibold text-gray-800">
                          <button
                            // href={node.href}
                            onClick={() =>
                              history.push(`/explorer?query=${node.label}`)
                            }
                            className="hover:underline flex  font-semibold flex-wrap text-left focus:outline-none"
                          >
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            {node.label}
                          </button>
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          {node.description}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <>
                    {[1, 2, 3].map((s) => (
                      <li key={s} className="py-5">
                        <div className=" focus-within:ring-2 focus-within:ring-cyan-500">
                          <h3 className="text-sm font-semibold text-gray-800">
                            <a
                              // href={node.href}
                              className="hover:underline focus:outline-none"
                            >
                              {/* Extend touch target to entire panel */}
                              <span
                                className=" flex  animate-pulse h-3 w-1/2 bg-gray-300 rounded-sm inset-0"
                                aria-hidden="true"
                              />
                            </a>
                          </h3>
                          <p className=" mt-2  h-20 text-sm animate-pulse bg-gray-200 rounded-sm text-gray-600 line-clamp-2"></p>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="#"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View all
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
