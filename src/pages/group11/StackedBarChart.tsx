import { StackedBarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import "@carbon/styles/css/styles.css";
import { ScaleTypes } from '@carbon/charts/interfaces';
import { useLoaderData } from 'react-router-dom';
import { stackedBarLoader } from '../../loaders';
import { LoaderData } from '../../types';

const options = {
	title: 'Daily Covid Cases and Deaths in Each State',
	axes: {
		left: {
			mapsTo: "value",
			title: "Value",
			stacked: true
		},
		bottom: {
			mapsTo: "key",
			title: "State",
			scaleType : ScaleTypes.LABELS
		}
	},
	height: '400px',
};

function G11StackedBarChart () {
	const loaderData = useLoaderData() as LoaderData<typeof stackedBarLoader>;
	let data: any[] = [];
	loaderData.forEach((item: any) => {
		data.push(...item);
	})

	return (
		<div style={{ width: '100%', height: '400px' }}>
			<h1>Stacked Bar Chart</h1>
			<StackedBarChart data={data} options={options} />
		</div>
	);
}

export default G11StackedBarChart;
