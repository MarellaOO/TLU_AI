/** API response types for ERR Jupiter front page */

export interface PhotoType {
  type: number;
  w: number;
  h: number;
  url: string;
}

export interface Photo {
  id: number;
  photoTypes: Record<string, PhotoType>;
  photoUrlBase: string;
}

export interface FrontPageItem {
  id: number;
  heading: string;
  subHeading?: string;
  canonicalUrl: string;
  verticalPhotos: Photo[];
}

export interface FrontPageSection {
  header: string;
  headerUrl: string;
  highTimeline: boolean;
  manual?: { highTimeline: boolean; banner?: boolean };
  data: FrontPageItem[];
}

export interface Category {
  id: number;
  name: string;
  frontPage: FrontPageSection[];
}

export interface CategoryApiResponse {
  apiVersion: string;
  data: {
    category: Category;
  };
}
