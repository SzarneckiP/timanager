import { PaginationItem, PaginationLink } from "@/components/ui/pagination"

interface PaginationListProps {
    activePages: number[],
    currentPage: number,
    setCurrentPage: (page: number) => void,
}

const PaginationList = ({ activePages, currentPage, setCurrentPage }: PaginationListProps) => {
    return (
        <>
            {
                activePages.map((page, idx) => (
                    <PaginationItem
                        key={idx}
                        className={currentPage === page ? 'bg-neutral-100 rounded-md cursor-pointer' : 'cursor-pointer'}
                    >
                        <PaginationLink onClick={() => setCurrentPage(page)}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))
            }
        </>
    )
}

export default PaginationList