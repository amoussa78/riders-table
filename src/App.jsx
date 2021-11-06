import React from "react";
import clsx from "clsx";
import {
  useTable,
  useBlockLayout,
  useGroupBy,
  useExpanded,
  useFilters,
  useGlobalFilter,
  useSortBy
} from "react-table";
import { useSticky } from "react-table-sticky";
import { useVirtual } from "react-virtual";

import makeData from "./makeData";

import { DefaultColumnFilter } from "./components/DefaultColumnFilter";
import { useGlobalStyles, useStyles } from "./styles";
import { useRtl } from "./hooks";

const ESTIMATED_CELL_HEIGHT = 30;

function Table() {
  const classes = useStyles();

  const parentRef = React.useRef();
  const data = React.useMemo(() => makeData(1000), []);
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 150,
      maxWidth: 400,

      Filter: DefaultColumnFilter
    }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        Footer: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            accessor: "lastName"
          }
        ]
      },
      {
        Header: "Info",
        Footer: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
            width: 50
          },
          {
            Header: "Visits",
            accessor: "visits",
            width: 60
          },
          {
            Header: "Status",
            accessor: "status"
          },
          {
            Header: "Likes",
            accessor: () => Math.random(),
            width: 200
          },
          {
            Header: "Salary",
            accessor: () => 100000,
            width: 200
          }
        ]
      },
      {
        Header: " ",
        sticky: "right",
        columns: [
          {
            Header: "Profile Progress",
            accessor: "progress"
          }
        ]
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
    state
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useBlockLayout,
    useSticky,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded
  );

  console.log(state);

  const virtualizer = useVirtual({
    size: rows.length,
    parentRef,
    estimateSize: React.useCallback(() => ESTIMATED_CELL_HEIGHT, []),
    overscan: 10
  });

  function renderRow({ index, style }) {
    const row = rows[index];
    if (!row) {
      return <div>Loading...</div>;
    }

    prepareRow(row);

    const { style: rowStyle, ...restRow } = row.getRowProps({ style });

    return (
      <div {...restRow} style={{ ...rowStyle, width: totalColumnsWidth }}>
        {row.cells.map((cell) => {
          return (
            <div
              {...cell.getCellProps({
                style: {
                  background: cell.isGrouped
                    ? "#0aff00"
                    : cell.isAggregated
                    ? "#ffa500"
                    : "white",
                  borderBottom: cell.isGrouped && cell.isPlaceholder && "unset"
                }
              })}
              className={classes.tdh}
            >
              {cell.isGrouped ? (
                <>
                  <span {...row.getToggleRowExpandedProps()}>
                    {row.isExpanded ? "👇" : "👉"}
                  </span>{" "}
                  {cell.render("Cell")} ({row.subRows.length})
                </>
              ) : cell.isAggregated ? (
                cell.render("Aggregated")
              ) : cell.isPlaceholder ? null : (
                cell.render("Cell")
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className={clsx(classes.table, classes.sticky)}
      {...getTableProps()}
    >
      <div className={classes.header}>
        <div style={{ width: totalColumnsWidth }}>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className={classes.tdh}>
                  {column.canGroupBy ? (
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? "🛑" : "👊"}{" "}
                    </span>
                  ) : null}
                  <span {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                  </span>
                  <span>
                    {" "}
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                  {column.canFilter ? column.render("Filter") : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        {...getTableBodyProps()}
        className={classes.body}
        style={{
          height: `${virtualizer.totalSize}px`
        }}
      >
        {virtualizer.virtualItems.map((virtualRow) => {
          return (
            <div
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              {renderRow(virtualRow)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  useGlobalStyles();

  const [isRtl, toggleRtl] = useRtl();

  return (
    <>
      <button onClick={toggleRtl}>RTL: {JSON.stringify(isRtl)}</button>
      <div className="container">
        <Table />
      </div>
    </>
  );
}

export default App;
