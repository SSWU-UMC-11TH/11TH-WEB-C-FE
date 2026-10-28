import { Header} from "./components/layout/header";
import { MovieListPage } from "./pages/movie-list-page";
import Footer from "./components/layout/footer";

export default function App() {

return (
        <>
            <Header />
            <MovieListPage />
            <Footer />
        </>
    );
}