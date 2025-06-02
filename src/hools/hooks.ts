import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios";

export const useProductFetch = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        import.meta.env.VITE_API_BASE_URL
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
