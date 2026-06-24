import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { prisma } from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertDateTimeToMDY = (dateString: string): string => {
  const date = new Date(dateString);
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString().slice(-2);
  return `${month}/${day}/${year}`;
};

export const convertToCash = (amount: string): string => {
  const cleanAmount = amount.replace(/\D/g, "");
  const numAmount = parseInt(cleanAmount, 10);
  if (isNaN(numAmount)) {
    return "Invalid input";
  }
  return `$${numAmount.toLocaleString("en-US")}`;
};

export const fetchRandomProperty = async (regionId?: string) => {
  let whereClause = {};

  if (regionId && regionId !== "all") {
    whereClause = { regionId };
  }

  const totalCount = await prisma.property.count({ where: whereClause });

  if (totalCount === 0) {
    return null;
  }

  const randomSkip = Math.floor(Math.random() * totalCount);

  return await prisma.property.findFirst({
    where: whereClause,
    skip: randomSkip,
  });
};
