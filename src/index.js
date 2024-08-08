import { createRoot } from 'react-dom/client';
import React from "react";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Loader from './Loader/Loader';
const App = React.lazy(() => import('./App/App'));
const Forum = React.lazy(() => import('./Forum/Forum'));
const Login = React.lazy(() => import('./Login/Login'));
const Register = React.lazy(() => import('./Register/Register'));
const Acc = React.lazy(() => import('./Acc/Acc'));
const Sup = React.lazy(() => import('./Sup/Sup'));
const Players = React.lazy(() => import('./Players/Players'));
const Terms = React.lazy(() => import('./Terms/Terms'));
const Error = React.lazy(() => import('./Error/Error'));
const Profile = React.lazy(() => import('./Profile/Profile'));
const Theme = React.lazy(() => import('./Theme/Theme'));
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense fallback={<Loader />}>
        <App></App>
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Error></Error>
      </React.Suspense>
    ),
  },
  {
    path: "/pravilaiuslovi",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Terms></Terms>
      </React.Suspense>

    ),
  },
  {
    path: "/forum/:id",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Theme></Theme>
      </React.Suspense>

    ),
  },
  {
    path: "/saigraci",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Players></Players>
      </React.Suspense>
    ),
  },
  {
    path: "/forum",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Forum></Forum>
      </React.Suspense>
    )
  },
  {
    path: "/prijava",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Login></Login>
      </React.Suspense>
    )
  },
  {
    path: "/registracija",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Register></Register>
      </React.Suspense>
    )
  },
  {
    path: "/podrska",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Sup></Sup>
      </React.Suspense>
    )
  },
  {
    path: "/nalog",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Acc></Acc>
      </React.Suspense>
    )
  },
  {
    path: "/profil/:id",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Profile></Profile>
      </React.Suspense>
    )
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
