import React from "react";
import { convertDateTimeToMDY, convertToCash } from "@/lib/utils";
import { Property } from "@/type/types";

type InfoProps = {
  property: Property | null;
  numGuess: number;
  isWon: boolean;
};

const Info = ({ property, numGuess, isWon }: InfoProps) => {
  const current = isWon ? 100 : numGuess;
  return (
    <div className="grid grid-cols-2 gap-2 text-sm text-text-fadedJay">
      <div>
        <p
          className={`${
            current < 1 && "blur-sm"
          } text-base font-semibold text-text-clay`}
        >
          {current >= 1 ? `${property?.city}, ${property?.state}` : "xxxxx, xx"}
        </p>
        <p>Location</p>
      </div>
      <div>
        <p
          className={`${
            current < 2 && "blur-sm"
          } text-base font-semibold text-text-clay`}
        >
          {current >= 2
            ? property?.hoaDues
              ? `$${Number(property.hoaDues).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`
              : "-"
            : "xxxx"}
        </p>
        <p>HOA</p>
      </div>
      <div className="flex gap-3">
        <div>
          <p
            className={`${
              current < 3 && "blur-sm"
            } text-base font-semibold text-text-clay`}
          >
            {current >= 3 ? property?.beds ?? "-" : "x"}
          </p>
          <p>Beds</p>
        </div>
        <div>
          <p
            className={`${
              current < 3 && "blur-sm"
            } text-base font-semibold text-text-clay`}
          >
            {current >= 3 ? property?.baths ?? "-" : "x"}
          </p>
          <p>Baths</p>
        </div>
        <div>
          <p
            className={`${
              current < 4 && "blur-sm"
            } text-base font-semibold text-text-clay duration-200`}
          >
            {current >= 4 ? property?.yearBuilt ?? "-" : "x"}
          </p>
          <p>Built</p>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <div>
          <p
            className={`${
              current < 5 && "blur-sm"
            } text-base font-semibold text-text-clay`}
          >
            {current >= 5 ? property?.sqrft ?? "-" : "xxxx"}
          </p>
          <p>Sqrft</p>
        </div>
        <div>
          <p
            className={`${
              current < 6 && "blur-sm"
            } text-base font-semibold text-text-clay`}
          >
            {current >= 6 ? property?.lotSize ?? "-" : "xxxx"}
          </p>
          <p>Lot Size</p>
        </div>
      </div>
      {/* <div className="flex flex-row gap-3">
        <div>
          <p className="text-base font-semibold text-text-clay">3/29/1993</p>
          <p>Prev Sale</p>
        </div>
        <div>
          <p className="text-base font-semibold text-text-clay">$113,950</p>
          <p>Prev Price</p>
        </div>
      </div> */}
      {/* <div className="flex flex-row gap-3">
        <div>
          <p
            className={`${
              current < 7 && "blur-sm"
            } text-base font-semibold text-text-clay`}
          >
            {current >= 7
              ? convertDateTimeToMDY(property.listingAddedDate)
              : "xx/xx/xxxx"}
          </p>
          <p>List Date</p>
        </div>
        <div>
          <p
            className={`${
              current < 8 && "blur-sm"
            } text-base font-semibold text-text-clay`}
          >
            {current >= 8 ? convertToCash(property.price) : "xxxxxx"}
          </p>
          <p>List Price</p>
        </div>
      </div> */}
    </div>
  );
};

export default Info;
