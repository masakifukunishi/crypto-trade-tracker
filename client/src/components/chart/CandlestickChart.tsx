import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface CandlestickChartProps {
  ohlc: {
    x: number;
    y: number[];
  }[];
  trades: {
    x: number;
    y: number;
    type: string;
  }[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ ohlc, trades }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const options = {
      series: [
        {
          data: ohlc,
        },
      ],
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#54f542",
            downward: "#EF403C",
          },
          wick: {
            useFillColor: true,
          },
        },
      },
      chart: {
        id: "candles",
        type: "candlestick",
        height: 420,
        foreColor: "#F9FAFB",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          enabled: true,
        },
        labels: {
          minWidth: 40,
          maxWidth: 40,
          style: {
            fontSize: "14px",
          },
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
          theme: false,
        },
        labels: {
          minWidth: 48,
          maxWidth: 48,
          formatter: (val: number) => {
            if (val % 1 !== 0) {
              return val.toFixed(1);
            } else {
              return val.toString();
            }
          },
          style: {
            fontSize: "14px",
          },
        },
      },
      annotations: {
        points: trades.map((trade) => {
          return {
            x: trade.x,
            y: trade.y,
            marker: {
              size: 6,
              radius: 2,
            },
            label: {
              text: trade.type,
              style: {
                color: "#000",
                fontSize: "18px",
              },
            },
          };
        }),
      },
    };
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [ohlc, trades]);
  return <div ref={chartRef}></div>;
};
export default CandlestickChart;
