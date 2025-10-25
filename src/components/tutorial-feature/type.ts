export interface ITourSteps {
    [path: string]: Array<{
        id?: string;
        attachTo?: { element: string; on: string };
        text: string | string[];
    }>;
}