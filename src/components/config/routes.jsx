import {
    createBrowserRouter,
  } from "react-router";

  import Home from "../screens/home";
  import Pokemon from "../screens/pokemon";
  import MemoryGame from "../screens/memory";
  import LoginPage from "../login";
  import RegisterPage from "../register";
  
  let router = createBrowserRouter([
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/pokemon/:id",
      Component: Pokemon,
    },

    {
      path: "/memory",
      Component: MemoryGame,
    },

    {
      path: "/login",
      Component: LoginPage,
    },

    {
      path: "/register",
      Component: RegisterPage,
    }

  ]);
  
  
  export default router;

  