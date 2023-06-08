import { HistogramChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import "@carbon/styles/css/styles.css";
import { ScaleTypes } from '@carbon/charts/interfaces';
import { useLoaderData } from 'react-router-dom';
import { histogramLoader} from '../loaders';
import { LoaderData } from '../types';

interface IDictionary {
  [key: number]: number;
}

const dictionary1: IDictionary = {};
const dictionary2: IDictionary = {};


const options1 = {
  "title": "Histogram for Children with Partial Dose (linear)",
  "axes": {
    "bottom": {
      "title": "Age",
      "mapsTo": "age",
      "limitDomainToBins": true
    },
    "left": {
      "title": "No. of people (per hundred people)",
      "scaleType": ScaleTypes.LINEAR,
      "stacked": true,
      "binned": true
    }
  },
  "height": "400px"
};

const options2 = {
  "title": "Histogram for Children with Full Dose (linear)",
  "axes": {
    "bottom": {
      "title": "Age",
      "mapsTo": "age",
      "limitDomainToBins": true
    },
    "left": {
      "title": "No. of people (per hundred people)",
      "scaleType": ScaleTypes.LINEAR,
      "stacked": true,
      "binned": true
    }
  },
  "height": "400px"
};

function HistogramPage() {
  const allLoaderData = useLoaderData() as LoaderData<typeof histogramLoader>;
  const loaderData1 = allLoaderData[0];
  let data1: any[] = [];
  loaderData1.forEach((array: any) => {
    let data_list = array;
    for (var index in data_list) {
      let value = parseInt(data_list[index]["value"]);
      let age = parseInt(data_list[index]["age"]);
      if (value == 0) {
      }
      else {
        if (age in dictionary1){
          dictionary1[age] = dictionary1[age] + value;
        }
        else{
          dictionary1[age] = value;
        }
      }
    }
  })
  for (let key in dictionary1) {
    let value = dictionary1[key] / 100;
    for (let i = 0; i < value; i++) {
      data1.push({
        group: key,
        age: parseInt(key)
      });
    }
    // Use `key` and `value`
  }

  const loaderData2 = allLoaderData[1];
  console.log('chartData:', loaderData2);
  let data2: any[] = [];
  loaderData2.forEach((array: any) => {
    let data_list = array;
    for (var index in data_list) {
      let value = parseInt(data_list[index]["value"]);
      let age = parseInt(data_list[index]["age"]);
      if (value == 0) {
      }
      else {
        if (age in dictionary2) {
          dictionary2[age] = dictionary2[age] + value;
        }
        else {
          dictionary2[age] = value;
        }
      }
    }
  })
  for (let key in dictionary2) {
    let value = dictionary2[key] / 100;
    for (let i = 0; i < value; i++) {
      data2.push({
        group: key,
        age: parseInt(key)
      });
    }
    // Use `key` and `value`
  }

  console.log("realData1: ", data1);
  console.log("realData2: ", data2);
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h1>Histogram Chart 1</h1>
      <HistogramChart data={data1} options={options1} />
      <h1>HistogramChart 2</h1>
      <HistogramChart data={data2} options={options2} />
    </div>
  );
}
export default HistogramPage;

// function HistogramPage() {
//   const allLoaderData = useLoaderData() as LoaderData<typeof histogramLoader>;
//   const loaderData1 = allLoaderData[0];
//   console.log('chartData:', loaderData1);
//   let data1: any[] = [];
//   loaderData1.forEach((array: any) => {
//     let data_list = array;
//     for (var index in data_list) {
//       let value = parseInt(data_list[index]["value"]);
//       console.log("Value: ", value);
//       if (value == 0) {
//       }
//       else {
//         for (let i = 0; i < value; i++) {
//           data1.push(data_list[index]);
//         }
//       }
//     }
//     // if (item["value"] == 0){
//     //   console.log("Empty");
//     // }
//     // else{
//     //   for (let i = item["value"]; i < 3; i++) {
//     //     data.push(...item);
//     //   }
//     // }

//   })
//   console.log("realData: ", data1)

//   const loaderData2 = allLoaderData[1];
//   console.log('chartData:', loaderData2);
//   let data2: any[] = [];
//   loaderData2.forEach((array: any) => {
//     let data_list = array;
//     for (var index in data_list) {
//       let value = parseInt(data_list[index]["value"]);
//       console.log("Value: ", value);
//       if (value == 0) {
//       }
//       else {
//         for (let i = 0; i < value; i++) {
//           data2.push(data_list[index]);
//         }
//       }
//     }
//     // if (item["value"] == 0){
//     //   console.log("Empty");
//     // }
//     // else{
//     //   for (let i = item["value"]; i < 3; i++) {
//     //     data.push(...item);
//     //   }
//     // }

//   })
//   console.log("realData: ", data2)

//   const loaderData3 = allLoaderData[2];
//   console.log('chartData:', loaderData3);
//   let data3: any[] = [];
//   loaderData3.forEach((array: any) => {
//     let data_list = array;
//     for (var index in data_list) {
//       let value = parseInt(data_list[index]["value"]);
//       console.log("Value: ", value);
//       if (value == 0) {
//       }
//       else {
//         for (let i = 0; i < value; i++) {
//           data3.push(data_list[index]);
//         }
//       }
//     }
//     // if (item["value"] == 0){
//     //   console.log("Empty");
//     // }
//     // else{
//     //   for (let i = item["value"]; i < 3; i++) {
//     //     data.push(...item);
//     //   }
//     // }

//   })
//   console.log("realData: ", data3)

//   const loaderData4 = allLoaderData[3];
//   console.log('chartData:', loaderData4);
//   let data4: any[] = [];
//   loaderData4.forEach((array: any) => {
//     let data_list = array;
//     for (var index in data_list) {
//       let value = parseInt(data_list[index]["value"]);
//       console.log("Value: ", value);
//       if (value == 0) {
//       }
//       else {
//         for (let i = 0; i < value; i++) {
//           data4.push(data_list[index]);
//         }
//       }
//     }
//     // if (item["value"] == 0){
//     //   console.log("Empty");
//     // }
//     // else{
//     //   for (let i = item["value"]; i < 3; i++) {
//     //     data.push(...item);
//     //   }
//     // }

//   })
//   console.log("realData: ", data4)

//   return (
//     <div style={{ width: '100%', height: '400px' }}>
//       <h1>Histogram Chart for Partial Dose</h1>
//       <HistogramChart data={data1} options={options} />
//       <h1>Histogram Chart for Full Dose</h1>
//       <HistogramChart data={data2} options={options} />
//       <h1>Histogram Chart for Booster Dose 1</h1>
//       <HistogramChart data={data3} options={options} />
//       <h1>Histogram Chart for Booster Dose 2</h1>
//       <HistogramChart data={data4} options={options} />
//     </div>
//   );
// }