import style from '../styles/about.module.css'

export default function About() {
    return(
        <div className={ `container ${style.about_container}` }>
            <h1>Sobre nós</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem excepturi hic obcaecati nam animi quibusdam dignissimos earum maxime. Blanditiis, magni.</p>
        </div>
    );
}