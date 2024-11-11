
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

const fetchTasks = async () => {
  const response = await axiosInstance.get('/task/getAll'); // Asegurarnos de que esta sea la ruta correcta en tu API
  return response.data;
};

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  });
};


