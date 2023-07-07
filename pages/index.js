import Card from "@/components/Card";
import styles from "@/styles/home.module.css";

export async function getStaticProps() {
  const api = "http://localhost:3001/apostas";
  const res = await fetch(api);
  const data = await res.json();

  return {
    props: {
      resultados: data.sort((a, b) => b.Conc - a.Conc),
    },
  };
}

export default function Home({ resultados }) {
  // const [filtroConcurso, setFiltroConcurso] = useState('');

  return (
    <div className={`container ${styles.container_mega}`}>
      <Card key={resultados._id} resultados={ resultados } />
    </div>
  );
}
