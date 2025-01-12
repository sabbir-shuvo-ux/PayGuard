import { Column } from "@tanstack/react-table";
import { EyeOff, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StatusSortingHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  statuses: ("pending" | "processing" | "success" | "failed")[];
}

export function StatusSortingHeader<TData, TValue>({
  column,
  title,
  statuses,
  className,
}: StatusSortingHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            <ChevronsUpDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuCheckboxItem
            key="all"
            checked={column.getFilterValue() === null} // "All" is selected when no filter is applied
            onCheckedChange={(value) => {
              if (value) {
                // When "All" is selected, clear the filter (no filtering)
                column.setFilterValue(null);
              } else {
                // When "All" is deselected, also clear the filter (no filtering)
                column.setFilterValue(null);
              }
            }}
          >
            All
          </DropdownMenuCheckboxItem>

          {statuses.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={status === column.getFilterValue()} // Check if the current status is selected
              onCheckedChange={(value) => {
                if (value) {
                  // Set the filter to the selected status
                  column.setFilterValue(status);
                } else {
                  // Clear the filter for this status
                  column.setFilterValue(
                    (
                      prev:
                        | "pending"
                        | "processing"
                        | "success"
                        | "failed"
                        | null
                    ) => (prev === status ? null : prev)
                  );
                }
              }}
            >
              {status}
            </DropdownMenuCheckboxItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
