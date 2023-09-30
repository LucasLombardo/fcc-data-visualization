import { chunkArray } from "../../../shared/utils";

const Table = ({ data, chunkLength }) => {
    console.log({data, chunkLength})
  const chunks = chunkArray(data, chunkLength);

  return (
    <div>
      {chunks.map((chunk) => (
        <table key={`table-${chunk[0][0]}`}>
          <tbody>
            <tr>
              <th>Year</th>
              {chunk.map(([date]) => (
                <td key={date}>
                  <div>{date}</div>
                </td>
              ))}
              .
            </tr>
            <tr>
              <th>GDP USD Billions</th>
              {chunk.map(([date, gdp]) => (
                <td key={date}>
                  <div>{gdp}</div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default Table;
