import "./Overview.css";
import { Link } from "react-router-dom";

interface ChartTypeMap {
  [key: string]: {
    name: string;
    charts: {
      name: string;
      image: string;
    }[];
  };
}

interface ChartType {
  name: string;
  image: string;
}

const Overview = () => {
  const chartTypes: ChartTypeMap = {
    Comparison: {
      name: "Comparison",
      charts: [
        {
          name: "Bar Chart",
          image: "/chartImages/bar_chart.svg",
        },
        {
          name: "Column Chart",
          image: "/chartImages/column_chart.svg",
        },
        {
          name: "Stacked Bar Chart",
          image: "/chartImages/stacked_bar_chart.svg",
        },
        {
          name: "Stacked Line Chart",
          image: "/chartImages/stacked_line_chart.svg",
        },
        {
          name: "Lollipop Chart",
          image: "/chartImages/lollipop_chart.svg",
        },
      ],
    },
    TrendIdentification: {
      name: "Trend Identification",
      charts: [
        {
          name: "Line Chart",
          image: "/chartImages/line_chart.svg",
        },
        {
          name: "Area Chart",
          image: "/chartImages/area_chart.svg",
        },
        {
          name: "Scatter Plot",
          image: "/chartImages/scatter_plot.svg",
        },
      ],
    },
    Correlation: {
      name: "Correlation",
      charts: [
        {
          name: "Scatter Plot",
          image: "/chartImages/scatter_plot.svg",
        },
        {
          name: "Heat Map",
          image: "/chartImages/heat_map.svg",
        },
      ],
    },
    Distribution: {
      name: "Distribution",
      charts: [
        {
          name: "Histogram",
          image: "/chartImages/histogram.svg",
        },
        {
          name: "Box Plot",
          image: "/chartImages/box_plot.svg",
        },
        {
          name: "Donut Chart",
          image: "/chartImages/donut_chart.svg",
        },
      ],
    },
    Ranking: {
      name: "Ranking",
      charts: [
        {
          name: "Bar Chart",
          image: "/chartImages/bar_chart.svg",
        },
        {
          name: "Bullet Chart",
          image: "/chartImages/bullet_chart.svg",
        },
      ],
    },
    Proportion: {
      name: "Proportion",
      charts: [
        {
          name: "Stacked Bar Chart",
          image: "/chartImages/stacked_bar_chart.svg",
        },
        {
          name: "Stacked Area Chart",
          image: "/chartImages/stacked_area_chart.svg",
        },
        {
          name: "Donut Chart",
          image: "/chartImages/donut_chart.svg",
        },
      ],
    },
    Composition: {
      name: "Composition",
      charts: [
        {
          name: "Treemap",
          image: "/chartImages/treemap.svg",
        },
        {
          name: "Stacked Bar Chart",
          image: "/chartImages/stacked_bar_chart.svg",
        },
        {
          name: "Sunburst Chart",
          image: "/chartImages/sunburst_chart.svg",
        },
      ],
    },
    Exploration: {
      name: "Exploration",
      charts: [
        {
          name: "Scatter Plot",
          image: "/chartImages/scatter_plot.svg",
        },
        {
          name: "Heat Map",
          image: "/chartImages/heat_map.svg",
        },
      ],
    },
    AnomalyDetection: {
      name: "Anomaly Detection",
      charts: [
        {
          name: "Box Plot",
          image: "/chartImages/box_plot.svg",
        },
        {
          name: "Scatter Plot",
          image: "/chartImages/scatter_plot.svg",
        },
        {
          name: "Heat Map",
          image: "/chartImages/heat_map.svg",
        },
      ],
    },
    Clustering: {
      name: "Clustering",
      charts: [
        {
          name: "Scatter Plot",
          image: "/chartImages/scatter_plot.svg",
        },
        {
          name: "Dendrogram",
          image: "/chartImages/dendrogram.svg",
        },
      ],
    },
    Communication: {
      name: "Communication",
      charts: [
        {
          name: "Data Dashboard",
          image: "/chartImages/data_dashboard.svg",
        },
      ],
    },
    Feedback: {
      name: "Feedback",
      charts: [
        {
          name: "Progress Bar",
          image: "/chartImages/progress_bar.svg",
        },
        {
          name: "Gauge Chart",
          image: "/chartImages/gauge_chart.svg",
        },
        {
          name: "Proportional Meter Chart",
          image: "/chartImages/meter_chart.svg",
        },
      ],
    },
    PatternsIdentification: {
      name: "Identification of Patterns and Outliers",
      charts: [
        {
          name: "Box Plot",
          image: "/chartImages/box_plot.svg",
        },
        {
          name: "Scatter Plot",
          image: "/chartImages/scatter_plot.svg",
        },
        {
          name: "Heat Map",
          image: "/chartImages/heat_map.svg",
        },
      ],
    },
    Evaluation: {
      name: "Evaluation",
      charts: [
        {
          // set
          name: "KPI Dashboard",
          image: "/chartImages/kpi_dashboard.svg",
        },
        {
          name: "Balanced Scorecard",
          image: "/chartImages/balanced_scorecard.svg",
        },
      ],
    },
  };

  return (
    <div>
      <h1>Chart Types</h1>
      <div className="overview-list">
        {Object.keys(chartTypes).map((key) => {
          return (
            <div key={key}>
              <h2>{chartTypes[key].name}</h2>
              <div className="overview-container">
                {chartTypes[key].charts.map(
                  (chartType: ChartType, index: number) => {
                    return <ChartCard key={index} chartType={chartType} />;
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;

const ChartCard = ({ chartType }: { chartType: ChartType }) => {
  return (
    <div className="overview-card">
      <Link to={`/charts/${chartType.name.toLowerCase().replace(/ /g, "-")}`}>
        <p>{chartType.name}</p>
        <img
          className="overview-image"
          src={chartType.image}
          alt={chartType.name}
        />
      </Link>
    </div>
  );
};
