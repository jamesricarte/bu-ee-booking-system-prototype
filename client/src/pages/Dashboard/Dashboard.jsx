import React from "react";
import Nav from "../../components/Nav";
import Button from "../../components/Button";
import Sidebar from "../../components/old/Sidebar";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <main className="flex flex-col items-center mt-20">
        <Sidebar></Sidebar>
        <section className="w-[60%] mt-10">
          <h3 className="font-semibold text-2xl">Bookings</h3>
          <p className="text-center p-2 my-4 font-semibold text-xl">
            Monday 21st February 2025
          </p>
          <select
            className="border-2 border-gray-300 p-1 rounded-sm"
            name=""
            id=""
          >
            <option value="">Building 1</option>
            <option value="">Building 2</option>
            <option value="">Building 3</option>
          </select>
          <select
            className="border-2 border-gray-300 p-1 rounded-sm ml-2"
            name=""
            id=""
          >
            <option value="">Floor 1</option>
            <option value="">Floor 2</option>
          </select>

          <table className="w-full mt-5 border-collapse table-fixed">
            <thead>
              <tr className="font-semibold text-sm">
                <td>Room Number</td>
                <td>Status</td>
                <td>Checkout Time</td>
                <td>Use</td>
              </tr>
            </thead>
            <tbody>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>201</td>
                <td className="bg-green-500 text-white">Vacant</td>
                <td>--:--</td>
                <td>
                  <Button backgroundColor="bg-red-500">Use Now</Button>
                </td>
              </tr>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>202</td>
                <td className="bg-red-500 text-white">
                  <p>Occupied</p>
                  <p className="text-xs">R. Bruno</p>
                </td>
                <td>11:00</td>
                <td></td>
              </tr>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>203</td>
                <td className="bg-green-500 text-white">Vacant</td>
                <td>--:--</td>
                <td>
                  <Button backgroundColor="bg-red-500">Use Now</Button>
                </td>
              </tr>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>203</td>
                <td className="bg-green-500 text-white">Vacant</td>
                <td>--:--</td>
                <td>
                  <Button backgroundColor="bg-red-500">Use Now</Button>
                </td>
              </tr>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>203</td>
                <td className="bg-green-500 text-white">Vacant</td>
                <td>--:--</td>
                <td>
                  <Button backgroundColor="bg-red-500">Use Now</Button>
                </td>
              </tr>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>202</td>
                <td className="bg-red-500 text-white">
                  <p>Occupied</p>
                  <p className="text-xs">R. Bruno</p>
                </td>
                <td>11:00</td>
                <td></td>
              </tr>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>203</td>
                <td className="bg-green-500 text-white">Vacant</td>
                <td>--:--</td>
                <td>
                  <Button backgroundColor="bg-red-500">Use Now</Button>
                </td>
              </tr>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>203</td>
                <td className="bg-green-500 text-white">Vacant</td>
                <td>--:--</td>
                <td>
                  <Button backgroundColor="bg-red-500">Use Now</Button>
                </td>
              </tr>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>203</td>
                <td className="bg-green-500 text-white">Vacant</td>
                <td>--:--</td>
                <td>
                  <Button backgroundColor="bg-red-500">Use Now</Button>
                </td>
              </tr>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>203</td>
                <td className="bg-green-500 text-white">Vacant</td>
                <td>--:--</td>
                <td>
                  <Button backgroundColor="bg-red-500">Use Now</Button>
                </td>
              </tr>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>203</td>
                <td className="bg-green-500 text-white">Vacant</td>
                <td>--:--</td>
                <td>
                  <Button backgroundColor="bg-red-500">Use Now</Button>
                </td>
              </tr>
              <tr
                className="hover:bg-gray-50"
                onClick={() => navigate("/bookings/room/")}
              >
                <td>203</td>
                <td className="bg-green-500 text-white">Vacant</td>
                <td>--:--</td>
                <td>
                  <Button backgroundColor="bg-red-500">Use Now</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr className="my-10 border border-gray-200 w-[60%]" />
      </main>
    </>
  );
};

export default Dashboard;
