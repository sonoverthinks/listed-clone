export interface Photo {
  dataSourceId: number;
  displayLevel: number;
  fileName: string;
  height: number;
  photoId: number;
  photoType: string;
  photoUrls: {
    fullScreenPhotoUrl: string;
    lightboxListUrl: string;
    nonFullScreenPhotoUrl: string;
    nonFullScreenPhotoUrlCompressed: string;
  };
  subdirectory: string;
  thumbnailData: {
    thumbnailUrl: string;
  };
  width: number;
}

export interface Property {
  id: string;
  url: string | null;
  beds: number | null;
  baths: number | null;
  yearBuilt: number | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  hoaDues: string | null;
  regionId: string | null;
  sqrft: string | null;
  lotSize: string | null;
  propertyType: number | null;
  price: string | null;
  createdAt: Date;
  updatedAt: Date;
  listDate: Date | null;
  lastSoldDate: Date | null;
}
