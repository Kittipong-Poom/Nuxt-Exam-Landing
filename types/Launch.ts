// กำหนด Type ของข้อมูลที่ได้รับจาก API
export interface Launch {
    id: string;
    name: string;
    date_utc: string;
    rocket: string;
    crew: string[];
    links: {
      patch: {
        small: string | null;
        large: string | null;
      };
    };
  } 