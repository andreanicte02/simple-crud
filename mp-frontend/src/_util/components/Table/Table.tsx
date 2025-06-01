import "./table.style.css";
import {type column as Column} from "./column";

type CustomTableProps<T extends object> = {
    columns: ReadonlyArray<Column<T>>;
    data: T[];
    isLoading: boolean;
    className?: string;
};

export const Table = <T extends object>({
                                                   columns,
                                                   data,
                                                   isLoading,
                                                   className = ""
                                               }: CustomTableProps<T>) => {
    return (
        <div className={`project-table-container ${className}`}>
            {isLoading && <div className="pt-loader">Cargando...</div>}
            {!isLoading && (
                <table className="project-table">
                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.id)}
                                style={column.thColumnStyle}
                                className="pt-header-cell"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr key={index} className="pt-row">
                                {columns.map((column) => {
                                    const cellContent =
                                        column.dataField !== undefined
                                            ? column.format
                                                ? column.format(row)
                                                : row[column.dataField] !== null &&
                                                row[column.dataField] !== undefined
                                                    ? String(row[column.dataField])
                                                    : ""
                                            : column.format
                                                ? column.format(row)
                                                : "";

                                    return (
                                        <td key={String(column.id)} className="pt-cell">
                                            {cellContent}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="pt-no-data">
                                No hay datos disponibles
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
};