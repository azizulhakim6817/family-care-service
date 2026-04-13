import { getBooking } from "@/actions/server/bookings";
import GetBooking from "@/components/booking/GetBooking";
import React from "react";

const page = async () => {
  const bookings = await getBooking();
  //console.log(bookings);
  return (
    <div>
      <GetBooking bookings={bookings} />
    </div>
  );
};

export default page;
