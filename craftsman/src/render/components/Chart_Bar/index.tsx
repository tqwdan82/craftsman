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

export const Chart_Bar = (props?: any) => {
  const fetchFunction = (url: string, name: string) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const updatedState = { ...props.context.state };
        updatedState[name] = data;
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
    const updatedState = { ...props.context.state };
    updatedState[props.name] = props.data;
    props.context.setState(updatedState);
  }

  const renderLineChart = (
    <BarChart
      width={400}
      height={400}
      data={props.context.state[props.name] || []}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={props.xaxisKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      {props.barKeys.map((barKey: any) => (
        <Bar dataKey={barKey.key} fill={barKey.color} />
      ))}
    </BarChart>
  );

  return <>{renderLineChart}</>;
};
