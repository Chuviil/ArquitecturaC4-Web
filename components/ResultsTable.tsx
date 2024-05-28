import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type ResultsTableProps = {
    contribuyente: string
    puntos?: number
}

export function ResultsTable({contribuyente, puntos}: ResultsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Contribuyente</TableHead>
                    <TableHead>Puntos Licencia</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{contribuyente === 'true' ? "Si" : "No"}</TableCell>
                        <TableCell>{puntos || 'No tiene licencia'}</TableCell>
                    </TableRow>
            </TableBody>
        </Table>
    )
}
