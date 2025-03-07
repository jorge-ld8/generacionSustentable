import { tipoComunidad } from "../lib/constants";
import ChartNav from "./ChartNav";

export default function Comunidadnav() {
  return <ChartNav items={tipoComunidad} basePath="/charts/comunidad" />;
}