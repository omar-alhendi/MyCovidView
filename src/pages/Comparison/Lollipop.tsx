import { LollipopChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
	title: "Number of Vaccinated People by States",
	resizable: true,
	axes: {
		left: {
			title: "Number of Vaccinated People",
			mapsTo: "value",
			scaleType: ScaleTypes.LINEAR,
		},
		bottom: {
			mapsTo: "group",
			title: "State",
			scaleType: ScaleTypes.LABELS,
		},
	},
	height: "500px",
};

const Lollipop = ({ data }: { data: any }) => {
	return (
		<div>
			<h1>Lollipop Chart</h1>
			<LollipopChart data={data} options={options} />
		</div>
	);
};

export default Lollipop;
