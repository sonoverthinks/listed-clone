"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import CarouselImage from "./Carousel";
import Info from "./Info";
import Guess from "./Guess";
import Result from "./Result";
import { convertDateTimeToMDY } from "@/lib/utils";
import LatestGuess from "./LatestGuess";
import { Photo, Property } from "@/type/types";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type GameProps = {
  initialProperty: Property | null;
  regionId: string;
};

const Game = ({ initialProperty, regionId }: GameProps) => {
  const [numGuess, setNumGuess] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [userGuesses, setUserGuesses] = useState<string[]>([]);
  const [property, setProperty] = useState(initialProperty);
  const [images, setImages] = useState<Photo[] | null>(null);

  const soldOn = property?.lastSoldDate
    ? convertDateTimeToMDY(property.lastSoldDate.toString())
    : "--/--/----";

  // Build the complete Redfin URL cleanly
  const getFullURL = (urlPath: string | null | undefined): string => {
    if (!urlPath) return "https://www.redfin.com";
    if (urlPath.startsWith("http")) return urlPath;
    return `https://www.redfin.com${urlPath}`;
  };

  const propertyURL = getFullURL(property?.url);

  useEffect(() => {
    setImages(null); // Clear out the old photos to trigger loading state
    const fetchPropertyPhotos = async (url: string) => {
      const rapidApiKey = process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY;

      if (!rapidApiKey) {
        throw new Error(
          "NEXT_PUBLIC_X_RAPIDAPI_KEY is not defined in environment variables"
        );
      }
      const res = await fetch(
        `https://redfin-com-data.p.rapidapi.com/property/detail-photos?url=${encodeURIComponent(url)}`,
        {
          headers: {
            "x-rapidapi-key": rapidApiKey,
            "x-rapidapi-host": "redfin-com-data.p.rapidapi.com",
          },
        }
      );
      const data = await res.json();
      const list: Photo[] = data.data;
      setImages(list);
    };

    fetchPropertyPhotos(propertyURL);
  }, [property, propertyURL]);

  const increaseNumGuess = async () => {
    setNumGuess((prev) => prev + 1);
  };

  const updateUserGuess = (newGuess: string) => {
    setUserGuesses((prevGuesses) => [...prevGuesses, newGuess]);
    const guess = parseInt(newGuess);
    const lowerBound = parseInt(property?.price as string) * 0.95;
    const upperBound = parseInt(property?.price as string) * 1.05;
    if (guess >= lowerBound && guess <= upperBound) {
      setIsWon(true);
    }
  };

  async function fetchRandomProperty(regionId: string) {
    const res = await fetch(
      `/api/property?query=${encodeURIComponent(regionId)}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch random property");
    }
    const data = await res.json();
    setProperty(data);
  }

  const resetGame = async () => {
    setNumGuess(0);
    setIsWon(false);
    setUserGuesses([]);
    fetchRandomProperty(regionId);
  };

  return (
    <div className="max-w-xl mx-auto p-2 space-y-1">
      <Header />
      {images ? (
        <CarouselImage
          soldOn={soldOn}
          numGuess={numGuess}
          images={images}
          isWon={isWon}
          propertyURL={property?.url as string}
        />
      ) : (
        <Skeleton className="w-full h-[330px] rounded-md flex items-center justify-center border border-text-clay/10">
          <Loader2 className="w-16 h-16 text-horizon animate-spin" />
        </Skeleton>
      )}
      <Info property={property} numGuess={numGuess} isWon={isWon} />
      <LatestGuess
        correctPrice={property?.price as string}
        guesses={userGuesses}
        numGuess={numGuess}
      />
      {!isWon ? (
        <Guess
          increaseNumGuess={increaseNumGuess}
          updateUserGuess={updateUserGuess}
        />
      ) : (
        <Result
          correctPrice={property?.price as string}
          numGuess={numGuess}
          resetGame={resetGame}
        />
      )}
    </div>
  );
};

export default Game;
