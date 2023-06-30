import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";

const ItineraryDetailsPDF = dynamic(() => import("@/components/parts/pdf"), {
  ssr: false,
});

const View = () => {
  const router = useRouter();

  const { itineraryId } = router.query;

  const { data: itinerary } = useSWR(`/itineraries/${itineraryId}`);

  return <ItineraryDetailsPDF {...itinerary} />;
};

export default View;
