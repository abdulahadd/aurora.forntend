
type EventDate = Date | null;
export type Resource={
    id: string;
    users: string[];
  }
  
export type Event={

    start: EventDate,
    end: EventDate,
    title: string,
    resource: Resource
}

