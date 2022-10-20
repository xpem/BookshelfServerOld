export type BookProps = {
  Key: string;
  Title: string;
  SubTitle: string | null;
  Authors: string;
  Volume: number | null;
  Pages: number | null;
  Year: number | null;
  Inactive: boolean | null;
  Rating: { Rate: number | null; Comment: string };
  Situation: number;
  Genre: string | null;
  Isbn: string | null;
  Cover: string | null;
  GoogleId: string | null;
  Uid: string;
  LastUpdate: string | null;
};