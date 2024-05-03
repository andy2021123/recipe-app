import { Box, useTheme } from "@mui/material"
import RecentRecipes from "./RecentRecipes"
import Categories from "./Categories"

export default function Home() {
	const theme = useTheme()

	return (
		<Box>
			<Categories sx={{ pb: theme.getSpacing()}}/>
			<RecentRecipes />
		</Box>
	)
}