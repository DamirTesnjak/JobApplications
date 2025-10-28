import { ICandidateSchema } from "../../../utils/dbConfig/models/candidateModel";
import { getFile } from "../../../utils/getFile/getFile";

export interface ICandidatesTableDataRowProps {
  original: {
    id: ICandidateSchema['id'];
    name: string;
    surname: string;
    contact: ICandidateSchema['contact'];
    status: ICandidateSchema['status'];
    profilePicture: ICandidateSchema['profilePicture'];
    curriculumVitae: ICandidateSchema['curriculumVitae'];
  };
}

export const candidatesColumnDef = (
  row: ICandidatesTableDataRowProps | null,
  translation: ReturnType<typeof useTranslations<string>>
): {
  [x: string]: {
    title: string;
    size: number;
    cell?: any;
    cellImage?: any;
    cellButton?: any;
    cellIcon?: any;
    cellRowButton?: any;
    cellLinkButton?: any;
    enableColumnActions?: boolean;
    enableColumnFilter?: boolean;
    enableColumnDragging?: boolean;
    enableSorting?: boolean;
  };
} => {
  return {
    profilePicture: {
      title: '',
      size: 50,
      cellImage: row ? {
        src: getFile({
          name: row.original.profilePicture.file.name,
          data: row.original.profilePicture.file.data,
          contentType: row.original.profilePicture.file.contentType,
        }),
        alt: "Profile image",
        width: "40",
        height: "40",
      } : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    name: {
      title: translation("name"),
      size: 100,
      cell: `${row?.original.name}
            ${row?.original.surname}`,
      enableColumnActions: false,
      enableColumnDragging: false,
    },
    curriculumVitae: {
      title: 'CV',
      size: 100,
      cellButton: row ? {
        className: "textButton",
        text: "CV",
        iconName: "cloudDownloadIcon",
        type: "button",
        onClick: getFile({
          name: row.original.curriculumVitae.file.name,
          data: row.original.curriculumVitae.file.data,
          contentType: row.original.curriculumVitae.file.contentType,
        })
      } : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    phoneNumber: {
      title: translation("phoneNumber") as unknown as string,
      size: 150,
      cell: row?.original.contact.phoneNumber,
      enableColumnActions: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    linkedIn: {
      title: 'LinkedIn',
      size: 100,
      cellLinkButton: row ?
        {
          href: row.original.contact.linkedIn,
          target: "_blank",
          className: "textButton",
          type: "button",
          iconName: "linkedinIcon"
        } : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    archived: {
      title: translation("archived"),
      size: 100,
      cellIcon: row?.original.status.fired ? { fontIcon: "circleIcon", color: "blue" } : { fontIcon: "circleIcon", color: "lightgray" },
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    hired: {
      title: translation("hired"),
      size: 100,
      cellIcon: row?.original.status.fired ? { fontIcon: "circleIcon", color: "green" } : { fontIcon: "circleIcon", color: "lightgray" },
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    rejected: {
      title: translation("rejected"),
      size: 100,
      cellIcon: row?.original.status.fired ? { fontIcon: "circleIcon", color: "orange" } : { fontIcon: "circleIcon", color: "lightgray" },
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    fired: {
      title: translation("fired"),
      size: 100,
      cellIcon: row?.original.status.fired ? { fontIcon: "circleIcon", color: "red" } : { fontIcon: "circleIcon", color: "lightgray" },
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    button1: {
      title: '',
      size: 100,
      cellRowButton: row ?
        {
          clientId: row.original.id,
          name: "emailTemplateType",
          text: translation("archive"),
          value: "archive",
          iconName: "archive",
        } : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    button2: {
      title: '',
      size: 100,
      cellRowButton: row ?
        {
          clientId: row.original.id,
          name: "emailTemplateType",
          text: translation("hire"),
          value: "hire",
          iconName: "hire",
        } : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    button3: {
      title: '',
      size: 100,
      cellRowButton: row ?
        {
          clientId: row.original.id,
          name: "emailTemplateType",
          text: translation("reject"),
          value: "reject",
          iconName: "reject",
        } : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    button4: {
      title: '',
      size: 100,
      cellRowButton: row ?
        {
          clientId: row.original.id,
          name: "emailTemplateType",
          text: translation("fire"),
          value: "fire",
          iconName: "fire",
        } : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    button5: {
      title: translation("profileLink"),
      size: 150,
      cellLinkButton: row ?
        {
          href: `/candidateProfile/${row.original.id}`,
          className: "textButton",
          type: "button",
          iconName: "launchIcon"
        } : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
  };
};
