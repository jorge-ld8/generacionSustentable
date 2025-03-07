import { localidades } from "../lib/constants";
import ChartNav from "./ChartNav";

export default function Zonasnav() {
  return <ChartNav items={localidades} basePath="/charts/zone" />;
}