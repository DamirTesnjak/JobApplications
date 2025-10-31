import { IEmailTemplateSchema } from "../../../../utils/dbConfig/models/emailTemplateModel";

export interface IEmailTemplatesTableDataRowProps {
  original: {
    _id: IEmailTemplateSchema['id'];
    emailType: string;
  };
}

export const emailTemplatesColumnDef = (
  row: IEmailTemplatesTableDataRowProps | null,
  translation: (key: string) => string

): {
  [x: string]: {
    title: string;
    size: number;
    cell?: any;
    cellLinkButton?: any;
    enableColumnActions?: boolean;
    enableColumnFilter?: boolean;
    enableColumnDragging?: boolean;
    enableSorting?: boolean;
  };
} => {
  return {
    emailType: {
      title: translation("emailType") as unknown as string,
      size: 100,
      cell: `${row?.original.emailType}`,
      enableColumnActions: false,
      enableColumnDragging: false,
    },
    button1: {
      title: '',
      size: 150,
      cellLinkButton: row ?
        {
          href: `/settings/emailType/${row.original._id}`,
          className: "textButton",
          type: "button",
          iconName: "EditIcon"
        } : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    button2: {
      title: '',
      size: 150,
      cell: row ? {
        id: row.original._id,
        text: "Delete template",
        className: "textButton",
        type: "submit"
      } : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
  };
};
