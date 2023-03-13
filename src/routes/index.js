//routes/index.js
import React from "react";
import { Redirect } from "react-router-dom";
import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Album from "../application/Album";
import Rank from "../application/Rank";
import Singer from "../application/Singer";

const routeList = [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/recommend"} />,
      },
      {
        path: "/recommend",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Album,
          },
        ],
      },
      {
        path: "/singers",
        component: Singers,
        routes: [
          {
            path: "/singers/:id",
            component: Singer,
          },
        ],
      },
      {
        path: "/rank",
        component: Rank,
        routes: [
          {
            path: "/rank/:id",
            component: Album,
          },
        ],
      },
    ],
  },
];

export default routeList;
