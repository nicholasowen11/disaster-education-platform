"use client"

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Skeleton,
} from "@mui/material"
import { IconEdit, IconTrash } from "@tabler/icons-react"

export interface Column<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
  width?: string | number
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  loading?: boolean
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  emptyMessage?: string
  getRowId: (row: T) => string
}

export default function DataTable<T>({
  columns,
  rows,
  loading = false,
  onEdit,
  onDelete,
  emptyMessage = "Tidak ada data.",
  getRowId,
}: DataTableProps<T>) {
  const showActions = !!(onEdit || onDelete)

  return (
    <TableContainer
      sx={{
        border: "1px solid var(--color-border, #e0d6cc)",
        borderRadius: 2,
        backgroundColor: "var(--card)",
        overflowX: "auto",

        "&::-webkit-scrollbar": {
          height: 6,
        },

        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 999,
        },
      }}
    >
      <Table 
        size="small"
        sx={{
          minWidth: {
            xs: 700,
            md: "100%",
          },
        }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "var(--navbar)" }}>
            {columns.map((col) => (
              <TableCell
                key={String(col.key)}
                width={col.width}
                sx={{
                  color: "var(--background)", 
                  fontWeight: 700, 
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.8rem",
                    md: "0.85rem",
                  } 
                }}
              >
                {col.label}
              </TableCell>
            ))}
            {showActions && (
              <TableCell
                align="center"
                width={100}
                sx={{
                  color: "var(--background)", 
                  fontWeight: 700, 
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.8rem",
                    md: "0.85rem",
                  } 
                }}
              >
                Aksi
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell>
                    <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (showActions ? 1 : 0)}
                align="center"
                sx={{ py: 6 }}
              >
                <Typography variant="body2" color="text.secondary">
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={getRowId(row)}
                hover
                sx={{ "&:last-child td": { borderBottom: 0 } }}
              >
                {columns.map((col) => (
                  <TableCell key={String(col.key)} sx={{ fontSize: "0.85rem" }}>
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key as string] ?? "")}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell align="center">
                    <Box 
                      className="flex gap-1 justify-center"
                      sx={{
                        flex: "nowrap"
                      }}  
                    >
                      {onEdit && (
                        <IconButton
                          size="small"
                          onClick={() => onEdit(row)}
                          sx={{
                            color: "var(--accent)",
                            "&:hover": { backgroundColor: "rgba(192,133,82,0.1)" },
                          }}
                        >
                          <IconEdit size={16} />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton
                          size="small"
                          onClick={() => onDelete(row)}
                          sx={{
                            color: "#ef4444",
                            "&:hover": { backgroundColor: "rgba(239,68,68,0.1)" },
                          }}
                        >
                          <IconTrash size={16} />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
