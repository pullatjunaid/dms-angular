export interface EntryModel {
  id: any;
  ref_id: string;
  from_date: string;
  to_date: string;
  from_whom: {
    id: string;
    title: string;
  };
  to_whom: {
    id: string;
    title: string;
  };
  subject: string;
  created_at: string;
}
