'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import PaginationList from "./pagination-list"
import { MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { set } from "lodash"


interface ActivityPaginationProps {
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
  setCurrentPage: number | any,
}

export const ActivityPagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }: ActivityPaginationProps) => {

  const [maxPages, setMaxPages] = useState(8)

  const pages = Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1);

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }


  const pageNumList = Math.floor(maxPages / 2)

  let activePages = pages.slice(
    Math.max(0, currentPage - 1 - pageNumList),
    Math.min(currentPage - 1 + pageNumList + 1, pages.length)
  )

  useEffect(() => {
    if (activePages.length > 6) {
      setMaxPages(5);
    } else if (activePages.length === 6) {
      setMaxPages(6); // Ustaw tylko raz
    } else if (activePages.length < 5) {
      setMaxPages(7);
    }
  }, [activePages]);


  return (
    <Pagination className="my-5">
      <PaginationContent>
        <PaginationPrevious
          className="cursor-pointer"
          onClick={handlePrevPage}
        />
        {activePages[0] > 1
          ? (
            <PaginationEllipsis
              className="cursor-pointer"
              key="ellipsis-start"
              onClick={() => setCurrentPage(activePages[0] - 1)}
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center">
              <MoreHorizontal className="h-4 w-4" />
            </div>
          )
        }
        <PaginationList
          activePages={activePages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {
          activePages[activePages.length - 1] < pages.length
            ? (
              <PaginationEllipsis
                className="cursor-pointer"
                key="ellipsis-end"
                onClick={() =>
                  setCurrentPage(activePages[activePages.length - 1] + 1)
                }
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center">
                <MoreHorizontal className="h-4 w-4" />
              </div>
            )
        }
        <PaginationNext
          className="cursor-pointer"
          onClick={handleNextPage}
        />
      </PaginationContent>
    </Pagination>
  )
}
