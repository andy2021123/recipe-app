import { Route, BrowserRouter, Routes } from "react-router-dom"
import Layout from "layout"
import Home from "./Home"
import NoPage from "./NoPage"
import Recipes from "./Recipes"
import Recipe from "./Recipe"
import AddRecipe from "./AddRecipe"
import CategoryRecipes from "./Recipes/CategoryRecipes"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Home />} path="/" exact />
          <Route path="/recipes">
            <Route index element={<Recipes />} exact/>
            <Route element={<CategoryRecipes />} path=":category"/>
          </Route>
          <Route element={<AddRecipe />} path="add-recipe" />
          <Route element={<Recipe />} path="/:id" />
          <Route element={<NoPage />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes