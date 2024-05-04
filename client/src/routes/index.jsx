import { Route, BrowserRouter, Routes } from "react-router-dom"
import Layout from "layout"
import Home from "./Home"
import NoPage from "./NoPage"
import { AllRecipes, CategorizedRecipes } from "./Recipes"
import Recipe from "./Recipe"
import AddRecipe from "./AddRecipe"
import AddDomain from "./AddDomain"
import EditRecipe from "./EditRecipe"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route element={<Home/>} path="/" exact />
          <Route path="/recipes">
            <Route index element={<AllRecipes/>} exact/>
            <Route element={<CategorizedRecipes/>} path=":category"/>
          </Route>
          <Route element={<AddRecipe/>} path="/add-recipe"/>
          <Route element={<EditRecipe/>} path="/edit-recipe/:id"/>
          <Route element={<AddDomain/>} path="/add-domain"/>
          <Route element={<Recipe/>} path="/recipe/:id"/>
          <Route element={<NoPage/>} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}