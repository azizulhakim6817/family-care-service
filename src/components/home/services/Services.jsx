import { getServices } from "@/actions/server/services";
import Image from "next/image";
import Link from "next/link";

const Services = async () => {
  const categories = await getServices();

  return (
    <section className="py-16 md:px-6  rounded-xl">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Our Services
      </h2>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4  rounded-xl">
        {categories?.map((cat) => (
          <div
            key={cat?._id}
            className=" rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            <div className="overflow-hidden h-60 rounded-xl">
              <Image
                src={cat?.image}
                alt={cat?.name}
                width={400}
                height={200}
                className="object-cover group-hover:scale-110 transition duration-300"
                unoptimized
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-semibold">{cat.name}</h3>

              <p className=" text-sm my-1">{cat.description}</p>
              <div className="flex gap-4 my-1">
                <p className=" text-sm ">
                  <span className="font-medium">Hourly : </span>
                  {cat.pricing.hourly}
                </p>
                <p className=" text-sm">
                  <span className="font-medium">Daily :</span>{" "}
                  {cat.pricing.daily}
                </p>
              </div>

              {/* Button */}
              <Link
                href={`/service/${cat?._id}`}
                className="inline-block text-blue-600 font-semibold hover:underline"
              >
                Details Service →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
