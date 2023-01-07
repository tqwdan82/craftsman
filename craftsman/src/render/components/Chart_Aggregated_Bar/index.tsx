import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const Chart_Aggregated_Bar = (props?: any) => {
  const aggregateData = (datas: any[], aggregateBy: string) => {
    let aggregatedData: any = {};
    datas.forEach((data) => {
      if (aggregatedData[data[aggregateBy]] === undefined) {
        aggregatedData[data[aggregateBy]] = 1;
      } else {
        aggregatedData[data[aggregateBy]] += 1;
      }
    });

    let returnArray: any[] = [];
    Object.keys(aggregatedData).forEach((dataKey) => {
      returnArray.push({
        name: dataKey,
        value: aggregatedData[dataKey],
      });
    });

    return returnArray;
  };

  const fetchFunction = (url: string, name: string) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const aggregatedData = aggregateData(data, props.aggregateBy);

        const updatedState = { ...props.context.state };
        updatedState[name] = aggregatedData;
        props.context.setState(updatedState);
      });
  };

  if (
    props.context.state[props.name] === undefined &&
    props.dataURL !== undefined
  ) {
    fetchFunction(props.dataURL, props.name);
  } else if (
    props.context.state[props.name] === undefined &&
    props.data !== undefined
  ) {
    const aggregatedData = aggregateData(props.data, props.aggregateBy);
    const updatedState = { ...props.context.state };
    updatedState[props.name] = aggregatedData;
    props.context.setState(updatedState);
  }

  const renderLineChart = (
    <BarChart
      width={400}
      height={400}
      data={props.context.state[props.name] || []}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={"name"} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={"value"} fill={props.color} />
    </BarChart>
  );

  return <>{renderLineChart}</>;
};
