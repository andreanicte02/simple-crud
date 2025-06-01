export interface column<T> {
    id: string;
    dataField?: keyof T;
    label: string;
    thColumnStyle?: React.CSSProperties;
    format?: (row: T) => React.ReactNode;
}