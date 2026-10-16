import { createFileRoute } from '@tanstack/react-router'
import { MovieListPage } from '../pages/movie-list-page'

export const Route = createFileRoute('/')({
  component: MovieListPage,
});
