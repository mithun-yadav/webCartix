import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios";
import type { IProducts } from "../types/productTypes";

export const useProductFetch = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance.get<IProducts>(
        import.meta.env.VITE_API_BASE_URL
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
