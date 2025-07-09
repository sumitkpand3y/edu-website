import { useState, useEffect, useCallback } from "react";
import {
  courseService,
  CourseQueryParams,
  CourseFormData,
} from "@/services/course.service";

// 📦 Define a type for each course (adjust as needed)
export interface Course {
  image: string;
  featured: any;
  accredited: any;
  category: ReactNode;
  provider: ReactNode;
  rating: number;
  reviews: number;
  level: ReactNode;
  duration: ReactNode;
  cme_credits: any;
  tags: any;
  price: any;
  originalPrice: boolean;
  id: string;
  title: string;
  slug: string;
  description: string;
  // Add more fields here...
}

// ⏱ Pagination type
interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function useCourses(initialFilters: CourseQueryParams = {}) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: initialFilters.limit || 8,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // 🔁 Combine pagination + filters
  const fetchCourses = useCallback(
    async (filters: CourseQueryParams = {}) => {
      setLoading(true);
      setError(null);

      try {
        const data = await courseService.getAllCourses({
          ...filters,
          page: pagination.currentPage,
          limit: pagination.itemsPerPage,
        });

        if (data) {
          setCourses(data.courses || []);
          setPagination((prev) => ({
            ...prev,
            currentPage: data.pagination.page,
            totalPages: data.pagination.pages,
            totalItems: data.pagination.total,
            hasNextPage: data.pagination.page < data.pagination.pages,
            hasPreviousPage: data.pagination.page > 1,
          }));
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    },
    [pagination.currentPage, pagination.itemsPerPage]
  );

  useEffect(() => {
    fetchCourses(initialFilters);
  }, [
    pagination.currentPage,
    pagination.itemsPerPage,
    initialFilters.category,
    initialFilters.level,
    initialFilters.search,
  ]);

  // 🔄 Reusable helpers
  const goToPage = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const nextPage = () => {
    if (pagination.hasNextPage) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const previousPage = () => {
    if (pagination.hasPreviousPage) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    setPagination((prev) => ({ ...prev, itemsPerPage, currentPage: 1 }));
  };

  const refetch = () => {
    fetchCourses(initialFilters);
  };

  // ✏️ CRUD Operations
  const createCourse = async (data: CourseFormData) => {
    const newCourse = await courseService.createCourse(data);
    refetch();
    return newCourse;
  };

  const updateCourse = async (id: string, data: CourseFormData) => {
    const updated = await courseService.updateCourse(id, data);
    refetch();
    return updated;
  };

  const deleteCourse = async (id: string) => {
    await courseService.deleteCourse(id);
    refetch();
  };

  const getCourseBySlug = async (slug: string) => {
    return await courseService.getCourseBySlug(slug);
  };

  return {
    courses,
    loading,
    error,
    pagination,
    goToPage,
    nextPage,
    previousPage,
    changeItemsPerPage,
    refetch,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseBySlug,
  };
}
