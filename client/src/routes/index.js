import { Route, BrowserRouter, Routes } from "react-router-dom"
import Layout from "../layout"
import Home from "./Home"
import NoPage from "./NoPage"
import Data from "./Data"
import Recipes from "./Recipes"
import Recipe from "./Recipes/Recipe"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Home />} path="/" exact />
          <Route path="/recipes">
            <Route index element={<Recipes />} exact/>
            <Route element={<Recipe />} path="/recipes/:id" />
          </Route>
          <Route element={<Data />} path="/data" exact />
          <Route element={<NoPage />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes