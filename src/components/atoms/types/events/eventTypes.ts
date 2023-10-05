
type EventDate = Date | null;
export type Resource={
    id: string;
    users: string[];
  }
  
export type Event={

    id: string,
    start: EventDate,
    end: EventDate,
    title: string,
    resource: Resource
}

export type EventDetails={
  _id: string,
  start: EventDate,
    end: EventDate,
    title: string,
    orgId: string,
    users: string[]
}

