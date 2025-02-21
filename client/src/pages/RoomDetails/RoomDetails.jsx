import React from "react";
import Nav from "../../components/Nav";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/old/Sidebar";

const RoomDetails = () => {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <main className="flex flex-col items-center mt-20">
        <Sidebar></Sidebar>
        <section className="w-[60%] mt-10">
          <h3 className="font-semibold text-2xl">Room Details</h3>
          <p className="text-center p-2 my-4 font-semibold text-xl">
            Monday 21st February 2025
          </p>
          <div className="border-2 border-[#dbdbdb] p-5 mt-7">
            <div className="flex gap-1">
              <p>Building:</p>
              <p>Building 1</p>
            </div>
            <div className="flex gap-1">
              <p>Floor:</p>
              <p>1st</p>
            </div>
            <div className="flex gap-1">
              <p>Room number:</p>
              <p>201</p>
            </div>

            <div className="flex items-center gap-1">
              <p>Status:</p>
              <p className="font-bold bg-green-500 text-white px-1 py-0.5 rounded-md">
                Vacant
              </p>
            </div>
            <div className="flex gap-1">
              <p>Checkout Time:</p>
              <p>--:--</p>
            </div>

            <div className="mt-4">
              <Button backgroundColor="bg-red-500">Use Now</Button>
              <Button
                backgroundColor="bg-gray-500"
                additionalClassName="ml-1"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RoomDetails;
