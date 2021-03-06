import { Col, Form, Row } from "react-bootstrap";
import { Editor,IAllProps } from '@tinymce/tinymce-react';
import { connect } from "react-redux";
import { useState } from 'react';
import { load_movies_create_submitted, load_movies_update_submitted } from "../../redux/actions/movies/actionMovies";
function MovieForm({movieAdd}){
    
    const getEmptyMovie = () =>
    {
        return{
            "title": "",
            "reviews": [],
            "publishDate": null,
            "creationArticleDate": null,
            "minAge": null,
            "valid": false,
            "realisator": "",
            "genre": "",
            "actors": "",
            "duration": null,
            "nationality": "",
            "synopsys": "",
            "webContent": null
        };
    }
    const[movieValue, setMovieValue] = useState(false);
    //console.log(movieValue);movieAdd
    //changement des valeurs
    const changeMovieValues = (e) =>{
        console.log(e);
        var dataElement = e.target.name;
        var dataValue = e.target.value;
        setMovieValue({ ...movieValue, [dataElement] : dataValue });
        console.log(dataElement);
        console.log("======");
        console.log(dataValue);
        console.log("Nouvelle valeur du film : ");
        movieAdd(movieValue);
        console.log(movieValue);
    }
    const changeWebContent = (content, editor) =>{
        let dataElement = editor.id;
        movieValue[dataElement] = content;
        console.log(dataElement);
        console.log("======");
        console.log(content);
        console.log("Nouvelle valeur du film : ");
        console.log(movieValue);
        movieAdd(movieValue);
    } 



    //obtenir les nouvelles valeurs


        return(
        <>
        <Form className="col-12 align-content-around align-self-center" key="movie-create">
            <Row>
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Titre du film</Form.Label>
                        <Form.Control valid="true" name="title" type="text" placeholder="Titre du film" defaultValue={ movieValue.title } onChange={ changeMovieValues } />
                    </Form.Group>
                    <Form.Group controlId="publishDate">
                        <Form.Label>Date de sortie</Form.Label>
                        <Form.Control valid="true" type="date" as="input" name="publishDate" placeholder="01-01-1977" defaultValue={ movieValue.publishDate } onChange={ changeMovieValues } />
                    </Form.Group>

                    <Form.Group controlId="minAge" className="col-12">
                        <Form.Label className="col-5">Age minimum pour voir le film</Form.Label>
                        <Form.Control valid="true" name="minAge" type="number" placeholder="12" defaultValue={ movieValue.minAge } onChange={ changeMovieValues } className="inline-block col-6" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="realisator">
                        <Form.Label>Réalisateur</Form.Label>
                        <Form.Control valid="true" name="realisator" type="text" placeholder="Sam Raimi" defaultValue={ movieValue.realisator } onChange={ changeMovieValues } />
                    </Form.Group>
                    <Form.Group controlId="genre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control valid="true" name="genre" type="text" placeholder="Fiction, Action" defaultValue={ movieValue.genre } onChange={ changeMovieValues } />
                    </Form.Group>
                    <Form.Group controlId="duration">
                        <Form.Label>Durée en minutes</Form.Label>
                        <Form.Control valid="true" name="duration" type="number" placeholder="0" defaultValue={ movieValue.duration } onChange={ changeMovieValues } />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="actors">
                        <Form.Label>Acteurs principaux</Form.Label>
                        <Form.Control valid="true" name="actors" type="text" placeholder="Daniel Radcliffe, Robert Downey Jr." defaultValue={ movieValue.actors } onChange={ changeMovieValues } />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="nationality">
                        <Form.Label>Pays d'origine</Form.Label>
                        <Form.Control valid="true" name="nationality" type="text" placeholder="Français, Américain" defaultValue={ movieValue.nationality } onChange={ changeMovieValues } />
                    </Form.Group>
                </Col>
            </Row>
            
            <Form.Group controlId="synopsis">
                <Form.Label>Synopsys du film</Form.Label>
                <Form.Control valid="true" as="textarea" rows="4" name="synopsys" placeholder="Saisir synopsis" defaultValue={ movieValue.synopsys } onChange={ changeMovieValues } />
            </Form.Group>         
                
            

        </Form>
        
        </>
        );

}
/*<Form.Group controlId="webContent">
                <Form.Label>Contenu supplémentaire</Form.Label>
</Form.Group>*/
/*const getMovieValue = () => {
    return movieValue;
}*/
const mapDispatchToProps = (dispatch) => {
    return { movieAdd: (movieValue) => {
        return dispatch(load_movies_create_submitted(movieValue));
    },
 }
}

export default connect(null,mapDispatchToProps)(MovieForm)