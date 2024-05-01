import { Box } from "@mui/material"
import RecentRecipes from "./RecentRecipes"
import Categories from "./Categories"

export default function Home() {
	return (
		<Box>
			<Categories sx={{ pb: 2 }}/>
			<RecentRecipes />
		</Box>
	)
}