import { Image } from "expo-image";

// Carro do ícone do app (assets/unicarona.icon), em branco.
const carImage = require("../../assets/brand/unicarona-car-white.png");
const aspectRatio = 480 / 464;

interface BrandCarProps {
  size: number;
}

export function BrandCar({ size }: BrandCarProps) {
  return <Image source={carImage} style={{ aspectRatio, width: size }} contentFit="contain" />;
}
