import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getData());
  }, [events]);

  const getData = () => {
    const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];

    let data = genres.map((genre) => {
      const value = events.filter((event) =>
        event.summary.split(" ").includes(genre)
      ).length;

      return { name: genre, value };
    });

    for (let i = 0; i <= 4; i++) {
      let index;
      switch (data[i].name) {
        case "React":
          index = 0;
          break;
        case "JavaScript":
          index = 1;
          break;
        case "Node":
          index = 2;
          break;
        case "jQuery":
          index = 3;
          break;
        case "AngularJS":
          index = 4;
          break;
        default:
          break;
      }

      if (data[i].value === 0) {
        console.log(data[i].name + " doesn't have any values");
        // This line isn't working. It should remove an item from the 'data' array if it's 'value' is 0.
        // I think it's removing everything when the component first mounts, then it says the array is undefined when it mounts again
        // data.splice(index, 1);
      }
    }

    return data;
  };

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} - ${(percent * 100).toFixed(0)}%`
          }
        ></Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
