import { Title } from '@mui/icons-material';
import { createContext, useState  } from 'react';

interface TitleContextValue {
    title: string | null;
    setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  }


export const TitleContext = createContext<TitleContextValue | undefined>(undefined);

