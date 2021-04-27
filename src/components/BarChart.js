import { useD3 } from '../hooks/useD3';
import React, { useState } from 'react';
import * as d3 from 'd3';

function BarChart(props) {
	const height = 500;
	const width = 1000;
	const ref = useD3(
		(svg) => {
		const height = 500;
		const width = 1000;
		const margin = { top: 20, right: 30, bottom: 30, left: 40 };

		const x = d3
			.scaleBand()
			.domain(props.data.map((d) => d[props.xAxis]))
			.rangeRound([margin.left, width - margin.right])
			.padding(0.1);

		const y1 = d3
			.scaleLinear()
			.domain([0, d3.max(props.data, (d) => d[props.yAxis])])
			.rangeRound([height - margin.bottom, margin.top]);

		let xAxis = d3.axisBottom(x);
		svg.select('.x-axis')
				.attr("transform",`translate(0,${height - margin.bottom})`)
				.call(xAxis)

		let y1Axis = d3.axisLeft(y1)
		svg.select(".y-axis")
			.attr("transform",`translate(${margin.left}, 0)`)
			.call(y1Axis);

		svg
			.select(".plot-area")
			.attr("fill", "steelblue")
			.selectAll(".bar")
			.data(props.data)
			.join("rect")
			.attr("class", "bar")
			.attr("x", (d) => x(d[props.xAxis]))
			.attr("width", x.bandwidth())
			.attr("y", (d) => y1(d[props.yAxis]))
			.attr("height", (d) => y1(0) - y1(d[props.yAxis]));
		},
		[props.data.length]
	);
	return (
		<svg
			ref={ref}
			style={{
				height: 500,
				width: 1000,
				marginRight: "0px",
				marginLeft: "0px",
				backgroundColor:"white"
			}}
			className={props.classAdd}
		>
			<text transform={"rotate(-90)"} y={15} x={0 - (height/2)} style={{
				fill:"black",
				textAnchor:"middle",
				fontWeight:"bold"
			}}>Number of Tasks</text>
			<g className="plot-area" />
			<g className="x-axis" />
			<g className="y-axis" />
		</svg>
	);
}

export default BarChart;