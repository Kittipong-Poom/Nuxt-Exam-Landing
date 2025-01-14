

export interface Launch {
    id: string;
    name: string;
    date_utc: string;
    rocket: string;
    upcoming: boolean;
    crew: string[];
    links: {
      patch: {
        small: string | null;
        large: string | null;
      };
    };
    launchpad?: string; 
  } 