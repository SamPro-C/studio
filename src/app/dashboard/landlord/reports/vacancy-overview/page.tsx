
// src/app/dashboard/landlord/reports/vacancy-overview/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Home, Users, Filter, FileDown, Search, ExternalLink } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";


interface VacantUnitEntry {
  id: string;
  property: string;
  unitName: string;
  unitType: string; // e.g., "2 Bedroom", "Studio"
  daysVacant: number;
  lastOccupied?: string; // Optional
  marketRent?: number; // Optional
  unitId: string; // For linking to unit details
  apartmentId: string; // For linking
}

const dummyVacantUnits: VacantUnitEntry[] = [
  { id: "vac1", property: "Greenwood Heights", unitName: "A-102", unitType: "1 Bedroom", daysVacant: 35, lastOccupied: "2024-06-20", marketRent: 950, unitId: "unit102", apartmentId: "apt1" },
  { id: "vac2", property: "Oceanview Towers", unitName: "D-610", unitType: "Studio Deluxe", daysVacant: 12, marketRent: 2800, unitId: "unit610", apartmentId: "apt2" },
  { id: "vac3", property: "Greenwood Heights", unitName: "B-205", unitType: "2 Bedroom", daysVacant: 5, lastOccupied: "2024-07-20", marketRent: 1300, unitId: "unit205", apartmentId: "apt1" },
  { id: "vac4", property: "Mountain Ridge Villas", unitName: "Villa C (New)", unitType: "3 Bedroom Villa", daysVacant: 0, marketRent: 3500, unitId: "villaC", apartmentId: "apt3" },
];

const totalUnits = 50; // Dummy overall total
const occupiedUnits = totalUnits - dummyVacantUnits.length;
const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;

const vacancyByPropertyData = [
    { property: "Greenwood H.", vacantUnits: dummyVacantUnits.filter(u => u.property === "Greenwood Heights").length },
    { property: "Oceanview T.", vacantUnits: dummyVacantUnits.filter(u => u.property === "Oceanview Towers").length },
    { property: "Mountain R.V.", vacantUnits: dummyVacantUnits.filter(u => u.property === "Mountain Ridge Villas").length },
].filter(p => p.vacantUnits > 0);


const chartConfig = {
  vacantUnits: {
    label: "Vacant Units",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


export default function VacancyOverviewReportPage() {
  
  const handleExportData = () => {
    alert(`Export vacancy overview data to CSV/Excel. To be implemented.`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord/reports">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/landlord/reports" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to Reports
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Home className="mr-3 h-7 w-7" /> Vacancy Overview Report
            </h1>
          </div>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Filters</CardTitle>
            <CardDescription>Refine the vacancy data based on property and unit type.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="property">Property</Label>
              <Select>
                <SelectTrigger id="property">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="apt1">Greenwood Heights</SelectItem>
                  <SelectItem value="apt2">Oceanview Towers</SelectItem>
                  <SelectItem value="apt3">Mountain Ridge Villas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="unitType">Unit Type</Label>
              <Select>
                <SelectTrigger id="unitType">
                  <SelectValue placeholder="All Unit Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Unit Types</SelectItem>
                  <SelectItem value="1br">1 Bedroom</SelectItem>
                  <SelectItem value="2br">2 Bedroom</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="relative lg:col-span-1">
              <Label htmlFor="searchUnit">Search Unit</Label>
              <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="searchUnit" type="search" placeholder="Unit Name/Number..." className="pl-9" />
            </div>
            <Button className="w-full sm:w-auto self-end lg:col-start-4"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        {/* Summary Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Units</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnits}</div>
              <p className="text-xs text-muted-foreground">Across all properties</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupied Units</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupiedUnits}</div>
              <p className="text-xs text-muted-foreground">Currently tenanted</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacant Units</CardTitle>
              <Home className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dummyVacantUnits.length}</div>
              <p className="text-xs text-muted-foreground">Currently available for rent</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <RechartsBarChart className="h-4 w-4 text-primary" /> {/* Changed to BarChart icon */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupancyRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Overall property occupancy</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><RechartsBarChart className="mr-2 h-5 w-5 text-primary/80"/> Vacancy by Property</CardTitle>
            <CardDescription>Visual representation of vacant units across different properties.</CardDescription>
          </CardHeader>
          <CardContent>
            {vacancyByPropertyData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={vacancyByPropertyData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="property" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tickMargin={8} width={30}/>
                  <ChartTooltip 
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />} 
                  />
                  <RechartsLegend content={<ChartLegendContent />} />
                  <Bar dataKey="vacantUnits" fill="var(--color-vacantUnits)" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
            ) : (
                <div className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground text-center p-4">
                        No vacancy data available to display chart.
                    </p>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed Table Section */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
                <CardTitle>Detailed Vacancy List</CardTitle>
                <CardDescription>Information on all currently vacant units.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
                <FileDown className="mr-2 h-4 w-4" /> Export Data
            </Button>
          </CardHeader>
          <CardContent>
            {dummyVacantUnits.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Unit Name</TableHead>
                      <TableHead>Unit Type</TableHead>
                      <TableHead className="text-right">Days Vacant</TableHead>
                      <TableHead>Last Occupied</TableHead>
                      <TableHead className="text-right">Market Rent (KES)</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyVacantUnits.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell>{unit.property}</TableCell>
                        <TableCell className="font-medium">{unit.unitName}</TableCell>
                        <TableCell>{unit.unitType}</TableCell>
                        <TableCell className="text-right">{unit.daysVacant}</TableCell>
                        <TableCell>{unit.lastOccupied || 'N/A'}</TableCell>
                        <TableCell className="text-right">{unit.marketRent ? unit.marketRent.toLocaleString() : 'N/A'}</TableCell>
                        <TableCell className="text-center">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/landlord/apartments/${unit.apartmentId}/units/${unit.unitId}`}>
                                View Unit <ExternalLink className="ml-2 h-3 w-3"/>
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No vacant units found for the selected filters.</p>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">This report reflects data based on the applied filters.</p>
          </CardFooter>
        </Card>

      </main>
    </div>
  );
}
