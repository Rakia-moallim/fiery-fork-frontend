
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface Action {
  icon: React.ComponentType<any>;
  label: string;
  onClick: (row: any) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
}

interface DataTableProps {
  title: string;
  description?: string;
  data: any[];
  columns: Column[];
  actions?: Action[];
  onAdd?: () => void;
  searchKey?: string;
  itemsPerPage?: number;
}

export const DataTable = ({ 
  title, 
  description, 
  data, 
  columns, 
  actions = [], 
  onAdd, 
  searchKey = 'name',
  itemsPerPage = 10 
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item[searchKey]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {onAdd && (
            <Button 
              onClick={onAdd}
              className="bg-gradient-to-r from-restaurant-orange to-restaurant-red hover:from-restaurant-red hover:to-orange-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {paginatedData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No {title.toLowerCase()} found.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-restaurant-orange/10 to-restaurant-red/10 border-restaurant-orange/20">
                    {columns.map((column) => (
                      <TableHead 
                        key={column.key}
                        className={`font-semibold ${column.sortable ? 'cursor-pointer hover:text-restaurant-orange' : ''}`}
                        onClick={() => column.sortable && handleSort(column.key)}
                      >
                        {column.label}
                        {sortConfig?.key === column.key && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </TableHead>
                    ))}
                    {actions.length > 0 && (
                      <TableHead className="font-semibold">Actions</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((row, index) => (
                    <TableRow key={index} className="hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-colors">
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {column.render ? column.render(row[column.key], row) : row[column.key]}
                        </TableCell>
                      ))}
                      {actions.length > 0 && (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {actions.map((action, actionIndex) => (
                              <Button
                                key={actionIndex}
                                variant={action.variant || 'ghost'}
                                size="sm"
                                onClick={() => action.onClick(row)}
                                className="h-8 w-8 p-0"
                              >
                                <action.icon className="h-4 w-4" />
                              </Button>
                            ))}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
