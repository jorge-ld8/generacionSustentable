import { actionTypes } from "../lib/constants";
import ChartNav from "./ChartNav";

export default function Typesnav() {
  return <ChartNav items={actionTypes} basePath="/charts/action" />;
}