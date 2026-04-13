import { getServices } from "@/actions/server/services";
import BannerSwiper from "@/components/home/banner/BannerSwiper";

const Home = async () => {
  const slides = await getServices();

  return (
    <div>
      <BannerSwiper slides={slides} />
    </div>
  );
};

export default Home;
