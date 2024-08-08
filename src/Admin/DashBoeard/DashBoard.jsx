import { useEffect, useState } from "react";
import { FaUsersRectangle } from "react-icons/fa6";
import { TotalCoutomer, TotalProduct } from "./Details/Dash";
import { RiShoppingCartFill } from "react-icons/ri";
import { BiSolidSquareRounded } from "react-icons/bi";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoCloudDone } from "react-icons/io5";

import { MdOutlinePendingActions } from "react-icons/md";
const DashBoard = () => {
  const [coutomer, setCutermer] = useState({
    coutomer: "0",
    product: "0",
    order: "0",
    sales: "0",
  });
  const [track, setTrack] = useState({});

  useEffect(() => {
    async function abc() {
      const total = await TotalCoutomer();
      const product = await TotalProduct();

      const allOrders = total
        .map((e) => e.orders)
        .filter((e) => e !== undefined)
        .flatMap((orders) => Object.values(orders));

      const totalSales = allOrders.filter((e) => e.status === "outForDelivery");
      const pending = allOrders.filter((e) => e.status === "pending");
      const inTransist = allOrders.filter((e) => e.status === "inTransist");
      const delivers = allOrders.filter((e) => e.status === "delivers");
      const exchange = allOrders.filter((e) => e.status === "exchange");

      const Newbalance = allOrders.filter((e) => e.brand === "New-balance");
      const Reebok = allOrders.filter((e) => e.brand === "Reebok");
      const Nike = allOrders.filter((e) => e.brand === "Nike");
      const Adidas = allOrders.filter((e) => e.brand === "Adidas");
      const Puma = allOrders.filter((e) => e.brand === "Puma");

      console.log("jhh", delivers);

      const profit = totalSales.reduce((acc, e) => acc + e.qtyPrice, 0);
      const UpProfit =
        allOrders.reduce((acc, e) => acc + e.qtyPrice, 0) - profit;
      setTrack({
        outForDelivery: totalSales.length,
        pending: pending.length,
        inTransist: inTransist.length,
        delivers: delivers.length,
        exchange: exchange.length,

        Newbalance: Newbalance.reduce((acc, e) => acc + e.qty, 0),
        Reebok: Reebok.reduce((acc, e) => acc + e.qty, 0),
        Nike: Nike.reduce((acc, e) => acc + e.qty, 0),
        Adidas: Adidas.reduce((acc, e) => acc + e.qty, 0),
        Puma: Puma.reduce((acc, e) => acc + e.qty, 0),

        Newbalance1: Newbalance.reduce((acc, e) => acc + e.qtyPrice, 0),
        Reebok1: Reebok.reduce((acc, e) => acc + e.qtyPrice, 0),
        Nike1: Nike.reduce((acc, e) => acc + e.qtyPrice, 0),
        Adidas1: Adidas.reduce((acc, e) => acc + e.qtyPrice, 0),
        Puma1: Puma.reduce((acc, e) => acc + e.qtyPrice, 0),
      });

      setCutermer({
        ...coutomer,
        coutomer: total.length,
        product: product.length,
        order:
          Newbalance.reduce((acc, e) => acc + e.qty, 0) +
          Reebok.reduce((acc, e) => acc + e.qty, 0) +
          Nike.reduce((acc, e) => acc + e.qty, 0) +
          Adidas.reduce((acc, e) => acc + e.qty, 0) +
          Puma.reduce((acc, e) => acc + e.qty, 0),

        sales: totalSales.length,
        orders: allOrders,
        profit: profit,
        UpProfit: UpProfit,
      });
    }
    abc();
  }, []);

  const data = [
    { name: "pending", value: track.pending },
    { name: "inTransist", value: track.inTransist },
    { name: "delivers", value: track.delivers },
    { name: "outForDelivery", value: track.outForDelivery },
    { name: "exchange", value: track.exchange },
  ];
  const data1 = [
    {
      name: "Newbalance",
      TotelSale: track.Newbalance,
      TotelProfit: track.Newbalance1,
    },
    {
      name: "Reebok",
      TotelSale: track.Reebok,
      TotelProfit: track.Reebok1,
    },
    {
      name: "Nike",
      TotelSale: track.Nike,
      TotelProfit: track.Nike1,
    },
    {
      name: "Adidas",
      TotelSale: track.Adidas,
      TotelProfit: track.Adidas1,
    },
    {
      name: "Puma",
      TotelSale: track.Puma,
      TotelProfit: track.Puma1,
    },
  ];

  const COLORS = ["#424242", "#FDD835", "#FF6F00", "#388E3C", "#C62828"];

  const RADIAN = Math.PI / 180;
  // eslint-disable-next-line no-unused-vars
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-[100vh] bg-gray-200 p-4 md:p-10">
      <div className="ml-0 md:ml-[100px]">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          <div className="w-full mt-10 grid grid-cols-2 place-content-center rounded-lg p-3 shadow-lg bg-white h-[100px]">
            <div className="flex justify-center">
              <FaUsersRectangle className="text-blue-500 text-6xl" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="font-bold">{coutomer.coutomer}+</div>
              <div>Total Customers</div>
            </div>
          </div>
          <div className="w-full mt-10 grid grid-cols-2 place-content-center rounded-lg p-3 shadow-lg bg-white h-[100px]">
            <div className="flex justify-center">
              <RiShoppingCartFill className="text-red-500 text-6xl" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="font-bold">{coutomer.product}+</div>
              <div>Total Products</div>
            </div>
          </div>
          <div className="w-full mt-10 grid grid-cols-2 place-content-center rounded-lg p-3 shadow-lg bg-white h-[100px]">
            <div className="flex justify-center">
              <MdOutlinePendingActions className="text-orange-500 text-6xl" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="font-bold">{coutomer.order}+</div>
              <div>Total Orders</div>
            </div>
          </div>
          <div className="w-full mt-10 grid grid-cols-2 place-content-center rounded-lg p-3 shadow-lg bg-white h-[100px]">
            <div className="flex justify-center">
              <IoCloudDone className="text-green-500 text-6xl" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="font-bold">{coutomer.sales}+</div>
              <div>Total Sales</div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-6 grid-cols-1 gap-4">
          <div className="md:col-span-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="h-[400px]">
              <div className="font-bold">Top Brand Selling</div>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={data1}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />

                  <Tooltip />
                  <Legend />
                  <Bar dataKey="TotelSale" stackId="a" fill="#8884d8" />
                  <Bar dataKey="TotelProfit" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-2 bg-white p-3 rounded-lg shadow-lg h-[450px]">
            <div className="flex gap-3 flex-wrap justify-center items-center">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center"
                  style={{ color: COLORS[index % COLORS.length] }}
                >
                  <span>
                    <BiSolidSquareRounded />
                  </span>{" "}
                  {item.name}
                </div>
              ))}
            </div>
            <div className="h-[100%] w-[100%]">
              <ResponsiveContainer width="100%" height="70%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 mt-10">
          <div className=" md:col-span-4 "></div>
          <div className="h-[100px] bg-white p-2 md:col-span-2 col-span-6 shadow-xl rounded-lg flex flex-col justify-center ">
            <span className="font-bold text-2xl ml-5 flex gap-3 p-1 justify-center items-center">
              <FaMoneyBillTrendUp /> Total Profit :
              <span className="text-green-600">{coutomer.profit}$</span>
            </span>
            <span className="font-bold text-2xl ml-5 flex gap-3 p-1 justify-center items-center">
              <FaMoneyBillTransfer />
              PendingProfit :
              <span className="text-red-600">{coutomer.UpProfit}$</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
