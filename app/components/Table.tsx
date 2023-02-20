import { Table as UITable } from "flowbite-react";
import React, { useEffect, useMemo, useState } from "react";
import Input from "./Input";

export type Row = React.ReactNode[];
interface IProps {
  head: (string | undefined)[];
  rows?: Row[];
  enumerated?: boolean;
  onClick?: (row: Row) => void;
  limitHeight?: boolean;
  filterFunction?: (search: string, row: Row) => boolean;
  filterPlaceholder?: string;
}

const preventEnter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
  ev.key === "Enter" && ev.preventDefault();
};

const Table: React.FC<IProps> = ({
  head,
  rows,
  enumerated,
  onClick,
  limitHeight,
  filterFunction,
  filterPlaceholder,
}) => {
  const memoHead = useMemo(() => head, [head]);
  const memoRows = useMemo(() => rows, [rows]);

  const [allRows, setAllRows] = useState(rows);
  useEffect(() => {
    setAllRows(memoRows);
  }, [memoRows, setAllRows]);

  const handleClickRow = (key: number) => () => {
    if (!allRows || !onClick) return;
    onClick(allRows[key]);
  };

  const handleFilter = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!filterFunction || !rows) return;
    const { value } = ev.target;
    setAllRows(rows.filter((row) => filterFunction(value, row)));
  };

  return (
    <>
      {filterFunction && (
        <Input
          placeholder={filterPlaceholder || "Filtrar por..."}
          onChange={handleFilter}
          className="max-w-sm"
          onKeyDown={preventEnter}
        />
      )}
      <div
        className={`overflow-auto rounded-lg border${
          limitHeight ? " max-h-80" : ""
        }`}
      >
        <UITable hoverable>
          <UITable.Head>
            {enumerated && (
              <UITable.HeadCell className="w-12">#</UITable.HeadCell>
            )}
            {memoHead.map(
              (h) => h && <UITable.HeadCell key={h}>{h}</UITable.HeadCell>
            )}
          </UITable.Head>
          <UITable.Body className="divide-y">
            {allRows &&
              allRows.map((row, i) => (
                <UITable.Row
                  className="bg-white"
                  key={i}
                  onClick={onClick ? handleClickRow(i) : undefined}
                >
                  {enumerated && (
                    <UITable.Cell key={`${i}`} className="bg-gray-50">
                      {i + 1}
                    </UITable.Cell>
                  )}
                  {row.map(
                    (data, j) =>
                      data !== undefined && (
                        <UITable.Cell key={`${i}-${j}`}>{data}</UITable.Cell>
                      )
                  )}
                </UITable.Row>
              ))}
          </UITable.Body>
        </UITable>
      </div>
    </>
  );
};

export default Table;
