
export const AUTH_API_PATHS = {
    POST_LOGIN: "/auth/login",
    GET_PROFILE: "/auth/",

  };

  export const COMMENT_API_PATHS = {
    GET_ALL_COMMENTS: "/comments",
    GET_COMMENT: "/comments/",
    GET_COMMENTS_FOR_EVENT:"/comments/event/",
    ADD_COMMENT:"/comments",
    EDIT_COMMENT:"/comments/",
    DELETE_COMMENT:"/comments/"
  };


export const EVENT_API_PATHS = {
    GET_EVENTS: "/events",
    GET_ONE:"/events/",
    GET_EVENTS_FOR_ORG:"/events/org/",
    CREATE_EVENT: "/events",
    EDIT_EVENT:"/events/"

  };

  export const ORG_API_PATHS = {
    GET_ORGS: "/org",
    GET_ONE:"/org/",
    CREATE_org: "/org",
    EDIT_EVENT:"/org/"
  };


