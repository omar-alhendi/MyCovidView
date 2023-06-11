import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { ScaleTypes } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";
import { LoaderData } from "../types";
import { simpleBarLoader } from "../loaders";

const options = {
	"title": "Total Death in Each State",
	"axes": {
		"left": {
			"mapsTo": "group",
			"title": "State",
			"scaleType": ScaleTypes.LABELS,
		},
		"bottom": {
			"title": "Total Death",
			"mapsTo": "value"
		}
	},
	"height": "400px",
}

const BarChart = () => {
  const data = useLoaderData() as LoaderData<typeof simpleBarLoader>;

	const {sortOrder = ""} = useParams();
	const navigate = useNavigate();

	return (
		<div>
			<SimpleBarChart
				data={data}
				options={options} />
			<select value={sortOrder} onChange={(event) => {
				navigate(`/bar/${event.target.value}`)
			}}>
				<option value="asc">Ascending</option>
				<option value="desc">Descending</option>
				<option value="">None</option>
			</select>
		</div>
	);
}

export default BarChart;
  